import { TBaseModalProps } from "../../../../shared/components/Modal.tsx";
import { FC, ReactElement } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDeleteTableItemMutation } from "../../../../entites/table/tableApi.ts";
import Loader from "../../../../shared/components/Loader.tsx";

interface IDeleteTableItemFormProps extends TBaseModalProps {
  selectedItemId: string | undefined;
}

const DeleteTableItemForm: FC<IDeleteTableItemFormProps> = ({
  isOpen,
  onClose,
  selectedItemId,
}: IDeleteTableItemFormProps): ReactElement => {
  const [deleteTableItem, { isLoading }] = useDeleteTableItemMutation();

  const handleDelete = async () => {
    try {
      if (selectedItemId) {
        await deleteTableItem(selectedItemId);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "160px",
          minWidth: "400px",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">Удаление объекта</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Вы точно уверены что хотите удалить это объект?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete} variant="contained" color="error">
                Удалить
              </Button>
              <Button onClick={onClose} variant="contained">
                Отмена
              </Button>
            </DialogActions>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default DeleteTableItemForm;
