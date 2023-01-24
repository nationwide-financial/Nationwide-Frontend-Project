import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Typography, Divider } from '@mui/material'
import Chip from '@mui/material/Chip';
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

function FormRow() {
  return (
    <React.Fragment>
      <Stack direction="row" mt={2} >
      <Grid item xs={2} mr={4}>
        <img src='./images/Frame 63.png'  width="70px"></img>
      </Grid>
      <Grid item xs={5} pt={1}>
        <Typography
        align='center'
          color='#858585'
          style={{fontSize:9 ,padding:0,margin:0}}
        >
          James Borrower
        </Typography>
      </Grid>
      <Grid item xs={4}>
        {/* <div
          style={{
            backgroundColor: '#D3D3D3',
            textAlign:'center',
            padding: '0 5px',
            borderRadius:5,
           fontSize:10 
          }}
        >
          Pre-Approved
        </div> */}
              <Chip label="Pre-Approved" size="small" style={{fontSize:8,padding:0,margin:0}} />

      </Grid></Stack>
      <Grid item xs={12}>
        <Typography
          align='left'
          // fontSize='1.0rem'
          // fontWeight='bold'
          style={{fontSize:10 ,fontWeight:500}}
          color='#858585'
        >
          Internet
        </Typography>
        <Typography
          align='left'
          // fontSize='1.0rem'
          // fontWeight='bold'
          style={{fontSize:10 ,fontWeight:500}}
          color='#858585'
        >
          Modified Date: 8/31/2022 11:54 AM EDT
        </Typography>
        <Grid item xs={12} sx={{ paddingTop: 1, paddingBottom: 0 }}>
          <Divider />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={1}>
          <FormRow />
        </Grid>
        <Grid container item spacing={1}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  )
}
