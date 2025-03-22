import { FC, lazy, PropsWithChildren } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { Container } from "@mui/material";

const AuthPage = lazy(() => import("../pages/auth"));
const TablePage = lazy(() => import("../pages/table"));

const ProtectedPage: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
};

const routesConfig: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedPage>
        <TablePage />
      </ProtectedPage>
    ),
  },
  {
    path: "*",
    element: <Container>404 Страница не найдена</Container>,
  },
];

const router = createBrowserRouter(routesConfig);

export default router;
