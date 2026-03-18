import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Panel = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
`;

const Card = styled.div`
  padding: 32px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  text-align: center;
  display: grid;
  gap: 14px;
`;

const Back = styled(Link)`
  padding: 12px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
`;

export function NotFoundPage() {
  return (
    <Panel>
      <Card>
        <h1>Página não encontrada</h1>
        <p>O endereço solicitado não existe nesta interface.</p>
        <Back to="/">Voltar para a página principal</Back>
      </Card>
    </Panel>
  );
}