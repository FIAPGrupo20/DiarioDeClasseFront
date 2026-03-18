import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Post } from '../types';

export interface PostsFilters {
  texto?: string;
  professor?: string;
  disciplina?: string;
  orderBy?: 'titulo' | 'dataCriacao';
  order?: 'asc' | 'desc';
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filters, setFilters] = useState<PostsFilters>({
    texto: '',
    professor: '',
    disciplina: '',
    orderBy: 'dataCriacao',
    order: 'desc'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const deferredFilters = useDeferredValue(filters);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        // Se houver algum filtro ativo, busca com filtros; caso contrário, busca tudo
        const hasActiveFilters = Boolean(
          deferredFilters.texto?.trim() ||
          deferredFilters.professor?.trim() ||
          deferredFilters.disciplina?.trim()
        );

        const data = hasActiveFilters
          ? await api.searchPosts(deferredFilters)
          : await api.getPosts();

        if (active) {
          setPosts(data.posts);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar os posts.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [deferredFilters]);

  const updateFilters = (newFilters: Partial<PostsFilters>) => {
    startTransition(() => {
      setFilters(prev => ({ ...prev, ...newFilters }));
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      setFilters({
        texto: '',
        professor: '',
        disciplina: '',
        orderBy: 'dataCriacao',
        order: 'desc'
      });
    });
  };

  return { posts, filters, updateFilters, resetFilters, loading, error };
}