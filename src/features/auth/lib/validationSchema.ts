import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Имя пользователя обязательно"),
  password: yup.string().required("Пароль обязательно"),
});
