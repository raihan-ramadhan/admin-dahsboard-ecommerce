import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "store/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import { useAppSelector } from "store/hooks";
import { useDocTitle } from "hooks/use-doc-title";
import Loading from "components/Loading";
import { createElement } from "react";

const Performance = () => {
  const theme = useTheme();
  const userId = useAppSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  useDocTitle("Performance");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: GridColDef<any>[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

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
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
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
          rows={(data && data.sales) || []}
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

export default Performance;
