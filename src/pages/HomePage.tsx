import styled from 'styled-components';
import { PostCard } from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';
import { DISCIPLINAS_ENSINO_MEDIO } from '../constants/disciplinas';

const Hero = styled.section`
  padding: 40px 0;
  margin-bottom: 32px;
`;

const HeroCard = styled.div`
  padding: 40px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(135deg, rgba(255, 253, 249, 0.92), rgba(217, 238, 242, 0.75));
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  display: grid;
  gap: 16px;

  > span {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h1 {
    font-size: 2rem;
    line-height: 1.2;
    margin: 0;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    color: ${({ theme }) => theme.colors.mutedInk};
  }
`;

const FiltersSection = styled.section`
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  margin-bottom: 32px;
  display: grid;
  gap: 24px;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: grid;
  gap: 8px;

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.ink};
    text-transform: capitalize;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.95rem;
  font-family: inherit;
  background: white;
  color: ${({ theme }) => theme.colors.ink};
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedInk};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(79, 102, 166, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.95rem;
  font-family: inherit;
  background: white;
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(79, 102, 166, 0.1);
  }

  option {
    background: white;
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const FilterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: 1px solid ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.accent : theme.colors.line};
  background: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.accent : 'white'};
  color: ${({ theme, $variant }) => 
    $variant === 'primary' ? 'white' : theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme, $variant }) => 
      $variant === 'primary' ? theme.colors.accentDeep : theme.colors.paper};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ResultCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.mutedInk};
  font-weight: 500;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const Empty = styled.div`
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export function HomePage() {
  const { posts, filters, updateFilters, resetFilters, loading, error } = usePosts();

  return (
    <>
      <Hero>
        <HeroCard>
          <span>Leitura pública</span>
          <h1>Postagens educacionais com acesso aberto e autoria protegida.</h1>
          <p>
            Alunos podem navegar livremente pelos conteúdos. Professores autenticados entram, criam, editam e administram o acervo.
          </p>
        </HeroCard>
      </Hero>

      <FiltersSection>
        <h3>🔍 Filtros de Busca</h3>
        <FiltersGrid>
          <FilterGroup>
            <label>Buscar por palavras-chave</label>
            <InputField
              type="text"
              value={filters.texto || ''}
              onChange={(event) => updateFilters({ texto: event.target.value })}
              placeholder="Ex.: matemática, cidadania..."
            />
          </FilterGroup>

          <FilterGroup>
            <label>Professor</label>
            <InputField
              type="text"
              value={filters.professor || ''}
              onChange={(event) => updateFilters({ professor: event.target.value })}
              placeholder="Ex.: João, Maria..."
            />
          </FilterGroup>

          <FilterGroup>
            <label>Disciplina</label>
            <Select
              value={filters.disciplina || ''}
              onChange={(event) => updateFilters({ disciplina: event.target.value })}
            >
              <option value="">Todas as disciplinas</option>
              {DISCIPLINAS_ENSINO_MEDIO.map((disciplina) => (
                <option key={disciplina} value={disciplina}>
                  {disciplina}
                </option>
              ))}
            </Select>
          </FilterGroup>

          <FilterGroup>
            <label>Ordenar por</label>
            <Select
              value={filters.orderBy || 'dataCriacao'}
              onChange={(event) => updateFilters({ orderBy: event.target.value as 'titulo' | 'dataCriacao' })}
            >
              <option value="dataCriacao">Mais Recentes</option>
              <option value="titulo">A-Z (Título)</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <label>Ordem</label>
            <Select
              value={filters.order || 'desc'}
              onChange={(event) => updateFilters({ order: event.target.value as 'asc' | 'desc' })}
            >
              <option value="desc">Decrescente</option>
              <option value="asc">Crescente</option>
            </Select>
          </FilterGroup>
        </FiltersGrid>

        <FilterActions>
          <Button $variant="primary" onClick={resetFilters}>
            Limpar Filtros
          </Button>
          <ResultCount>
            {posts.length > 0 ? `${posts.length} resultado${posts.length !== 1 ? 's' : ''}` : 'Nenhum resultado'}
          </ResultCount>
        </FilterActions>
      </FiltersSection>

      {loading && <Empty>Carregando postagens...</Empty>}
      {error && <Empty>{error}</Empty>}
      {!loading && !error && posts.length === 0 && <Empty>Nenhuma postagem encontrada com os filtros aplicados.</Empty>}

      {!loading && !error && posts.length > 0 && (
        <Grid>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Grid>
      )}
    </>
  );
}