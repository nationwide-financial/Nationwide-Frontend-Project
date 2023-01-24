import React from 'react'
import { Avatar, Box, Button, FormControlLabel, Grid, IconButton, InputAdornment, TablePagination, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Link from '@mui/material/Link';
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
import FormHelperText  from '@mui/material/FormHelperText';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MenuItem from '@mui/material/MenuItem';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { height } from '@mui/system';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


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

// card-related---

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      
      <Typography sx={{ mb: 1.5 }} color="text.secondary style_">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

// card-related---

function LoanApplication() {
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const IOSSwitch = styled(( props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 40,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#1976d2',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 20,
        height: 20,
    },
    '& .MuiSwitch-track': {
        borderRadius: 24 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));



 
  return (
    <div>
        
      <Box>

        {/* 1st-header-section */}    
        <Grid container mb={5}>
             <Grid item xs={12} md={6}>
                 <h1 className='page_header'>Loan Applications</h1>
             </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'right' }}>
                {/* icon-4 */}
                  <IconButton sx={{width: 10,height:10,borderRadius: 1,border: "1px solid",borderColor: "gray",padding: 2,marginRight:2,}} aria-label="save">
                                    <SyncOutlinedIcon fontSize='large' sx={{ color: "gray" }} />
                  </IconButton> 
                  <Button variant="contained" sx={{ padding: '10px 40px' }} onClick={handleClickOpen}>New Application</Button>
                
                  <Dialog open={open} onClose={handleClose} fullWidth m={4}>                       
                        <Box sx={{ width: 1000, maxWidth: '100%', }} >
                          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            <Typography variant='h6' style={{fontSize:30,fontFamily:'Gilroy-Bold'}}>New Application</Typography>
                          </BootstrapDialogTitle>

                          <DialogContent>
                              <FormControl style={{display:'flex', justifyContent:'center'}}>
                                <label>  <Typography variant='h6' style={{fontSize:17,fontWeight:700,fontFamily:'Montserrat',fontStyle:'normal'}}>Selected Product</Typography></label>
                              <Box sx={{  maxWidth: '100%', }} >
                              <Stack spacing={2} direction="row"><Button fullWidth variant="outlined"><Grid container display={'flex'} ><Grid xs={6} align='left'>Home Improvment</Grid> <Grid xs={6} align='right'><HomeOutlinedIcon/></Grid></Grid></Button></Stack>
                              </Box>
                              <Box sx={{  maxWidth: '100%', }} mt={2}>
                              <Stack spacing={2} direction="row"><Button fullWidth variant="outlined">
                              <Grid container display={'flex'} ><Grid xs={6} align='left'>Consolidate Debt</Grid> <Grid xs={6} align='right'><TextSnippetOutlinedIcon/></Grid></Grid>
                                </Button></Stack>
                              </Box>

                              <Box sx={{  maxWidth: '100%', }} mt={2}>
                              <Stack spacing={2} direction="row"><Button fullWidth variant="outlined">
                              <Grid container display={'flex'} ><Grid xs={6} align='left'>Pay off Credit Cards</Grid> <Grid xs={6} align='right'><CreditCardOutlinedIcon/></Grid></Grid>
                                </Button></Stack>
                              </Box>

                              <Box sx={{  maxWidth: '100%', }} mt={2}>
                              <Stack spacing={2} direction="row"><Button fullWidth variant="outlined">
                              <Grid container display={'flex'} ><Grid xs={6} align='left'>Refinance my Car</Grid> <Grid xs={6} align='right'><DirectionsCarFilledOutlinedIcon/></Grid></Grid>
                                </Button></Stack>
                              </Box>

                              <Box sx={{  maxWidth: '100%', }} mt={2}>
                              <Stack spacing={2} direction="row"><Button fullWidth variant="outlined">
                              <Grid container display={'flex'} ><Grid xs={6} align='left'>Something Else</Grid> <Grid xs={6} align='right'><WorkOutlineOutlinedIcon/></Grid></Grid>
                                </Button></Stack>
                              </Box>
                              <label>  <Typography variant='h6' style={{fontSize:17,fontWeight:700,fontFamily:'Montserrat',fontStyle:'normal'}}>Application Form Options</Typography></label>
                              <Box sx={{  maxWidth: '100%', }} >  
                              <FormGroup>
                                  <FormControlLabel control={<Checkbox defaultChecked />} label="Include Co-Borrower Page" />
                              </FormGroup>
                              </Box>

                          </FormControl>
                          </DialogContent>
                          <div style={{marginBottom:100}}>
                          <DialogActions style={{display:'flex',justifyContent:'left' }}>
                                    <Button variant="contained" onClick={handleClose} >Continue</Button>
                          </DialogActions>
                          </div>
                        </Box>
                  </Dialog>
              </Box>
            </Grid>
  
        </Grid>

        {/* 2nd-header-section */}
         <Grid container mt={2}>
                {/* header-search-section */}
                <Grid item xs={12} md={5}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                    <SearchOutlinedIcon fontSize='medium'/>
                    </Grid>
                    <TextField id="input-with-icon-textfield" label="Search" variant="standard"  />
                    </Grid>
                </Grid>
                {/* active-user-display-section */}
                <Grid item xs={12} md={1}>
                     <AvatarGroup total={9}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                </Grid>
                {/* other-icon-set */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'right' }} >
                        {/* <FormControlLabel  control={<IOSSwitch sx={{ m: 1 }} />} label="Show achieved"/> */}
                    {/*icon-1  */}
                   <IconButton sx={{width: 10,height:10,borderRadius: 1,border: "1px solid",borderColor: "gray",padding: 2,marginRight:2,}} aria-label="save" style={{transform: "rotate(360deg)",}}>
                              <SyncAltOutlinedIcon sx={{ color: "gray" }}  />
                   </IconButton>
                   {/* icon-2 */}
                   <IconButton sx={{width: 10,height:10,borderRadius: 1,border: "1px solid",borderColor: "gray",padding: 2,marginRight:2,}} aria-label="save">
                              <TuneOutlined sx={{ color: "gray" }} />
                   </IconButton>
                   {/* icon-3 */}
                   <IconButton sx={{width: 10,height:10,borderRadius: 1,border: "1px solid",borderColor: "gray",padding: 2,marginRight:2,}} aria-label="save">
                              <DashboardOutlinedIcon sx={{ color: "gray" }} />
                   </IconButton>
                   {/* icon-4 */}
                   <IconButton sx={{width: 10,height:10,borderRadius: 1,border: "1px solid",borderColor: "gray",padding: 2,}} aria-label="save">
                              <ViewCompactOutlinedIcon sx={{ color: "gray" }} />
                   </IconButton>
                </Box>
                </Grid>

         </Grid>

        {/*body-content  */}
         <Grid container spacing={2} mt={2}>
             <Grid item  xs={3}>
              <Item style={{height:1000}}>
                <Grid container >
                  <Typography variant='h5' fontFamily={'Montserrat'} fontSize={21} fontWeight={700} color={'#393939'}>New Opportunities</Typography>
                  <Typography fontFamily={'Montserrat'} fontSize={21} fontWeight={500}>$1,424,340</Typography>
                </Grid>
                {/* 1 */}
                <Grid>
                  <Box sx={{  padding:0}} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8'}}>

                      <CardContent>
                        <div style={{display:'flex',border:'none', }}>
                          <div style={{backgroundColor:'#319DF9',height:5,width:20,}}></div>
                          <div style={{backgroundColor:'#2D5680',height:5,width:20,marginLeft:5}}></div>
                        </div>

                        <Typography align='left' fontFamily={'Montserrat'} fontSize={18} fontWeight={700}>Jane Cooper</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left' fontFamily={'Montserrat'} fontSize={23} fontWeight={700}>$244,200</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent>
                     </Card>
                  </Box>
                </Grid>
                {/* 2 */}
                <Grid>
                  <Box sx={{  padding:0}} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8'}}>

                      <CardContent>
                      <div style={{display:'flex',border:'none', }}>
                          <div style={{backgroundColor:'#F86B6C',height:5,width:20,}}></div>
                          <div style={{backgroundColor:'#FF981F',height:5,width:20,marginLeft:5}}></div>
                          <div style={{backgroundColor:'#319DF9',height:5,width:20,marginLeft:5}}></div>
                          <div style={{backgroundColor:'#22CAB5',height:5,width:20,marginLeft:5}}></div>
                        </div>

                        <Typography align='left' fontFamily={'Montserrat'} fontSize={18} fontWeight={700}>Wade Warren</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left' fontFamily={'Montserrat'} fontSize={23} fontWeight={700}>$12,700</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent>
                     </Card>
                  </Box>
                </Grid>
                {/* 3 */}
                <Grid>
                  <Box sx={{  padding:0}} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8'}}>

                      <CardContent>
                      <div style={{display:'flex',border:'none', }}>
                          
                          <div style={{backgroundColor:'#22CAB5',height:5,width:20,}}></div>
                        </div>

                        <Typography align='left' fontFamily={'Montserrat'} fontSize={18} fontWeight={700}>Esther Howard</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left' fontFamily={'Montserrat'} fontSize={23} fontWeight={700}>$20,890</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent>
                     </Card>
                  </Box>
                </Grid>
                {/* 4 */}
                <Grid>
                  <Box sx={{  padding:0}} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8'}}>

                      <CardContent>
                      <div style={{display:'flex',border:'none', }}>
                         
                          <div style={{backgroundColor:'#22CAB5',height:5,width:20,}}></div>
                        </div>

                        <Typography align='left' fontFamily={'Montserrat'} fontSize={18} fontWeight={700}>Esther Howard</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left' fontFamily={'Montserrat'} fontSize={23} fontWeight={700}>$756,100</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent>
                     </Card>
                  </Box>
                </Grid>
                {/* 5 */}
                <Grid>
                  <Box sx={{  padding:0}} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8'}}>

                      <CardContent>
                      <div style={{display:'flex',border:'none', }}>
                          <div style={{backgroundColor:'#F86B6C',height:5,width:20,}}></div>
                          <div style={{backgroundColor:'#FF981F',height:5,width:20,marginLeft:5}}></div>
                          <div style={{backgroundColor:'#319DF9',height:5,width:20,marginLeft:5}}></div>
                          <div style={{backgroundColor:'#22CAB5',height:5,width:20,marginLeft:5}}></div>
                          <div style={{backgroundColor:'#2D5680',height:5,width:20,marginLeft:5}}></div>
                        </div>
                        <Typography align='left' fontFamily={'Montserrat'} fontSize={18} fontWeight={700}>Beth Robertson</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left' fontFamily={'Montserrat'} fontSize={23} fontWeight={700}>$2,200</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent>
                     </Card>
                  </Box>
                </Grid>
                
              </Item>
              </Grid>
            <Grid item  xs={3}>
              <Item style={{height:1000}}>
                <Grid container >
                  <Grid xs={12}> <Typography variant='h5' align='left' fontFamily={'Montserrat'} fontSize={21} fontWeight={700} color={'#393939'}>Beth Robertson</Typography></Grid>
                  <Grid xs={12}> <Typography align='left' fontFamily={'Montserrat'} fontSize={21} fontWeight={500} >$0</Typography></Grid>
                 
                </Grid>
                <Grid>
                  <Box sx={{  padding:0 }} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8',borderStyle:'dashed' , height:145}}>

                      {/* <CardContent>
                        <div style={{display:'flex',marginLeft:-2,border:'none'}}>
                          <div style={{backgroundColor:'#319DF9',height:2,width:20}}></div>
                          <div style={{backgroundColor:'green',height:2,width:20}}></div>
                        </div>

                        <Typography align='left'>Jane Cooper</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left'>$244,200</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent> */}
                     </Card>
                  </Box>
                </Grid>
                


              </Item>
            </Grid>
            <Grid item  xs={3}>
            <Item style={{height:1000}}>
                <Grid container >
                  <Grid xs={12}> <Typography variant='h5' align='left' fontFamily={'Montserrat'} fontSize={21} fontWeight={700} color={'#393939'}>Loan Underwriting</Typography></Grid>
                  <Grid xs={12}> <Typography align='left' fontFamily={'Montserrat'} fontSize={21} fontWeight={500} >$35,600</Typography></Grid>
                 
                </Grid>
                <Grid>
                  <Box sx={{  padding:0}} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8'}}>

                      <CardContent>
                      <div style={{display:'flex',border:'none', }}>
                          <div style={{backgroundColor:'#F86B6C',height:5,width:20,}}></div>
                          <div style={{backgroundColor:'#FF981F',height:5,width:20,marginLeft:5}}></div>
                          <div style={{backgroundColor:'#319DF9',height:5,width:20,marginLeft:5}}></div>
                          <div style={{backgroundColor:'#22CAB5',height:5,width:20,marginLeft:5}}></div>
                        </div>

                        <Typography align='left' fontFamily={'Montserrat'} fontSize={18} fontWeight={700}>Jane Cooper</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left' fontFamily={'Montserrat'} fontSize={23} fontWeight={700}>$35,600</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent>
                     </Card>
                  </Box>
                </Grid>


              </Item>
              </Grid>
            <Grid item  xs={3}>
            <Item style={{height:1000}}>
                <Grid container >
                  <Grid xs={12}> <Typography variant='h5' align='left' fontFamily={'Montserrat'} fontSize={21} fontWeight={700} color={'#393939'}>Negotiation</Typography></Grid>
                  <Grid xs={12}> <Typography align='left' fontFamily={'Montserrat'} fontSize={21} fontWeight={500} >$0</Typography></Grid>
                 
                </Grid>
                {/* <Grid>
                  <Box sx={{  padding:0}} >
                     <Card variant="outlined" sx={{backgroundColor:'#F8F8F8'}}>

                      <CardContent>
                        <div style={{display:'flex',marginLeft:-2,border:'none'}}>
                          <div style={{backgroundColor:'#319DF9',height:2,width:20}}></div>
                          <div style={{backgroundColor:'green',height:2,width:20}}></div>
                        </div>

                        <Typography align='left'>Jane Cooper</Typography>
                        <Typography align='left'>#6623960 | Oct. 24, 2021</Typography>
                      </CardContent> 

                      <CardContent >
                        <Grid container>
                          <Grid xs={6}><Typography align='left'>$244,200</Typography></Grid> 
                          <Grid xs={6}>  <Avatar align='right' alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 24, height: 24 }} /></Grid>
                          </Grid>
                      </CardContent>
                     </Card>
                  </Box>
                </Grid>
                 */}


              </Item>
              </Grid>
         </Grid>

      </Box>

    </div>
  )
}

LoanApplication.layout = "AdminLayout";

export default LoanApplication