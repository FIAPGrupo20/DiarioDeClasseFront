import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { DISCIPLINAS_ENSINO_MEDIO } from '../constants/disciplinas';

const Panel = styled.section`
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  display: grid;
  gap: 20px;
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 14px;
  padding: 13px 14px;
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 14px;
  padding: 13px 14px;
  background: white;
`;

const Textarea = styled.textarea`
  min-height: 240px;
  resize: vertical;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 14px;
  padding: 14px;
`;

const Button = styled.button`
  justify-self: start;
  border: 0;
  border-radius: 999px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  cursor: pointer;
`;

export function CreatePostPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      const post = await api.createPost({
        titulo: String(form.get('titulo')),
        conteudo: String(form.get('conteudo')),
        autor: String(form.get('autor')),
        disciplina: String(form.get('disciplina'))
      }, token || '');
      navigate(`/posts/${post.id}`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao criar postagem.');
    }
  };

  return (
    <Panel>
      <div>
        <span>Criação protegida</span>
        <h1>Nova postagem docente</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Input name="titulo" placeholder="Título da postagem" required />
        <Input name="autor" defaultValue={user?.nome || ''} placeholder="Autor" required />
        <Select name="disciplina" defaultValue="" required>
          <option value="" disabled>Selecione a disciplina</option>
          {DISCIPLINAS_ENSINO_MEDIO.map((disciplina) => (
            <option key={disciplina} value={disciplina}>{disciplina}</option>
          ))}
        </Select>
        <Textarea name="conteudo" placeholder="Escreva o conteúdo completo da postagem" required />
        <Button type="submit">Publicar</Button>
      </Form>
      {message && <p>{message}</p>}
    </Panel>
  );
}