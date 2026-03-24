import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

const Placeholder = styled.div`
  min-height: 40vh;
  display: grid;
  place-items: center;
`;

export function ProtectedRoute({
  children,
  allowedRole
}: {
  children: React.ReactNode;
  allowedRole: UserRole;
}) {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return <Placeholder>Validando sua sessão...</Placeholder>;
  }

  if (!user) {
    return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/entrar" replace state={{ denied: true }} />;
  }

  return <>{children}</>;
}