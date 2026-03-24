import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';
import { Post } from '../types';
import { useLocalComments } from '../hooks/useLocalComments';
import { useAuth } from '../hooks/useAuth';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 24px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const MainCard = styled.article`
  padding: 32px;
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  display: grid;
  gap: 24px;
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 16px;
  align-content: start;
`;

const SideCard = styled.div`
  padding: 22px;
  background: rgba(255, 253, 249, 0.92);
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: grid;
  gap: 14px;
`;

const CommentForm = styled.form`
  display: grid;
  gap: 12px;
`;

const Textarea = styled.textarea`
  min-height: 120px;
  resize: vertical;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 14px;
  padding: 12px 14px;
`;

const Button = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.accentDeep};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AccessButton = styled(Link)`
  display: inline-block;
  border-radius: 999px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.colors.night};
  color: white;
  margin-top: 12px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const CommentList = styled.div`
  display: grid;
  gap: 12px;
`;

const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.85;
`;

const CommentCard = styled.div`
  padding: 14px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.sand};
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export function PostDetailPage() {
  const { id = '' } = useParams();
  const { user, ready } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [body, setBody] = useState('');
  const { comments, addComment, countLabel } = useLocalComments(id);

  useEffect(() => {
    api.getPost(id)
      .then((response) => setPost(response))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erro ao carregar o post.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleComment = (event: FormEvent) => {
    event.preventDefault();
    if (!user || !body.trim()) return;
    addComment(user.nome, body.trim());
    setBody('');
  };

  if (loading) return <MainCard>Carregando post...</MainCard>;
  if (error || !post) return <MainCard>{error || 'Postagem não encontrada.'}</MainCard>;

  return (
    <Wrapper>
      <MainCard>
        <div>
          <span>{new Date(post.dataCriacao).toLocaleDateString('pt-BR')}</span>
          <h1>{post.titulo}</h1>
        </div>
        <p><strong>Autor:</strong> {post.autor}</p>
        <p><strong>Disciplina:</strong> {post.disciplina}</p>
        <Content>{post.conteudo}</Content>
      </MainCard>

      <Sidebar>
        <SideCard>
          <h3>Comentários opcionais</h3>
          <p>{countLabel}</p>
          {!ready && <p>Verificando sua sessão...</p>}
          {ready && user && (
            <CommentForm onSubmit={handleComment}>
              <p>Comentando como <strong>{user.nome}</strong>.</p>
              <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Escreva um comentário sobre esta postagem" />
              <Button type="submit">Publicar comentário</Button>
            </CommentForm>
          )}
          {ready && !user && (
            <div>
              <p>Faça login para comentar nesta postagem.</p>
              <AccessButton to="/entrar">Ir para acesso</AccessButton>
            </div>
          )}
        </SideCard>

        <SideCard>
          <CommentList>
            {comments.map((comment) => (
              <CommentCard key={comment.id}>
                <strong>{comment.author}</strong>
                <p>{comment.body}</p>
              </CommentCard>
            ))}
            {comments.length === 0 && <p>Ainda não há comentários nesta postagem.</p>}
          </CommentList>
        </SideCard>
      </Sidebar>
    </Wrapper>
  );
}