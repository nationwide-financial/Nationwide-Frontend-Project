import React from "react";
import styles from "./table.module.scss";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import TableHead from "@mui/material/TableHead";
import { useRouter } from "next/router";

import { _getApplications } from '../../services/applicationService.js';

import { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const nameAndBarSet = (
  <React.Fragment>
    <div style={{ display: "flex", border: "none" }}>
      <div style={{ backgroundColor: "#F86B6C", height: 5, width: 20 }}></div>
      <div
        style={{
          backgroundColor: "#22CAB5",
          height: 5,
          width: 20,
          marginLeft: 5,
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#2D5680",
          height: 5,
          width: 20,
          marginLeft: 5,
        }}
      ></div>
    </div>
    <Typography align="left" fontWeight={600}>
      Jane Cooper
    </Typography>
  </React.Fragment>
);

const avatarSet = (
  <React.Fragment>
    <Grid item md={1} align="right" paddingLeft={25}>
      <AvatarGroup total={9}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
    </Grid>
  </React.Fragment>
);

function TablePaginationActions(props) {
  
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  contact,
  applicationId,
  applicationDate,
  status,
  email,
  teamMembers,
  loanAmount
) {
  return {
    contact,
    applicationId,
    applicationDate,
    status,
    email,
    teamMembers,
    loanAmount,
  };
}

const rows = [
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
  createData(
    nameAndBarSet,
    "NF0120323",
    <Stack direction="row" spacing={2}>
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    "New Opportunities",
    "janecooper@example.com",
    avatarSet,
    "$32,600 "
  ),
].sort((a, b) => (a.contact < b.contact ? -1 : 1));

function TableNW() {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function getTime(ts){
    let date = new Date(ts);
    return date.toDateString();
  }

  const [tableData,setTableData]=useState([])
  async function getTableData(){
    try{
      const res = await _getApplications();
      console.log(res?.data?.data?.Items)
      let tableDt = await res?.data?.data?.Items.sort((a,b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));
      setTableData([...tableDt])
      console.log("tableData",tableData)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getTableData();
  },[])
  return (
    <div className={styles.tbl_default}>
      <TableContainer
        style={{
          backgroundColor: "transparent",
          marginTop: 25,
        }}
      >
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow spacing={4} style={{ paddingLeft: 35 }}>
              <TableCell
                align="left"
                style={{ fontWeight: 600, color: "#858585", width: 150 }}
              >
                Contact
              </TableCell>
              <TableCell
                align="left"
                style={{
                  width: 200,

                  fontWeight: 600,
                  color: "#858585",
                }}
              >
                APPLICATION ID
              </TableCell>
              <TableCell
                align="left"
                style={{
                  width: 260,

                  fontWeight: 600,
                  color: "#858585",
                }}
              >
                APPLICATION DATE
              </TableCell>
              <TableCell
                align="left"
                style={{
                  width: 200,

                  fontWeight: 600,
                  color: "#858585",
                }}
              >
                STATUS
              </TableCell>
              <TableCell
                align="left"
                style={{
                  width: 270,

                  fontWeight: 600,
                  color: "#858585",
                }}
              >
                EMAIL
              </TableCell>
              <TableCell
                align="left"
                style={{
                  width: 220,

                  fontWeight: 600,
                  color: "#858585",
                }}
              >
                TEAM MEMBERS{" "}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  width: 200,

                  fontWeight: 600,
                  color: "#858585",
                }}
              >
                LOAN AMOUNT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row,key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(e)=>{
                  router.push(`/application/applications-data?applicationId=${row.PK}`);
                }}
                hover
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{ paddingLeft: 25, paddingRight: 0 }}
                >
                  {" "}
                  <React.Fragment>
                    <div style={{ display: "flex", border: "none" }}>
                      <div
                        style={{
                          backgroundColor: "#F86B6C",
                          height: 5,
                          width: 20,
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: "#22CAB5",
                          height: 5,
                          width: 20,
                          marginLeft: 5,
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: "#2D5680",
                          height: 5,
                          width: 20,
                          marginLeft: 5,
                        }}
                      ></div>
                    </div>
                    <Typography align="left" fontWeight={600}>
                      {row.contact}
                    </Typography>
                  </React.Fragment>
                </TableCell>

                <TableCell align="center" className="remove_x_padding">
                  {row.PK}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ paddingLeft: 25, paddingRight: 0 }}
                >
                  <Stack direction="row" spacing={2}>
                    <span> {getTime(row.createTime)}</span>
                  </Stack>
                </TableCell>
                <TableCell align="center" className="remove_x_padding">
                  {row?.status_}
                </TableCell>
                <TableCell align="center" className="remove_x_padding">
                  {row.email}
                </TableCell>
                <TableCell align="center" className="remove_x_padding">
                  <React.Fragment>
                    <Grid item md={1} align="right" paddingLeft={14}>
                      <AvatarGroup total={9}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                        <Avatar
                          alt="Travis Howard"
                          src="/static/images/avatar/2.jpg"
                        />
                        <Avatar
                          alt="Agnes Walker"
                          src="/static/images/avatar/4.jpg"
                        />
                        <Avatar
                          alt="Trevor Henderson"
                          src="/static/images/avatar/5.jpg"
                        />
                      </AvatarGroup>
                    </Grid>
                  </React.Fragment>
                </TableCell>
                <TableCell
                  align="center"
                  className="remove_x_padding"
                  style={{ fontWeight: 600 }}
                >
                  {row.loanAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableNW;
