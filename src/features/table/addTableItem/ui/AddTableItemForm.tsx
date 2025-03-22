import { FC, ReactElement } from "react";
import Modal, {
  TBaseModalProps,
} from "../../../../shared/components/Modal.tsx";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useAddTableItemMutation } from "../../../../entites/table/tableApi.ts";
import { addTableItemValidationSchema } from "../lib/validationSchema.ts";
import Loader from "../../../../shared/components/Loader.tsx";

const AddTableItemForm: FC<TBaseModalProps> = ({
  isOpen,
  onClose,
}): ReactElement => {
  const [addTableItem, { isLoading }] = useAddTableItemMutation();

  const formik = useFormik({
    initialValues: {
      companySigDate: dayjs().toISOString(),
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: dayjs().toISOString(),
      employeeSignatureName: "",
    },
    validationSchema: addTableItemValidationSchema,
    onSubmit: async (values) => {
      try {
        await addTableItem(values).unwrap();
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="add">
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={4}
          width="100%"
          justifyContent="center"
          minWidth={800}
          minHeight={400}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Typography variant="h5" textAlign="center">
                Создание
              </Typography>

              <Stack spacing={2} direction="row">
                <DatePicker
                  disableFuture
                  label="Company Sig Date"
                  value={dayjs(formik.values.companySigDate)}
                  onChange={(newValue) =>
                    formik.setFieldValue(
                      "companySigDate",
                      dayjs(newValue).toISOString(),
                    )
                  }
                  slotProps={{
                    textField: {
                      error:
                        formik.touched.companySigDate &&
                        Boolean(formik.errors.companySigDate),
                      helperText:
                        formik.touched.companySigDate &&
                        formik.errors.companySigDate,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Company Signature Name"
                  {...formik.getFieldProps("companySignatureName")}
                  error={
                    formik.touched.companySignatureName &&
                    !!formik.errors.companySignatureName
                  }
                  helperText={
                    formik.touched.companySignatureName &&
                    formik.errors.companySignatureName
                  }
                />
              </Stack>

              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  label="Document Name"
                  {...formik.getFieldProps("documentName")}
                  error={
                    formik.touched.documentName && !!formik.errors.documentName
                  }
                  helperText={
                    formik.touched.documentName && formik.errors.documentName
                  }
                />
                <TextField
                  fullWidth
                  label="Document Status"
                  {...formik.getFieldProps("documentStatus")}
                  error={
                    formik.touched.documentStatus &&
                    !!formik.errors.documentStatus
                  }
                  helperText={
                    formik.touched.documentStatus &&
                    formik.errors.documentStatus
                  }
                />
                <TextField
                  fullWidth
                  label="Document Type"
                  {...formik.getFieldProps("documentType")}
                  error={
                    formik.touched.documentType && !!formik.errors.documentType
                  }
                  helperText={
                    formik.touched.documentType && formik.errors.documentType
                  }
                />
              </Stack>

              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  label="Employee Number"
                  {...formik.getFieldProps("employeeNumber")}
                  error={
                    formik.touched.employeeNumber &&
                    !!formik.errors.employeeNumber
                  }
                  helperText={
                    formik.touched.employeeNumber &&
                    formik.errors.employeeNumber
                  }
                />
                <TextField
                  fullWidth
                  label="Employee Signature Name"
                  {...formik.getFieldProps("employeeSignatureName")}
                  error={
                    formik.touched.employeeSignatureName &&
                    !!formik.errors.employeeSignatureName
                  }
                  helperText={
                    formik.touched.employeeSignatureName &&
                    formik.errors.employeeSignatureName
                  }
                />
              </Stack>

              <DatePicker
                disableFuture
                label="Employee Sig Date"
                value={dayjs(formik.values.employeeSigDate)}
                onChange={(newValue) =>
                  formik.setFieldValue(
                    "employeeSigDate",
                    dayjs(newValue).toISOString(),
                  )
                }
                slotProps={{
                  textField: {
                    error:
                      formik.touched.employeeSigDate &&
                      Boolean(formik.errors.employeeSigDate),
                    helperText:
                      formik.touched.employeeSigDate &&
                      formik.errors.employeeSigDate,
                  },
                }}
              />

              <Button variant="contained" type="submit" fullWidth>
                Добавить
              </Button>
            </>
          )}
        </Stack>
      </form>
    </Modal>
  );
};

export default AddTableItemForm;
