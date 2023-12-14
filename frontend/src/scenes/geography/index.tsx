import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "store/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "data/geoData";
import { useDocTitle } from "hooks/use-doc-title";
import { keyframes } from "@mui/system";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();

  const pulse = keyframes`
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
`;

  useDocTitle("Geography");

  return (
    <Box
      py="1.5rem"
      sx={{
        overflow: "hidden",
        flex: "1",
        height: "100%",
        px: {
          default: "16px",
          sm: "32px",
        },
      }}
    >
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${
          theme.palette.mode == "dark"
            ? theme.palette.secondary[200]
            : "transparent"
        } `}
        borderRadius="4px"
        sx={{
          backgroundColor: theme.palette.mode == "dark" ? undefined : "#ccc",
          overflow: "hidden",
        }}
      >
        <Box
          width="100%"
          minWidth="942px"
          height="75vh"
          sx={{
            animation: data
              ? undefined
              : `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          }}
        >
          <ResponsiveChoropleth
            data={data || []}
            colors={theme.palette.mode == "dark" ? "blues" : "YlOrBr"}
            unknownColor={theme.palette.mode == "dark" ? "#999" : "#555"}
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor={theme.palette.grey[700]}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Geography;
