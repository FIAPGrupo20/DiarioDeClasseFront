import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../types';

const Card = styled.article`
  padding: 24px;
  background: rgba(255, 253, 249, 0.9);
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 14px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  color: ${({ theme }) => theme.colors.mutedInk};
  font-size: 0.95rem;
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.mutedInk};
  line-height: 1.7;
`;

const Action = styled(Link)`
  justify-self: end;
  padding: 12px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.night};
  color: white;

  @media (max-width: 900px) {
    justify-self: flex-start;
  }
`;

export function PostCard({ post }: { post: Post }) {
  const summary = post.conteudo.length > 160 ? `${post.conteudo.slice(0, 160)}...` : post.conteudo;

  return (
    <Card>
      <Content>
        <div>
          <h3>{post.titulo}</h3>
        </div>
        <Meta>
          <span>Por {post.autor}</span>
          <span>Disciplina: {post.disciplina}</span>
          <span>{new Date(post.dataCriacao).toLocaleDateString('pt-BR')}</span>
        </Meta>
        <Summary>{summary}</Summary>
      </Content>
      <Action to={`/posts/${post.id}`}>Ler postagem</Action>
    </Card>
  );
}