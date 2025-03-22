import Modal, {
  TBaseModalProps,
} from "../../../../shared/components/Modal.tsx";
import { FC, ReactElement } from "react";
import { useEditTableItemMutation } from "../../../../entites/table/tableApi.ts";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { editTableItemValidationSchema } from "../lib/validationSchema.ts";
import { TTableItem } from "../../../../shared/types.ts";
import Loader from "../../../../shared/components/Loader.tsx";

interface IEditTableItemFormProps extends TBaseModalProps {
  currentItem: ({ id: string } & TTableItem) | null;
}

const EditTableItemForm: FC<IEditTableItemFormProps> = ({
  isOpen,
  onClose,
  currentItem,
}: IEditTableItemFormProps): ReactElement => {
  const [editTableItem, { isLoading }] = useEditTableItemMutation();

  const formik = useFormik({
    initialValues: {
      companySigDate: currentItem?.companySigDate || "",
      companySignatureName: currentItem?.companySignatureName || "",
      documentName: currentItem?.documentName || "",
      documentStatus: currentItem?.documentStatus || "",
      documentType: currentItem?.documentType || "",
      employeeNumber: currentItem?.employeeNumber || "",
      employeeSigDate: currentItem?.employeeSigDate || "",
      employeeSignatureName: currentItem?.employeeSignatureName || "",
    },
    validationSchema: editTableItemValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (currentItem) {
          await editTableItem({ id: currentItem?.id, body: values }).unwrap();
          formik.resetForm();
          onClose();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        formik.resetForm();
        onClose();
      }}
      name="edit"
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={4}
          justifyContent="center"
          width="100%"
          minWidth={800}
          minHeight={400}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Typography variant="h5" textAlign="center">
                Редактирование
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

              <Button
                disabled={!formik.dirty}
                variant="contained"
                onClick={() => console.log(currentItem)}
                type="submit"
                fullWidth
              >
                Изменить
              </Button>
            </>
          )}
        </Stack>
      </form>
    </Modal>
  );
};

export default EditTableItemForm;
