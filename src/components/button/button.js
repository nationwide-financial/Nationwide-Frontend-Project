import React from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./button.module.scss";

function ButtonNW(btnName) {
  let value = btnName;
  return (
    <div className={styles.top_btn}>
      <Button variant="contained" sx={{ padding: "10px 40px" }}>
        {value}
      </Button>
    </div>
  );
}

export default ButtonNW;
