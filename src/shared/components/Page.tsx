import { FC, PropsWithChildren, ReactElement } from "react";
import { Container } from "@mui/material";

const Page: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <Container
    maxWidth="lg"
    sx={{
      height: "100svh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    {children}
  </Container>
);

export default Page;
