import { FC, ReactElement } from "react";
import Page from "../../../shared/components/Page.tsx";
import LoginForm from "../../../features/auth";

const AuthPage: FC = (): ReactElement => {
  return (
    <Page>
      <LoginForm />
    </Page>
  );
};

export default AuthPage;
