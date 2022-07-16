import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../../constants/catData";


const Categories = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category")


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ color: selectedCategory === null ? "red" : "inherit" }}>All</Typography>
          </Link>
        </Grid>

        {categories.map((category) => (
          <Grid item xs={6} key={category.id}>
            <Link
              to={`/?category=${category.type}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{ color: selectedCategory === category.type ? "red" : "inherit" }}
              >
                {category.type}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
