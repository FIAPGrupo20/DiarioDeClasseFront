import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { UserRole } from '../types';

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  display: grid;
  gap: 18px;
`;

const Segmented = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 6px;
  background: ${({ theme }) => theme.colors.sand};
  border-radius: 999px;
`;

const SegmentButton = styled.button<{ $active: boolean }>`
  border: 0;
  border-radius: 999px;
  padding: 10px 14px;
  cursor: pointer;
  background: ${({ $active, theme }) => ($active ? theme.colors.paper : 'transparent')};
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadow.card : 'none')};
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 14px;
  padding: 13px 14px;
`;

const Button = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.colors.night};
  color: white;
  cursor: pointer;
`;

const Message = styled.p<{ $error?: boolean }>`
  color: ${({ $error, theme }) => ($error ? theme.colors.danger : theme.colors.success)};
`;

export function AccessPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string; denied?: boolean } };
  const [role, setRole] = useState<UserRole>('professor');
  const [registerRole, setRegisterRole] = useState<UserRole>('professor');
  const [loginMessage, setLoginMessage] = useState<string | null>(location.state?.denied ? 'Seu perfil não tem acesso à área solicitada.' : null);
  const [loginError, setLoginError] = useState(false);
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await login({
        email: String(form.get('email')),
        senha: String(form.get('senha')),
        role
      });
      setLoginError(false);
      setLoginMessage('Acesso realizado com sucesso.');
      navigate(location.state?.from || '/');
    } catch (err) {
      setLoginError(true);
      setLoginMessage(err instanceof Error ? err.message : 'Falha ao autenticar.');
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      if (registerRole === 'professor') {
        await api.registerProfessor({
          nome: String(form.get('nome')),
          email: String(form.get('email')),
          disciplina: String(form.get('campoExtra')),
          senha: String(form.get('senha'))
        });
      } else {
        await api.registerAluno({
          nome: String(form.get('nome')),
          email: String(form.get('email')),
          turma: String(form.get('campoExtra')),
          senha: String(form.get('senha'))
        });
      }

      setRegisterError(false);
      setRegisterMessage('Cadastro realizado. Agora já é possível fazer login.');
      formElement.reset();
    } catch (err) {
      setRegisterError(true);
      setRegisterMessage(err instanceof Error ? err.message : 'Falha ao cadastrar.');
    }
  };

  return (
    <Grid>
      <Panel>
        <div>
          <span>Entrar</span>
          <h1>Acesso por perfil</h1>
        </div>
        <Segmented>
          <SegmentButton type="button" $active={role === 'professor'} onClick={() => setRole('professor')}>Professor</SegmentButton>
          <SegmentButton type="button" $active={role === 'aluno'} onClick={() => setRole('aluno')}>Aluno</SegmentButton>
        </Segmented>
        <Form onSubmit={handleLogin}>
          <Input name="email" type="email" placeholder="E-mail" required />
          <Input name="senha" type="password" placeholder="Senha" required />
          <Button type="submit">Entrar como {role}</Button>
        </Form>
        {loginMessage && <Message $error={loginError}>{loginMessage}</Message>}
      </Panel>

      <Panel>
        <div>
          <span>Criar acesso</span>
          <h2>Cadastro independente para professores e alunos</h2>
        </div>
        <Segmented>
          <SegmentButton type="button" $active={registerRole === 'professor'} onClick={() => setRegisterRole('professor')}>Professor</SegmentButton>
          <SegmentButton type="button" $active={registerRole === 'aluno'} onClick={() => setRegisterRole('aluno')}>Aluno</SegmentButton>
        </Segmented>
        <Form onSubmit={handleRegister}>
          <Input name="nome" placeholder="Nome completo" required />
          <Input name="email" type="email" placeholder="E-mail" required />
          <Input name="campoExtra" placeholder={registerRole === 'professor' ? 'Disciplina' : 'Turma'} required />
          <Input name="senha" type="password" placeholder="Senha com ao menos 6 caracteres" required />
          <Button type="submit">Cadastrar {registerRole}</Button>
        </Form>
        {registerMessage && <Message $error={registerError}>{registerMessage}</Message>}
      </Panel>
    </Grid>
  );
}