import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import { useDocTitle } from "hooks/use-doc-title";

const Breakdown = () => {
  useDocTitle("Breakdown");

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
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
