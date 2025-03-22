import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routerConfig.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../shared/api/baseApi.ts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ApiProvider api={baseApi}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ApiProvider>
  </LocalizationProvider>,
);
