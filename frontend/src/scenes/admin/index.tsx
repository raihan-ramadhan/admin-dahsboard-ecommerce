import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "store/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import { useDocTitle } from "hooks/use-doc-title";
import { createElement } from "react";
import Loading from "components/Loading";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: GridColDef<any>[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  useDocTitle("Admins");

  return (
    <Box
      my="1.5rem"
      sx={{
        mx: {
          default: "16px",
          sm: "32px",
        },
        paddingBottom: "5rem",
      }}
    >
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenu,
            loadingOverlay: () =>
              createElement(
                "div",
                {
                  style: {
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                },
                <Loading />
              ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
