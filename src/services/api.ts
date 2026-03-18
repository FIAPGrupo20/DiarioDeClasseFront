import { AlunoPayload, AuthResponse, Post, PostsResponse, ProfessorPayload, UserRole } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Falha ao processar a requisição.');
  }

  return data as T;
}

export const api = {
  getPosts: () => request<PostsResponse>('/posts'),
  searchPosts: (filters: {
    texto?: string;
    professor?: string;
    disciplina?: string;
    orderBy?: 'titulo' | 'dataCriacao';
    order?: 'asc' | 'desc';
  }) => {
    const params = new URLSearchParams();
    if (filters.texto) params.append('texto', filters.texto);
    if (filters.professor) params.append('professor', filters.professor);
    if (filters.disciplina) params.append('disciplina', filters.disciplina);
    if (filters.orderBy) params.append('orderBy', filters.orderBy);
    if (filters.order) params.append('order', filters.order);
    return request<PostsResponse>(`/posts/search?${params.toString()}`);
  },
  getPost: (id: string | number) => request<Post & { status: string }>(`/posts/${id}`),
  createPost: (payload: { titulo: string; conteudo: string; autor: string; disciplina: string }, token: string) => request<Post & { status: string }>('/posts', { method: 'POST', body: payload, token }),
  updatePost: (id: string | number, payload: { titulo?: string; conteudo?: string; autor?: string; disciplina?: string }, token: string) => request<Post & { status: string }>(`/posts/${id}`, { method: 'PUT', body: payload, token }),
  deletePost: (id: string | number, token: string) => request<{ status: string }>(`/posts/${id}`, { method: 'DELETE', token }),
  login: (payload: { email: string; senha: string; role: UserRole }) => request<AuthResponse>('/auth/login', { method: 'POST', body: payload }),
  me: (token: string) => request<{ status: string; user: AuthResponse['user'] }>('/auth/me', { token }),
  registerProfessor: (payload: ProfessorPayload) => request<{ status: string; id: number }>('/professores', { method: 'POST', body: payload }),
  registerAluno: (payload: AlunoPayload) => request<{ status: string; id: number }>('/alunos', { method: 'POST', body: payload })
};