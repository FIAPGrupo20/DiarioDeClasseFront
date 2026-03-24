import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AccessPage } from './pages/AccessPage';
import { AdminPage } from './pages/AdminPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { EditPostPage } from './pages/EditPostPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PostDetailPage } from './pages/PostDetailPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/entrar" element={<AccessPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route
          path="/postagens/nova"
          element={(
            <ProtectedRoute allowedRole="professor">
              <CreatePostPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/postagens/:id/editar"
          element={(
            <ProtectedRoute allowedRole="professor">
              <EditPostPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute allowedRole="professor">
              <AdminPage />
            </ProtectedRoute>
          )}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}