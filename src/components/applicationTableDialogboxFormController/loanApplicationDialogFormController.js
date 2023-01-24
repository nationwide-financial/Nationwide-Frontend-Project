import React from "react";
import styles from "./loanApplicationDialogFormController.module.scss";
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
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { useState } from "react";

function LoanApplicationDialogFormController() {
  const [selected, setselected] = useState(null);
  const handleClick = (id) => {
    // setStyle({ backgroundColor: "yellow", color: "#fff" });
    setselected(id);
  };

  //   const activeStyle = {
  //     backgroundColor:"#1478F1",color:"#fff"
  //   }
  return (
    <div>
      <FormControl style={{ display: "flex", justifyContent: "center" }}>
        <label>
          {" "}
          <Typography
            variant="h6"
            style={{
              fontSize: 17,
              fontWeight: 700,
              fontStyle: "normal",
            }}
          >
            Selected Product
          </Typography>
        </label>
        <Box sx={{ maxWidth: "100%" }}>
          <Stack spacing={2} direction="row" className="active">
            <Button
              fullWidth
              variant="outlined"
              borderColor="#393939"
              //   onMouseOver={() => {
              //     backgroundColor: "#1478F1";
              //     color: "#FFFFFF";
              //   }}
              onClick={() => handleClick(1)}
              style={
                selected === 1
                  ? { backgroundColor: "#1478F1", color: "#fff" }
                  : {}
              }
              id={1}
            >
              <Grid
                container
                display={"flex"}
                fontWeight={700}
                className="hover_effects"
              >
                <Grid xs={6} align="left">
                  Home Improvment
                </Grid>{" "}
                <Grid xs={6} align="right">
                  <HomeOutlinedIcon />
                </Grid>
              </Grid>
            </Button>
          </Stack>
        </Box>
        {/* -------- */}
        <Box sx={{ maxWidth: "100%" }} mt={2}>
          <Stack spacing={2} direction="row" className="ifActive">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleClick(2)}
              style={
                selected === 2
                  ? { backgroundColor: "#1478F1", color: "#fff" }
                  : {}
              }
              id={2}
            >
              <Grid container display={"flex"} fontWeight={700}>
                <Grid xs={6} align="left">
                  Consolidate Debt
                </Grid>{" "}
                <Grid xs={6} align="right">
                  <TextSnippetOutlinedIcon />
                </Grid>
              </Grid>
            </Button>
          </Stack>
        </Box>

        <Box sx={{ maxWidth: "100%" }} mt={2}>
          <Stack spacing={2} direction="row" className="ifActive">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleClick(3)}
              style={
                selected === 3
                  ? { backgroundColor: "#1478F1", color: "#fff" }
                  : {}
              }
              id={3}
            >
              <Grid container display={"flex"} fontWeight={700}>
                <Grid xs={6} align="left">
                  Pay off Credit Cards
                </Grid>{" "}
                <Grid xs={6} align="right">
                  <CreditCardOutlinedIcon />
                </Grid>
              </Grid>
            </Button>
          </Stack>
        </Box>

        <Box sx={{ maxWidth: "100%" }} mt={2}>
          <Stack spacing={2} direction="row" className="ifActive">
            <Button
              fullWidth
              variant="outlined"
              id={4}
              onClick={() => handleClick(4)}
              style={
                selected === 4
                  ? { backgroundColor: "#1478F1", color: "#fff" }
                  : {}
              }
            >
              <Grid container display={"flex"} fontWeight={700}>
                <Grid xs={6} align="left">
                  Refinance my Car
                </Grid>{" "}
                <Grid xs={6} align="right">
                  <DirectionsCarFilledOutlinedIcon />
                </Grid>
              </Grid>
            </Button>
          </Stack>
        </Box>

        <Box sx={{ maxWidth: "100%" }} mt={2}>
          <Stack spacing={2} direction="row" className="ifActive">
            <Button
              fullWidth
              variant="outlined"
              id={5}
              onClick={() => handleClick(5)}
              style={
                selected === 5
                  ? { backgroundColor: "#1478F1", color: "#fff" }
                  : {}
              }
            >
              <Grid container display={"flex"} fontWeight={700}>
                <Grid xs={6} align="left">
                  Something Else
                </Grid>{" "}
                <Grid xs={6} align="right">
                  <WorkOutlineOutlinedIcon />
                </Grid>
              </Grid>
            </Button>
          </Stack>
        </Box>
        <label>
          {" "}
          <Typography
            variant="h6"
            style={{
              fontSize: 17,
              fontWeight: 700,
              fontStyle: "normal",
            }}
          >
            Application Form Options
          </Typography>
        </label>
        <Box sx={{ maxWidth: "100%" }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Include Co-Borrower Page"
            />
          </FormGroup>
        </Box>
      </FormControl>
    </div>
  );
}

export default LoanApplicationDialogFormController;
