import  React,{useEffect,useState} from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

import { _gatSingleLoanType } from '../../services/loanTypeService.js'
import { _fetchAllContacts  } from '../../services/contactServices.js'
import {_gatVariabels} from '../../services/variabelService.js';
import { Contrast } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// TopLeft

function topleftcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const topleftrows = [
  topleftcreateData("First Name", "Phillip"),
  topleftcreateData("Email", "Johnsmith@gmail.com"),
  topleftcreateData("ID Number", "555-55-5555"),
  topleftcreateData("Street Address", "123 Apple Lane"),
];

// TopRight

function toprightcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const toprightrows = [
  toprightcreateData("Last Name", "Cooper"),
  toprightcreateData("Phone", "(239) 555-0108"),
  toprightcreateData("Date of Birth", "04/23/1980"),
  toprightcreateData("Postal Code", "10004"),
];

// bottom rowws

// DownLeft

function downleftcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downleftrows = [
  downleftcreateData("Company Name", "ABC Technology"),
  downleftcreateData("Job Title ", "Software Engineer"),
];

// DownRight

function downrightcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downrightrows = [downrightcreateData("Year at Job", "8")];

const handleChange = (newValue) => {
  setValue(newValue);
};

function ApplicationFormData() {
  const [age, setAge] = React.useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let closeImg = {
    cursor: "pointer",
    float: "right",
    marginTop: "5px",
    width: "20px",
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [loanType, setLoanType] = useState("");
  const [contactStr, setContactStr] = useState("");

  const [contactId, setcontactId] = useState('');
  const [cocontactId, setcocontactId] = useState([]);
  const [contactData, setContactData] = useState([]);

  const handleContinue = (product,contact) => {
    let string = cocontactId.join('S')
    cocontactId.length > 0 ? router.push(`/application/application-details?product=${product}&contact=${contact}&cocontact=${string}`) :router.push(`/application/application-details?product=${product}&contact=${contact}`)
    
  };

const getContactData = async(ids) =>{
  try{
    let contactDt=[]
      const res = await _fetchAllContacts();
      console.log("contactId",contactId)
      contactDt.push(ids?.map((id)=>( res.data.Items.filter(data => data.PK == id)[0] )))
      console.log("_fetchAllContacts",contactDt[0]);
      setContactData([...contactDt[0]])
  }catch(err){
    console.log(err)
  }
}
const [variableData, setVariableData] = useState([]);
console.log("variableData.length/2",Math.round(variableData.length/2))
  let midNo = Math.round(variableData.length/2)
  let leftCount = variableData.length - midNo;
  let rightCount = 0;
  
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
  useEffect(() => {
    async function getData(){
      if (!router.isReady) return;
      getVariables();
      const query = router.query;
      let contactString= query?.contact;
      let coContactString= query?.cocontact;
      setContactStr(contactString)
      let ids = await contactString ? contactString.split("S") : [];
      let cocontactIds = await coContactString ? coContactString.split("S"): [];
      setcontactId(ids)
      setcocontactId(cocontactIds)
      getContactData(ids)
      setLoanType(query.product)
    }
    getData()
  }, [router.isReady, router.query]);

  return (
    <div>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Item>
              <Grid m={4}>
                <Typography
                  align="left"
                  variant="h5"
                  fontWeight={700}
                  fontSize={45}
                  lineHeight={1}
                >
                  Application Form
                </Typography>
                <Typography align="left" lineHeight={3}>
                  Personal Loan
                </Typography>

                <Grid container lineHeight={5}>
                  <Grid xs={12}>
                    <Typography
                      align="left"
                      fontWeight={700}
                      fontSize={25}
                      lineHeight={2}
                    >
                      Contact Profile
                    </Typography>
                  </Grid>
                </Grid>

                {contactData &&
                  contactData.map((row, key) => (
                    <Box sx={{ minWidth: 275 }} key={key}>
                      <Grid xs={12}>
                        <Stack direction="row" spacing={1}>
                          <Typography
                            variant="h5"
                            className=" page_sub_content_header"
                          >
                            <span>
                              {" "}
                              {row?.basicInformation?.firstName || ""}{" "}
                              {row?.basicInformation?.lastName || ""}
                            </span>
                          </Typography>
                          <Link
                            href="#"
                            className="page_sub_outlineless_text_btn"
                          >
                            <Stack direction="row" spacing={1} mt={0}>
                              <NoteAltOutlinedIcon mt={4} />
                              <Typography>Edit Profile</Typography>
                            </Stack>
                          </Link>
                        </Stack>
                      </Grid>
                      <Grid mt={4}>
                        <Typography
                          align="left"
                          
                          style={{ fontSize:20, fontWeight:700 }}
                        >
                          Basic Information
                        </Typography>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TableContainer
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Table aria-label="simple table">
                              <TableBody>
                                {variableData && variableData.map((variable,key)=>{
                                 
                                  if(leftCount>=key){
                                    return( <TableRow key={key}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontSize:20, fontWeight: 400}}
                                      >
                                        {variable?.displayName}
                                      </TableCell>
                                      <TableCell
                                        align="left"
                                      
                                        style={{ fontSize:20, fontWeight: 600}}
                                      >
                                        {row?.basicInformation?.[variable?.systemName] || ""}
                                      </TableCell>
                                    </TableRow>)
                                  }
                                })}
                               

                                {/* <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ fontSize:20, fontWeight: 400}}
                                    
                                  >
                                    {"Email"}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                  
                                    style={{ fontSize:20, fontWeight: 600}}
                                  >
                                    {row?.basicInformation?.email || ""}
                                  </TableCell>
                                </TableRow>


                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ fontSize:20, fontWeight: 400}}
                                   
                                  >
                                    {"ID Number"}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                  
                                    style={{ fontSize:20, fontWeight: 600}}
                                  >
                                    {row?.basicInformation?.idNumber || ""}
                                  </TableCell>
                                </TableRow>


                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ fontSize:20, fontWeight: 400}}
                                   
                                  >
                                    {"Street Address"}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                   
                                    style={{ fontSize:20, fontWeight: 600}}
                                  >
                                    {row?.basicInformation?.streetAddress || ""}
                                  </TableCell>
                                </TableRow> */}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid item xs={6}>
                          <TableContainer
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Table aria-label="simple table">
                              <TableBody>
                               
                              {variableData && variableData.map((variable,key)=>{
                                 
                                  if(leftCount<key){
                                    return( <TableRow key={key}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontSize:20, fontWeight: 400}}
                                      >
                                        {variable?.displayName}
                                      </TableCell>
                                      <TableCell
                                        align="left"
                                      
                                        style={{ fontSize:20, fontWeight: 600}}
                                      >
                                        {row?.basicInformation?.[variable?.systemName] || ""}
                                      </TableCell>
                                    </TableRow>)
                                  }
                                })}
                            



                                  {/* <TableRow
                                  
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                  >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ fontSize:20, fontWeight: 400}}
                                  >
                                    {"Phone"}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                   style={{ fontSize:20, fontWeight: 600}}
                                  >
                                    {row?.basicInformation?.phone || ""}
                                  </TableCell>
                                </TableRow>

                                <TableRow
                                  
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ fontSize:20, fontWeight: 400}}
                                  >
                                    {"Date of Birth"}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ fontSize:20, fontWeight: 600}}
                                  >
                                    {row?.basicInformation?.dob || ""}
                                  </TableCell>
                                </TableRow>

                                <TableRow
                                  
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ fontSize:20, fontWeight: 400}}
                                  >
                                    {"Postal Code"}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ fontSize:20, fontWeight: 600}}                                  >
                                    {row?.basicInformation?.postalCode || ""}
                                  </TableCell> 
                                </TableRow> */}



                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                      {/* down */}
                      {/* <Grid mt={4}>
                        <Typography
                          align="left"
                          className="page_sub_content_header"
                        >
                          Financial Information
                        </Typography>
                      </Grid> */}
                      {/* <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TableContainer
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Table aria-label="simple table">
                              <TableBody>
                              
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      style={{ fontSize:20, fontWeight: 400}}
                                                                         >
                                      {"Company Name"}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      style={{ fontSize:20, fontWeight: 600}}                                    >
                                       {row?.jobInformation?.companyName || ""}
                                    </TableCell>
                                  </TableRow>


                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      style={{ fontSize:20, fontWeight: 400}}
                                    >
                                      {"Job Title"}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      style={{ fontSize:20, fontWeight: 600}}
                                    >
                                     {row?.jobInformation?.jobTitle || ""}
                                    </TableCell>
                                  </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>

                        <Grid item xs={6}>
                          <TableContainer
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Table aria-label="simple table">
                              <TableBody>
                               
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                   
                                  </TableRow>
                               
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid> */}
                    </Box>
                  ))}

                <Grid mt={6}>
                  <div
                    style={{
                      marginBottom: 100,
                      display: "flex",
                      justifyContent: "left",
                      margin: 20,
                    }}
                  >
                    <Button variant="outlined" onClick={()=> handleContinue (loanType ,contactStr)}>
                      Continue
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

ApplicationFormData.layout = "AdminLayout";

export default ApplicationFormData;
