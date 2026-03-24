export type UserRole = 'professor' | 'aluno';

export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  disciplina: string;
  dataCriacao: string;
}

export interface ProfessorPayload {
  nome: string;
  email: string;
  disciplina: string;
  senha: string;
}

export interface AlunoPayload {
  nome: string;
  email: string;
  turma: string;
  senha: string;
}

export interface AuthUser {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
  disciplina?: string;
  turma?: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  user: AuthUser;
}

export interface PostsResponse {
  status: string;
  total: number;
  posts: Post[];
  query?: string;
}

export interface CommentItem {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}