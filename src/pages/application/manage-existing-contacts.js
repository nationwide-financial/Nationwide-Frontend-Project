import React from 'react'
import { Avatar, Box, Button, FormControlLabel, Grid, IconButton, InputAdornment, TablePagination, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CachedIcon from '@mui/icons-material/Cached';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { styled } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AvatarGroup from '@mui/material/AvatarGroup';
import { MoreVert, Rotate90DegreesCcw, Search, TuneOutlined } from '@mui/icons-material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/router';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Paper from '@mui/material/Paper';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Link from '@mui/material/Link';
// import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import OutlinedInput from '@mui/material/OutlinedInput';
// import Switch from '@mui/material/Switch';
import Image from 'next/image'
import DatasetRoundedIcon from '@mui/icons-material/DatasetRounded';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import  { useState } from "react";




function topleftcreateData(leftData,rightData){
    return {leftData, rightData}
}


const topleftrows = [
    topleftcreateData('First Name','Phillip'),
    topleftcreateData('Email','Johnsmith@gmail.com'),
    topleftcreateData('ID Number','555-55-5555'),
    topleftcreateData('Street Address','123 Apple Lane'),
]

// TopRight

function toprightcreateData(leftData,rightData){
    return {leftData, rightData}
}


const toprightrows = [
    toprightcreateData('Last Name','Cooper'),
    toprightcreateData('Phone','(239) 555-0108'),
    toprightcreateData('Date of Birth','04/23/1980'),
    toprightcreateData('Postal Code','10004'),
]

// bottom rowws

// DownLeft

function downleftcreateData(leftData,rightData){
    return {leftData, rightData}
}


const downleftrows = [
    downleftcreateData('Company Name','ABC Technology'),
    downleftcreateData('Job Title ','Software Engineer'),

]


// DownRight

function downrightcreateData(leftData,rightData){
    return {leftData, rightData}
}


const downrightrows = [
    downrightcreateData('Year at Job','8'),
    // downcreateData('Decline Reason ','The Customer did not respond'),

]


const label = { inputProps: { 'aria-label': 'Switch demo' } };


// table-with-pagination-------------------
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
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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
  

  
// table-with-pagination-related-----end---

// tab-set-related-------

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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
// ------  

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
  
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
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
              position: 'absolute',
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

function ManageExistingContacts() {

    const [value, setValue] = React.useState(0);

     const handleChange = (event, newValue) => {
        setValue(newValue);
     };

    const handleClick = () => {
        console.info('You clicked the Chip.');
      };
    
      const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
    

    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    
  
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose  = () => {
      setOpen(false);
  
    }
    const handleContinue = () => {
      // setOpen(false);
  
      router.push('/application/new-application')
  
    };
  
    const handleAddContacts = ()=>{
      router.push('/application/add-new-contact')
    };

    // table-related---
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
    // table-related---

    // application-related-function--
    const [showContent,setShowContent]= useState(false);

    const handleEditDetails = () => {
      // setShowContent(true)
      setShowContent(!showContent);
    };
  

  return (
    <div>
    <Box>
        {/* 1st-header-section */}    
        <Grid container mb={5}>
             <Grid item xs={12} md={6}>
                 <h1 className='page_header'>Cameron Williamson</h1>

                 <Stack direction="row" spacing={1}>
                 <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                 <Typography>Updated December 19, 2021, 11:24 AM</Typography>

                 </Stack>
 
             </Grid>

            
  
         </Grid>

        {/* body-content-tab-set */}
           <Box sx={{ width: '100%' }} >
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                   <Tab label="Profile" {...a11yProps(0)} />
                   <Tab label="Applications" {...a11yProps(1)} />
                   <Tab label="Emails" {...a11yProps(1)} />
 
                 </Tabs>
               </Box>
            

            

                {/* Profile-related-tab */}
                <TabPanel value={value} index={0}>

                <Grid item xs={12} md={6} mt={2}>
                <Stack direction="row"  spacing={1}>
                 <Typography variant='h5'><span style={{fontSize:25,fontWeight:700}}>Profile</span>  </Typography>
                 <Link href="#" style={{fontSize:18,fontWeight:500}}>  <span style={{paddingTop:15}}><NoteAltOutlinedIcon mt={2} /></span>Edit Profile</Link>
                 </Stack>
               
             </Grid> 
                
                <Box sx={{ minWidth: 275 }}>

<Grid mt={4}><Typography align='left' fontSize={20} fontWeigh={700}>Basic Information</Typography></Grid>
<Grid container spacing={2}>
    <Grid item xs={6} >
        
      

           <TableContainer  style={{backgroundColor:'transparent'}}>
               <Table   aria-label="simple table" >
             
                 <TableBody>
                     {topleftrows.map((row) => (
                          <TableRow
                            key={row.leftData}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.leftData}
                            </TableCell>
                            <TableCell align="left">{row.rightData}</TableCell>
                           
                          </TableRow>
                        ))}
                 </TableBody>
               </Table>
           </TableContainer>


    </Grid>
    <Grid  item xs={6}>
    {/* <Typography>Financial Information</Typography> */}
 

          <TableContainer   style={{backgroundColor:'transparent'}}>
              <Table   aria-label="simple table" >
            
                <TableBody>
                    {toprightrows.map((row) => (
                         <TableRow
                           key={row.leftData}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                         >
                           <TableCell component="th" scope="row">
                             {row.leftData}
                           </TableCell>
                           <TableCell align="left">{row.rightData}</TableCell>
                          
                         </TableRow>
                       ))}
                </TableBody>
              </Table>
          </TableContainer>


      
    </Grid>
</Grid>
{/* down */}
<Grid mt={4}><Typography align='left' fontSize={20} fontWeigh={700}>Financial Information</Typography></Grid>
<Grid  container spacing={2} >
    <Grid item xs={6}>
       
       <TableContainer  style={{backgroundColor:'transparent'}}>
                <Table   aria-label="simple table" >
              
                  <TableBody>
                      {downleftrows.map((row) => (
                           <TableRow
                             key={row.leftData}
                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                           >
                             <TableCell component="th" scope="row" fontSize={20} fontWeigh={400}>
                               {row.leftData}
                             </TableCell>
                             <TableCell align="left" fontSize={20} fontWeigh={600}>{row.rightData}</TableCell>
                            
                           </TableRow>
                         ))}
                  </TableBody>
                </Table>
            </TableContainer>
            
            
           
     
    </Grid>



    <Grid item xs={6}>
      
       

           <TableContainer   style={{backgroundColor:'transparent'}}>
               <Table   aria-label="simple table" >
             
                 <TableBody>
                     {downrightrows.map((row) => (
                          <TableRow
                            key={row.leftData}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" fontSize={20} fontWeigh={400}>
                              {row.leftData}
                            </TableCell>
                            <TableCell align="left" fontSize={20} fontWeigh={600}>{row.rightData}</TableCell>
                           
                          </TableRow>
                        ))}
                 </TableBody>
               </Table>
           </TableContainer>


          
       
    </Grid>

    <Grid mt={6}>
        
    <div style={{marginBottom:100,display:'flex',justifyContent:'left' ,margin:20}}>
          {/* <CardContent style={{display:'flex',justifyContent:'left' }}> */}
                   <Button variant="outlined" >Continue</Button>
          {/* </CardContent> */}
            </div>

    </Grid>
</Grid>

</Box>

        
       
                </TabPanel>
              
          </Box>


       </Box>
    </div>
  )
}
ManageExistingContacts.layout = "AdminLayout";

export default ManageExistingContacts