import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  background: ${({ theme }) => theme.colors.night};
  color: white;
  cursor: pointer;
`;

export function EditPostPage() {
  const { id = '' } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    api.getPost(id)
      .then((post) => {
        setTitulo(post.titulo);
        setAutor(post.autor);
        setDisciplina(post.disciplina);
        setConteudo(post.conteudo);
      })
      .catch((err) => setMessage(err instanceof Error ? err.message : 'Erro ao carregar o post.'));
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await api.updatePost(id, { titulo, autor, disciplina, conteudo }, token || '');
      navigate(`/posts/${id}`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao atualizar postagem.');
    }
  };

  return (
    <Panel>
      <div>
        <span>Edição protegida</span>
        <h1>Editar postagem</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Input value={titulo} onChange={(event) => setTitulo(event.target.value)} placeholder="Título" required />
        <Input value={autor} onChange={(event) => setAutor(event.target.value)} placeholder="Autor" required />
        <Select value={disciplina} onChange={(event) => setDisciplina(event.target.value)} required>
          <option value="" disabled>Selecione a disciplina</option>
          {DISCIPLINAS_ENSINO_MEDIO.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </Select>
        <Textarea value={conteudo} onChange={(event) => setConteudo(event.target.value)} placeholder="Conteúdo" required />
        <Button type="submit">Salvar alterações</Button>
      </Form>
      {message && <p>{message}</p>}
    </Panel>
  );
}