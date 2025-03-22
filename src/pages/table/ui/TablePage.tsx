import { Button, Paper } from "@mui/material";
import { FC, ReactElement, useState } from "react";
import { useGetTableDataQuery } from "../../../entites/table/tableApi.ts";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import AddTableItemForm from "../../../features/table/addTableItem";
import EditTableItemForm from "../../../features/table/editTableItem";
import { TTableItem } from "../../../shared/types.ts";
import DeleteTableItemForm from "../../../features/table/deleteTableItem";
import Page from "../../../shared/components/Page.tsx";

export const TablePage: FC = (): ReactElement => {
  const { data, isLoading } = useGetTableDataQuery(null);

  const [isOpenEditModal, setOpenEditModal] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<
    ({ id: string } & TTableItem) | null
  >(null);

  const toggleEditModal = () => {
    setOpenEditModal((prevState) => !prevState);
  };
  const toggleCreateModal = () => {
    setOpenCreateModal((prevState) => !prevState);
  };
  const toggleDeleteDialog = () => {
    setOpenDeleteDialog((prevState) => !prevState);
  };

  const columns: GridColDef[] = [
    { field: "companySigDate", headerName: "Company Sig Date" },
    { field: "companySignatureName", headerName: "Company Signature Name" },
    { field: "documentName", headerName: "Document Name" },
    { field: "documentStatus", headerName: "Document Status" },
    { field: "documentType", headerName: "Document Type" },
    { field: "employeeNumber", headerName: "Employee Number" },
    { field: "employeeSigDate", headerName: "Employee Sig Date" },
    { field: "employeeSignatureName", headerName: "Employee Signature Name" },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (itemData) => {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            onClick={() => {
              setCurrentItem(itemData.row);
              toggleEditModal();
            }}
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            onClick={() => {
              setCurrentItem(itemData.row);
              toggleDeleteDialog();
            }}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Page>
      <Button
        variant="outlined"
        onClick={() => {
          toggleCreateModal();
        }}
      >
        Добавить
      </Button>
      <Paper
        elevation={3}
        sx={{
          padding: "10px",
        }}
      >
        <DataGrid
          loading={isLoading}
          sx={{
            height: "400px",
          }}
          rows={data?.data}
          columns={columns}
        />
      </Paper>

      <EditTableItemForm
        isOpen={isOpenEditModal}
        onClose={toggleEditModal}
        currentItem={currentItem}
      />
      <AddTableItemForm
        isOpen={isOpenCreateModal}
        onClose={toggleCreateModal}
      />
      <DeleteTableItemForm
        isOpen={isOpenDeleteDialog}
        onClose={toggleDeleteDialog}
        selectedItemId={currentItem?.id}
      />
    </Page>
  );
};
