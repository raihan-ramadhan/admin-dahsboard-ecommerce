import React, { useState } from "react";
import {
  Box,
  Card,
  Button,
  Rating,
  useTheme,
  Collapse,
  Typography,
  CardContent,
  CardActions,
  Skeleton,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "store/api";
import { ProductType } from "types";
import { useDocTitle } from "hooks/use-doc-title";
import { useIsSidebarOpen } from "scenes/layout";

const Product: React.FC<
  Omit<ProductType, "createdAt" | "updatedAt" | "__v">
> = ({ _id, name, description, price, rating, category, supply, stat }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={
            theme.palette.mode == "dark"
              ? theme.palette.secondary[700]
              : theme.palette.secondary[300]
          }
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem" }}
          color={
            theme.palette.mode == "dark"
              ? theme.palette.secondary[400]
              : "black"
          }
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            "&:hover": {
              backgroundColor:
                theme.palette.mode == "dark"
                  ? undefined
                  : theme.palette.secondary[300],
            },
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const { isSidebarOpen } = useIsSidebarOpen();

  useDocTitle("Products");

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
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {isError && <Typography>Something went wrong</Typography>}

      <Box
        mt="20px"
        display="grid"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > *": { gridColumn: "span 1" },
          gridTemplateColumns: {
            default: "repeat(1, minmax(0, 1fr))",
            sm: isSidebarOpen ? undefined : "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {/* {data || !isLoading ? ( */}
        {data || !isLoading ? (
          data?.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )
        ) : (
          <>
            {Array.from({ length: 16 }, (_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                sx={{
                  height: "14rem",
                  backgroundImage: "none",
                  borderRadius: "0.55rem",
                }}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Products;
