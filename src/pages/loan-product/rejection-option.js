import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import { _gatReason } from "../../services/rejectionOptionService";
function topcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const toprows = [
  topcreateData("Decline Reason 1", "Failed credit underwiting requirements"),
  topcreateData("Decline Reason 2", "Unable  to verify required information"),
  topcreateData("Decline Reason 3", "Incomplete application"),
  topcreateData("Decline Reason 4", "Customer declined the after"),
];

// bottom rowws

function downcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downrows = [
  downcreateData("Reject in Process Applications After", "12 Days"),
  downcreateData("Decline Reason ", "The Customer did not respond"),
];

function RejectionOption() {
  const [reason, setReson] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await _gatReason();

      setReson(data.data.data.Items);
      console.log(reason);
    }
    getData();
  }, []);
  return (
    <Box
      style={{
        paddingLeft: 20,
        paddingTop: 30,
        paddingBottom: 100,
        margin: 20,
      }}
    >
      <Grid container mb={5}>
        <Grid item xs={12} md={6} mb={2}>
          <h1 className="page_header">Rejection Options</h1>
        </Grid>
      </Grid>

      <Grid container mb={5}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" className=" page_sub_header">
              <span>Decline Reasons</span>
            </Typography>

            <Link href="#" className="page_sub_outlineless_text_btn">
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                <NoteAltOutlinedIcon mt={1} />
                <Typography> Edit Decline Reasons </Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
                {reason.map(
                  (row, key) =>
                    row.auto_ == false && (
                      <TableRow
                        key={key}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: "#858585",
                            paddingLeft: 0,
                          }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#858585",
                          }}
                        >
                          {row.description}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={8}>
          <Stack
            direction="row"
            spacing={1}
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            <Typography variant="h5" className=" page_sub_header">
              <span>Automated Rejections</span>
            </Typography>
            <Link href="#" className="page_sub_outlineless_text_btn">
              <Stack direction="row" spacing={1} mt={1}>
                <NoteAltOutlinedIcon mt={4} />
                <Typography>Edit Automated Rejections</Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
                {reason.map(
                  (row, key) =>
                    row.auto_ == true && (
                      <div key={key}>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          style={{ fontSize: 16, fontWeight: 500 }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              fontSize: 16,
                              fontWeight: 500,
                              color: "#858585",
                              paddingLeft: 0,
                            }}
                          >
                            {"Reject in Process Applications After"}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#858585",
                            }}
                          >
                            {`${row.days} days`}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          style={{ fontSize: 16, fontWeight: 500 }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              fontSize: 16,
                              fontWeight: 500,
                              color: "#858585",
                              paddingLeft: 0,
                            }}
                          >
                            {row.label}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#858585",
                            }}
                          >
                            {row.description}
                          </TableCell>
                        </TableRow>
                      </div>
                    )
                )}
              </TableBody>
            </Table>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

RejectionOption.layout = "AdminLayout";

export default RejectionOption;
