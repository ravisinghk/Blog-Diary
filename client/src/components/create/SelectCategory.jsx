import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useState } from "react";
import { categories } from "../../constants/catData";

const SelectCategory = ({ funcOnChange }) => {
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <FormControl fullWidth size="small" required>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="Category"
        name="category"
        onChange={(e) => {
          funcOnChange(e);
          handleChange(e)
        }}
        // onChange={(e) => handleChange(e)}
        sx={{ height: "40px", width: "110px", padding: "0px" }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            value={category.type}
            sx={{ padding: "5px 10px" }}
          >
            {category.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCategory;
