import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(14px);
  background: rgba(255, 250, 244, 0.82);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

const HeaderInner = styled.div`
  width: ${({ theme }) => theme.layout.width};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 0;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Brand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
`;

const Mark = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.sage} 100%);
  color: white;
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const NavItem = styled(NavLink)`
  padding: 10px 16px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.mutedInk};
  transition: 180ms ease;

  &.active,
  &:hover {
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    box-shadow: ${({ theme }) => theme.shadow.card};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Badge = styled.div`
  padding: 10px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  font-size: 0.95rem;
`;

const LogoutButton = styled.button`
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.night};
  color: white;
  padding: 10px 16px;
  cursor: pointer;
`;

const Main = styled.main`
  width: ${({ theme }) => theme.layout.width};
  margin: 0 auto;
  padding: 32px 0 56px;
  flex: 1;
`;

const Footer = styled.footer`
  width: ${({ theme }) => theme.layout.width};
  margin: 0 auto;
  padding: 0 0 28px;
  color: ${({ theme }) => theme.colors.mutedInk};
  font-size: 0.95rem;
`;

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <Shell>
      <Header>
        <HeaderInner>
          <Brand to="/">
            <Mark>DC</Mark>
            <div>
              <div>Diario de Classe</div>
              <small>Educação pública com interface viva</small>
            </div>
          </Brand>

          <Nav>
            <NavItem to="/">Posts</NavItem>
            <NavItem to="/entrar">Acesso</NavItem>
            {user?.role === 'professor' && <NavItem to="/postagens/nova">Nova postagem</NavItem>}
            {user?.role === 'professor' && <NavItem to="/admin">Administração</NavItem>}
          </Nav>

          <Actions>
            {user ? (
              <>
                <Badge>
                  {user.nome} · {user.role === 'professor' ? 'Professor(a)' : 'Aluno(a)'}
                </Badge>
                <LogoutButton type="button" onClick={logout}>Sair</LogoutButton>
              </>
            ) : (
              <Badge>Leitura pública liberada</Badge>
            )}
          </Actions>
        </HeaderInner>
      </Header>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        Plataforma de leitura aberta com autoria protegida para professores e acesso autenticado para alunos e docentes.
      </Footer>
    </Shell>
  );
}