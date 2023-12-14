import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "store/api";
import { useAppSelector } from "store/hooks";

type IsSidebarOpen = boolean;
type ContextType = { isSidebarOpen: IsSidebarOpen };

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 905px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(isNonMobile);
  const userId = useAppSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box display="flex" width="100%" height="100%" sx={{ overflowX: "hidden" }}>
      <Sidebar
        user={data || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1} display="flex" flexDirection="column" width="100%">
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet context={{ isSidebarOpen }} />
      </Box>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useIsSidebarOpen() {
  return useOutletContext<ContextType>();
}

export default Layout;
