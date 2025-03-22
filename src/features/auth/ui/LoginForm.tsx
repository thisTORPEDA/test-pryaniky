import { FC, ReactElement } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useLoginMutation } from "../../../entites/user/userApi.ts";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "../lib/validationSchema.ts";

export const LoginForm: FC = (): ReactElement => {
  const [login] = useLoginMutation();
  const redirect = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const data = await login(values).unwrap();

      localStorage.setItem("token", data.data.token);
      return redirect("/");
    },
  });

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Stack spacing={3} alignItems={"center"} width="100%">
          <Typography variant="h5">Авторизация</Typography>
          <TextField
            placeholder="Логин"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ""
            }
            value={formik.values.username}
          />
          <TextField
            placeholder="Пароль"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
            value={formik.values.password}
          />
          <Button fullWidth variant="outlined" type="submit">
            Войти
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
