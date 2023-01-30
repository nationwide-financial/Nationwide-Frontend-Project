import React ,{useEffect,useState}from "react";
import { useRouter } from "next/router";

import {Box,Button,Grid,IconButton,TablePagination,Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { _gatSingleLoanType } from '../../services/loanTypeService.js'
import { _fetchAllContacts ,_addContact} from '../../services/contactServices.js'
import {_gatVariabels} from '../../services/variabelService.js';

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

function CoContactForm() {
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


  const [allContact, setAllContact] = useState([]);
  const [loanTypeId,setLoanTypeId]= useState("");
  const [contactId,setContactId]= useState("");
  const [isChecked, setisChecked]= useState([]);

  const handlecheckbox = (e)=>{
    const {value, checked}= e.target;
    if(checked)
    {
      setisChecked([...isChecked, value]);
    } else{
      setisChecked(isChecked.filter( (e)=>e!== value));
    }
  }

  const handleContinue = () => {
    let string = isChecked.join('S')
    router.push(`/application/application-form-data?product=${loanTypeId}&cocontact=${string}&contact=${contactId}`);
  };

  const getContacts = async () => {
    try{
      const res = await _fetchAllContacts()
      let tableDt = await res?.data?.Items.sort((a,b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));
      setAllContact([...tableDt])
    }catch(err){
      console.log(err)
    }
  }
  const [variableData, setVariableData] = useState([]);
  const getVariables = async () =>{
    try{
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items.filter((variable)=>variable?.variableType == "contact")
      data = await data.sort((a,b) => (a.createTime > b.createTime) ? 1 : ((b.createTime > a.createTime) ? -1 : 0));
      console.log(res)
      setVariableData([...data])
    }catch(err){
      console.log(err)
    }
  }
  useEffect (()=>{
    getVariables()
    getContacts()
  },[])

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    setLoanTypeId(query.product)
    setContactId(query.contact)

  }, [router.isReady, router.query]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Box p={4}>
        <Grid container>
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
             Co-Contact Profile
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} p={2}>
            <Typography style={{ fontSize: 20, fontWeight: 700 }}>
              Basic Information
            </Typography>
          </Grid>
        </Grid>
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
                    {variableData && variableData.map((variable,key)=>{
                        return( <TableCell key={key}
                          align="left"
                          style={{ fontSize: 14, fontWeight: 700 }}
                        >
                          {variable?.displayName}
                        </TableCell>)
                      })}
                    {/* <TableCell
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
                    </TableCell> */}
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
                          <input
                            type="checkbox"
                            value={row.PK}
                            checked={row.isChecked}
                            onChange={(e) => handlecheckbox(e)}
                          />
                        </TableCell>
                        {variableData && variableData.map((variable, key)=>{
                            return(<TableCell key={key} align="left">{basicInfo[variable?.systemName]}</TableCell> )
                          })}
                        {/* <TableCell component="th" scope="row">
                          {basicInfo.firstName + " " + basicInfo.lastName}
                        </TableCell>
                        <TableCell align="left">{basicInfo.idNumber}</TableCell>
                        <TableCell align="left">{basicInfo.phone}</TableCell>
                        <TableCell align="left">{basicInfo.email}</TableCell> */}
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
        <Grid
          container
          style={{ display: "flex", justifyContent: "space-between" }}
        >
        </Grid>
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
      </Box>
    </div>
  );
}

CoContactForm.layout = "AdminLayout";

export default CoContactForm;
