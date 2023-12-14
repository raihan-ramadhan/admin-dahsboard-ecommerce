import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetSalesQuery } from "store/api";
import Loading from "./Loading";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const isNonSm = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();

  if (!data || isLoading)
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
    );

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
      display="flex"
      justifyContent="center"
      sx={{
        minHeight: { md: isDashboard ? "325px" : undefined },
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { default: "100vw", sm: "100%" },
          inset: "0",
          paddingY: "40px 0",
        }}
      >
        <ResponsivePie
          data={formattedData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          colors={{ datum: "data.color" }}
          margin={
            isDashboard
              ? { top: 25, right: 40, bottom: 80, left: 40 }
              : { top: 40, right: 80, bottom: 80, left: 80 }
          }
          sortByValue={true}
          innerRadius={0.45}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={!isDashboard}
          arcLinkLabelsTextColor={theme.palette.secondary[200]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          legends={[
            {
              anchor: "bottom",
              direction: isNonSm ? "row" : "column",
              justify: false,
              translateX: isDashboard ? 20 : 0,
              translateY: isDashboard ? 50 : 80,
              itemsSpacing: 0,
              itemWidth: 85,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: theme.palette.primary[300],
                  },
                },
              ],
            },
          ]}
        />
      </Box>
      <Box
        position="absolute"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        sx={{
          top: { default: isDashboard ? "50%" : 10, sm: "50%" },
          pointerEvents: "none",
          transform: isDashboard
            ? "translate(-50%, -150%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
