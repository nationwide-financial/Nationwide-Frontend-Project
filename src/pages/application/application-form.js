import React ,{useEffect}from "react";
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
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import { useState } from "react";
//import MuiPhone from "../../components/MuiPhone/MuiPhone";
//import countryOptions from "../../data.json";
//import dayjs from "dayjs";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { Fragment } from "react";
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Radio from '@mui/material/Radio';
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import moment from "moment";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

import { _gatSingleLoanType } from '../../services/loanTypeService.js'
import { _fetchAllContacts ,_addContact} from '../../services/contactServices.js'

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function ApplicationForm() {
  const [pages, setPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPages(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPages(0);
  };
  const router = useRouter();

  const [contactId, setContactId] = useState("");
  const [allContact, setAllContact] = useState([]);
  const [loanTypeId,setLoanTypeId]= useState("");
  const [coEnableFlag,setCoEnableFlag]= useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");

  const handleContinue = () => {
    let string = isChecked.join('S')
    if(coEnableFlag == 1){
      router.push(`/application/application-co-contacts?product=${loanTypeId}&contact=${string}`);
    }else{
      router.push(`/application/application-form-data?product=${loanTypeId}&contact=${string}`);
    }
  };

  const [selectedValueContactAvailability, setSelectedValueContactAvailability] = useState('no');
  const handleChangeContactAvailability = (event) => {
    setSelectedValueContactAvailability(event.target.value);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDob("");
    setIdNumber( "");
    setCity("");
    setStreetAddress("");
    setPostalCode("");
    setProvince("");
    setCountry("");
    setPhoneNumber("")
    setSubmitErr('')
  };

   const [isChecked, setisChecked]= useState([]);
  // const handlecheckbox = (e)=>{
  //   const {value, checked}= e.target;
  //   if(checked)
  //   {
  //     setisChecked([...isChecked, value]);
  //   } else{
  //     setisChecked(isChecked.filter( (e)=>e!== value));
  //   }
  // }

  const handelRadioButton = (e) =>{
    setisChecked([e.target.value]);
  }

  const getContacts = async ()=>{
    try{
      const res = await _fetchAllContacts()
      let tableDt = await res?.data?.Items.sort((a,b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));
      setAllContact([...tableDt])
    }catch(err){
      console.log(err)
    }
  }
  const [submitErr,setSubmitErr] = useState('');
  const handelSubmitContact = async () =>{
    try{
      if(!firstName  || firstName == "" || firstName == null){
        setSubmitErr('first name can not be empty !')
      }else if(!lastName  || lastName == "" || lastName == null){
        setSubmitErr('last name can not be empty !')
      }else if(!email  || email == "" || email == null){
        setSubmitErr('email can not be empty !')
      }else if(!dob  || dob == "" || dob == null){
        setSubmitErr('date of birth can not be empty !')
      }else if(!idNumber  || idNumber == "" || idNumber == null){
        setSubmitErr('ID number can not be empty !')
      }else if(!city  || city == "" || city == null){
        setSubmitErr('city can not be empty !')
      }else if(!streetAddress  || streetAddress == "" || streetAddress == null){
        setSubmitErr('street address can not be empty !')
      }else if(!postalCode  || postalCode == "" || postalCode == null){
        setSubmitErr('postal code can not be empty !')
      }else if(!province  || province == "" || province == null){
        setSubmitErr('province code can not be empty !')
      }else if(!country  || country == "" || country == null){
        setSubmitErr('country code can not be empty !')
      }else if(!phoneNumber  || phoneNumber == "" || phoneNumber == null){
        setSubmitErr('phone number code can not be empty !')
      }else{
        setSubmitErr('')
        console.log("inside")
        let body = {
          basicInformation: {
            firstName:firstName,
            lastName: lastName,
            email: email,
            phone:phoneNumber ,
            idNumber: idNumber,
            dob: dob,
            streetAddress: streetAddress,
            city:city,
            state: province,
            postalCode:postalCode,
            country: country,
          },
          jobInformation: {
            companyName: "",
            jobTitle: "",
          },
        };
        const res = await _addContact(body)
        if((res?.status == 200 || 201) && (res?.data?.ID)){
          if(coEnableFlag == 1){
            router.push(`/application/application-co-contacts?product=${loanTypeId}&contact=${res?.data?.ID}`);
          }else{
            router.push(`/application/application-form-data?product=${loanTypeId}&contact=${res?.data?.ID}`);
          }
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    setLoanTypeId(query.product);
    setCoEnableFlag(query.coEnable);
    getContacts();
  }, [router.isReady, router.query]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Box p={4}>
        <Grid container>
          {/* header-section */}
          <Grid item xs={12} md={6} p={2} mb={1}>
            <h1 className="page_header" style={{ marginBottom: 15 }}>
              Application Form
            </h1>
            <Typography
              variant="p"
              color={"#B4B1B1"}
              fontSize={18}
              fontWeight={700}
              marginTop={15}
            >
              Personal Loan
            </Typography>
            <Typography variant="h5" fontSize={25} fontWeight={700} mt={4}>
              Contact Profile
            </Typography>
          </Grid>
        </Grid>

        {/* body-section-1---- */}
        <Grid container>
          <Grid item xs={12} p={2}>
            <div>
              <label> create contact </label>
              <Radio
                checked={selectedValueContactAvailability === "no"}
                onChange={handleChangeContactAvailability}
                value="no"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <label> use available contact </label>
              <Radio
                checked={selectedValueContactAvailability === "yes"}
                onChange={handleChangeContactAvailability}
                value="yes"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
            </div>
            <br />
            <Typography style={{ fontSize: 20, fontWeight: 700 }}>
              Basic Information
            </Typography>
          </Grid>
        </Grid>

        {selectedValueContactAvailability == "no" ? (
          <Grid
            container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* body-section */}

            <Grid item xs={6}>
              <Stack direction="column" spacing={2} m={2}>
                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      First name <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Email <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      ID Number <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={`${idNumber}`}
                    onChange={(e) => {
                      setIdNumber(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Street Address <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={`${streetAddress}`}
                    onChange={(e) => {
                      setStreetAddress(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Province <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <FormControl fullWidth size="small" margin="normal">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder="Cooper"
                      onChange={(e) => {
                        setProvince(e.target.value);
                      }}
                    >
                      <MenuItem value={"Province 1"}>
                        <Typography align="left">Province 1</Typography>
                      </MenuItem>
                      <MenuItem value={"Province 2"}>
                        <Typography align="left">Province 2</Typography>
                      </MenuItem>
                      <MenuItem value={"Province 3"}>
                        <Typography align="left">Province 3</Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Country<span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <FormControl fullWidth size="small" margin="normal">
                    {/* <InputLabel id="demo-simple-select-label">Cooper</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      placeholder="Cooper"
                    >
                      <MenuItem value={"Province 1"}>
                        <Typography align="left">Country 1</Typography>
                      </MenuItem>
                      <MenuItem value={"Province 2"}>
                        <Typography align="left">Country 2</Typography>
                      </MenuItem>
                      <MenuItem value={"Province 3"}>
                        <Typography align="left">Country 3</Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column" spacing={2} m={2}>
                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Last Name <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={`${lastName}`}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Phone <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={`${phoneNumber}`}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  {/* <MuiPhone
                    value={phoneNumber}
                    countryOptions={countryOptions}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    className="phon_number_field_border_effect"
                  /> */}
                </Grid>
                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Date of Birth <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="MM/DD/YY"
                    value={`${dob}`}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      City <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={`${city}`}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <label>
                    {" "}
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Zip or Postal Code{" "}
                      <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Text"
                    value={`${postalCode}`}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>
            <p style={{ color: "red" }}>{submitErr}</p>
          </Grid>
        ) : (
          <Grid container>
            <TableContainer>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                  <TableCell
                      align="left"
                      style={{ fontSize: 14, fontWeight: 700 }}
                    >
                      SELECT CONTACT
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontSize: 14, fontWeight: 700 }}
                    >
                      NAME
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontSize: 14, fontWeight: 700 }}
                    >
                      ID NUMBER
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontSize: 14, fontWeight: 700 }}
                    >
                      PHONE
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontSize: 14, fontWeight: 700 }}
                    >
                      EMAIL
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allContact
                  .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    const basicInfo = row.basicInformation;

                    return (
                      <TableRow key={key}>
                        <TableCell align="left">
                          {/* <input
                            type="checkbox"
                            value={row.PK}
                            checked={row.isChecked}
                            onChange={(e) => handlecheckbox(e)}
                          /> */}
                          <input type="radio" name="contact" value={row.PK} onChange={handelRadioButton} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {basicInfo.firstName + " " + basicInfo.lastName}
                        </TableCell>
                        <TableCell align="left">{basicInfo.idNumber}</TableCell>
                        <TableCell align="left">{basicInfo.phone}</TableCell>
                        <TableCell align="left">{basicInfo.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100,{ label: "All", value: -1 }]}
                component="div"
                count={allContact.length}
                rowsPerPage={rowsPerPage}
                page={pages}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </Grid>
        )}

        {/* body-section-2------- */}

        <Grid
          container
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* body-section */}
        </Grid>
        {selectedValueContactAvailability == "yes" ? (
          <div
            style={{
              marginBottom: 100,
              display: "flex",
              justifyContent: "left",
              padding: 20,
            }}
          >
            <Button variant="contained" onClick={handleContinue}>
              Select Contact
            </Button>
          </div>
        ) : (
          <div
            style={{
              marginBottom: 100,
              display: "flex",
              justifyContent: "left",
              padding: 20,
            }}
          >
            <Button variant="contained" onClick={handelSubmitContact}>
              Create Contact
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
}

ApplicationForm.layout = "AdminLayout";

export default ApplicationForm;
