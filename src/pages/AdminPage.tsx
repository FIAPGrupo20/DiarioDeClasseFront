import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Post } from '../types';

const Panel = styled.section`
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  display: grid;
  gap: 20px;
`;

const Grid = styled.div`
  display: grid;
  gap: 12px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 18px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.sand};
  border: 1px solid ${({ theme }) => theme.colors.line};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionLink = styled(Link)`
  padding: 10px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.night};
  color: white;
`;

const DeleteButton = styled.button`
  padding: 10px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  border: 0;
  cursor: pointer;
`;

export function AdminPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const loadPosts = () => {
    api.getPosts()
      .then((response) => setPosts(response.posts))
      .catch((err) => setMessage(err instanceof Error ? err.message : 'Erro ao carregar postagens.'));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.deletePost(id, token || '');
      loadPosts();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao excluir postagem.');
    }
  };

  return (
    <Panel>
      <div>
        <span>Gestão editorial</span>
        <h1>Painel administrativo de postagens</h1>
      </div>
      {message && <p>{message}</p>}
      <Grid>
        {posts.map((post) => (
          <Row key={post.id}>
            <div>
              <strong>{post.titulo}</strong>
              <p>{post.autor}</p>
              <p>{post.disciplina}</p>
            </div>
            <Actions>
              <ActionLink to={`/posts/${post.id}`}>Visualizar</ActionLink>
              <ActionLink to={`/postagens/${post.id}/editar`}>Editar</ActionLink>
              <DeleteButton type="button" onClick={() => handleDelete(post.id)}>Excluir</DeleteButton>
            </Actions>
          </Row>
        ))}
      </Grid>
    </Panel>
  );
}