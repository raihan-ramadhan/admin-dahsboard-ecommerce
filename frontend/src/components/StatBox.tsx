import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { ReactElement } from "react";

interface StatBoxProps {
  title: string;
  value: number;
  increase: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ReactElement<any, any>;
  description: string;
}

const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  increase,
  icon,
  description,
}) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      borderRadius="0.55rem"
      sx={{
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
