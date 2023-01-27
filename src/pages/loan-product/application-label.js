import React, { useState, useEffect } from "react";
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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { red } from "@mui/material/colors";
import { teal } from "@mui/material/colors";

// cutom-btn--

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButtonEdit = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[500],
  "&:hover": {
    backgroundColor: teal[700],
  },
}));

const ColorButtonDelete = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

//custom-btn---

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

import {
  _listLabel,
  _addLabel,
  _deleteLabel,
  _editLabel,
} from "../../services/labelService";
import SearchBox from "../../components/searchBox/searchBox";

function ApplicationLabel() {
  const [searchKey, setSearchKey] = useState("");
  const [rowsId, setRowsId] = useState("");

  // common dialog box
  const [openModify, setOpenModify] = useState(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => {
    setRowsId("");
    setOpenModify(false);
  };

  //  add model
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setLabelName("");
    setColor("#00ff00");
  };

  // edit model
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setLabelNameEdit("");
    setColorEdit("#00ff00");
  };

  // paginations
  const [pages, setPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPages(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPages(0);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  // timestamp to date
  function getTime(ts) {
    let date = new Date(ts);
    return date.toDateString();
  }
  // dark color to light color
  const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
      const decimalColor = parseInt(hexColor, 16);
      let r = (decimalColor >> 16) + magnitude;
      r > 255 && (r = 255);
      r < 0 && (r = 0);
      let g = (decimalColor & 0x0000ff) + magnitude;
      g > 255 && (g = 255);
      g < 0 && (g = 0);
      let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
      b > 255 && (b = 255);
      b < 0 && (b = 0);
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
      return hexColor;
    }
  };

  // table rows
  const [rows, setRows] = useState([]);

  // add states
  const [lableName, setLabelName] = useState("");
  const [color, setColor] = useState("#00FF00");

  // edit states
  const [lableNameEdit, setLabelNameEdit] = useState("");
  const [colorEdit, setColorEdit] = useState("#00FF00");
  const [formError, setFormError] = useState("");

  // fetch table data
  async function getTableData() {
    const response = await _listLabel();
    console.log(response);
    setRows(
      response.data.data.Items.map((row) => {
        let uT = getTime(row.updateTime);
        let cT = getTime(row.createTime);
        let lightColor = newShade(row.color, 150);
        return {
          PK: row.PK,
          updateTime: uT,
          createTime: cT,
          lightColor: lightColor,
          label: row.label,
        };
      })
    );
  }

  useEffect(() => {
    getTableData();
  }, []);

  // edit lable
  const editLable = async (id) => {
    try {
      if (!lableNameEdit || lableNameEdit == "" || lableNameEdit == null) {
        setFormError("lable name can not be empty !");
      } else if (!colorEdit || colorEdit == "" || colorEdit == null) {
        setFormError("color can not be empty !");
      } else {
        setFormError("");
        const body = {
          label: lableNameEdit,
          color: colorEdit,
        };
        console.log(body);
        console.log(id);
        const response = await _editLabel(id, body);
        if (response?.status == 200) {
          handleCloseModify();
          handleCloseEdit();
          //  alert("you have successfully edit")
          handleSuccessMessage();
          setMessage("you have successfully edit");
        }
        console.log("response edit", response);
        getTableData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //detete label
  const deleteLable = async (id) => {
    try {
      const response = await _deleteLabel(id);
      if (response?.status == 200) {
        handleCloseModify();
        // alert("you have successfully deleted");
        handleSuccessMessage();
        setMessage("you have successfully deleted");
      }
      console.log("response delete", response);
      console.log(id);
      getTableData();
    } catch (err) {
      console.log(err);
    }
  };

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");
  const handleSuccessMessage = () => {
    setOpenSuccessMessage(true);
  };

  const handleCloseSuccessMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
    setOpenSuccessMessage(false);
  };

  // add lable
  const handleAddFormSubmit = async () => {
    try {
      console.log(lableName);
      console.log(color);
      let body = {
        label: lableName,
        color: color,
      };
      const reasons = await _addLabel(body);
      if (reasons?.status == 200) {
        handleClose();
        getTableData();
        alert("You have successfully added");
      }
      console.log("reasons", reasons);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box style={{ padding: 40 }}>
        <Grid container p={6} mt={1} mb={4}>
          <Snackbar
            open={openSuccessMessage}
            autoHideDuration={6000}
            onClose={handleCloseSuccessMessage}
          >
            <Alert
              onClose={handleCloseSuccessMessage}
              severity="success"
              sx={{ width: "100%" }}
              style={{ backgroundColor: "lightgreen" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <Grid container>
            <Grid item xs={12} md={6}>
              <h1 className="page_header">Application Labels</h1>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  sx={{ padding: "10px 40px" }}
                  style={{ fontWeight: 700, textTransform: "capitalize" }}
                >
                  Add Label
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Dialog open={open} onClose={handleClose} fullWidth>
              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  <Typography
                    variant="h6"
                    style={{ fontSize: 30 }}
                    className="page_header"
                  >
                    Add Label
                  </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
                  >
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
                        Lable
                        <span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        label="Text "
                        variant="outlined"
                        name="loanName"
                        value={lableName}
                        onChange={(e) => {
                          setLabelName(e.target.value);
                        }}
                      />
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
                        Color
                        <span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <input
                        type="color"
                        id="favcolor"
                        name="favcolor"
                        value={color}
                        onChange={(e) => {
                          setColor(e.target.value);
                        }}
                      />
                    </Box>
                  </FormControl>
                </DialogContent>

                <DialogActions mb={5}>
                  <Button
                    className="myButtonClzStyle"
                    variant="contained"
                    onClick={handleAddFormSubmit}
                    Style={{
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Create label
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </Grid>

          {/* edit label */}

          <Grid item xs={12} md={6}>
            <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth>
              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleCloseEdit}
                >
                  <Typography
                    variant="h6"
                    style={{ fontSize: 30 }}
                    className="page_header"
                  >
                    Edit Label
                  </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
                  >
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
                        Lable
                        <span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        label="Text "
                        variant="outlined"
                        name="loanName"
                        value={lableNameEdit}
                        onChange={(e) => {
                          setLabelNameEdit(e.target.value);
                        }}
                      />
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
                        Color
                        <span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <input
                        type="color"
                        id="favcolor"
                        name="favcolor"
                        value={colorEdit}
                        onChange={(e) => {
                          setColorEdit(e.target.value);
                        }}
                      />
                    </Box>
                  </FormControl>
                  <p style={{ color: "red" }}> {formError}</p>
                </DialogContent>

                <DialogActions mb={5}>
                  <Button
                    className="myButtonClzStyle"
                    variant="contained"
                    onClick={() => {
                      handleCloseModify();
                      editLable(rowsId);
                    }}
                    Style={{
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Edit label
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </Grid>

          <Grid item xs={12} md={12} mt={1}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchOutlinedIcon fontSize="medium" />
              </Grid>
              <TextField
                id="input-with-icon-textfield"
                label="Search"
                variant="standard"
                style={{width:"100%"}}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <TableContainer
            style={{ backgroundColor: "transparent", marginTop: 25 }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ fontSize: 14, fontWeight: 700, color: "#858585" }}
                  >
                    Label
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontSize: 14, fontWeight: 600, color: "#858585" }}
                  >
                    Create
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontSize: 14, fontWeight: 600, color: "#858585" }}
                  >
                    Updated
                  </TableCell>
                  {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.filter((data) => {
                    if (searchKey == "") {
                      return data;
                    } else {
                      return data?.label
                        .toLowerCase()
                        .includes(searchKey.toLocaleLowerCase());
                    }
                  })
                  .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                  .map((row, key) => (
                    <TableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      tabIndex={-1}
                      hover
                      onClick={() => {
                        handleOpenModify();
                        setLabelNameEdit(row.label);
                        setRowsId(row.PK);
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <span
                          className="verified_label"
                          style={{
                            color: `${row.color}`,
                            backgroundColor: `${row.lightColor}`,
                          }}
                        >
                          {" "}
                          {row.label}{" "}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={2}>
                          <Avatar alt="Remy Sharp" src="/images/avatar1.png" />
                          <span>{row.createTime}</span>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={2}>
                          <Avatar alt="Remy Sharp" src="/images/avatar1.png" />
                          <span>{row.updateTime}</span>
                        </Stack>
                      </TableCell>
                      {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={pages}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
              open={openModify}
              onClose={handleCloseModify}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack direction="column" spacing={2}>
                  {/* <Button
                  className="myButtonClzStyle"
                  onClick={() => {
                    handleClickOpenEdit();
                  }}
                >
                  Edit Label
                </Button> */}
                  {/* <br /> */}

                  <ColorButtonEdit
                    variant="contained"
                    className="myButtonClzStyle"
                    onClick={() => {
                      handleClickOpenEdit();
                    }}
                  >
                    {" "}
                    Edit Label
                  </ColorButtonEdit>

                  <br />
                  <ColorButtonDelete
                    variant="contained"
                    className="myButtonClzStyle"
                    onClick={() => {
                      deleteLable(rowsId);
                    }}
                  >
                    {" "}
                    Delete Lable
                  </ColorButtonDelete>

                  {/* <Button
                  className="myButtonClzStyle"
                  onClick={() => {
                    deleteLable(rowsId);
                  }}
                >
                  Delete Lable
                </Button> */}
                </Stack>
              </Box>
            </Modal>
          </div>
        </Grid>
      </Box>
    </>
  );
}

ApplicationLabel.layout = "AdminLayout";

export default ApplicationLabel;
