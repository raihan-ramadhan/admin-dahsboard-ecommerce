/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "store/api";
import Header from "components/Header";

const Transactions = () => {
  const theme = useTheme();

  const [page] = useState(0);
  const [pageSize] = useState(20);
  const [sort, setSort] = useState<GridSortModel | Record<string, never>>({});
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

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
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
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
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          loading={isLoading || !data}
          rowCount={(data && data.total) || 0}
          pagination
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(newSortModel: GridSortModel) => {
            // @ts-ignore
            setSort(...newSortModel);
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                defaultValue: search,
                value: search,
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              },
            },
          }}
          paginationModel={{
            page,
            pageSize,
          }}
          pageSizeOptions={[pageSize]}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
