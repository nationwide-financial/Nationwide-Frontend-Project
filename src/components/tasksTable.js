import React ,{useState} from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {
  Typography,
  Button,
  AvatarGroup,
  Avatar,
  Divider,
  Pagination,
  Stack,
} from '@mui/material'
import moment from 'moment'
import Link from 'next/link'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))



function renderHeader() {
  return (
    <Grid container sx={{ height: 40 }}>
      <Grid item xs={2}>
        <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
          Status
        </Typography>
      </Grid>
      <Grid item xs={2} style={{display:"flex",justifyContent:"left"}}>
        <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
          Assigned to
        </Typography>
      </Grid>
      <Grid item xs={2} pl={1}>
        <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
          DESCRIPTION
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
          APPLICATION
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ color: '#858585', fontWeight: 'bold', textAlign: 'left' }}>
          DUE DATE
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ color: '#858585', fontWeight: 'bold', textAlign: 'left' }}>
          UPDATED
        </Typography>
      </Grid>
      {/* <Grid item xs={2}>
        <Typography sx={{ color: '#858585', fontWeight: 'bold', textAlign: 'right' }}>
          ACTIONS
        </Typography>
      </Grid> */}
    </Grid>
  )
}

function FormRow({ task }) {
  const [rowId,setRowsId] =useState('')
  const getRow = (id) =>{
    console.log("PK",id)
    setRowsId(id)
  }
  return (
    <Grid container mt={1}  >
      <Grid item xs={2}>
        {/* <Button size='small' variant='outlined' color={task?.status === 'NEW' ? 'success' : task?.status === 'INPROGRESS' ? 'warning' : 'error'}>
          {task?.status}
        </Button> */}
         <span
            className="verified_label"
            style={{
              color:
              task?.status == "Not Done"
                  ? "red"
                  : task?.status == "Done"
                  ? "#FF8080"
                  : "black",
              backgroundColor:
              task?.status == "Not Done"
                  ? "#FF8080"
                  : task?.status == "Done"
                  ? "green"
                  : "white",
            }}
          >
            {task?.status || ""}
          </span>

      </Grid>
      <Grid item xs={2}>
        {/* <AvatarGroup max={3} sx={{ width: 30, height: 5 }}>
          <Avatar alt='avatar2' src='./images/avatar2.png ' />
          <Avatar alt='avatar1' src='./images/avatar1.png' />
          <Avatar alt='avatar3' src='./images/avatar3.png' />
          <Avatar alt='avatar4' src='./images/avatar4.png' />
        </AvatarGroup> */}
        <Typography sx={{ color: '#858585' }} style={{fontSize:14 ,fontWeight:500}} pr={1}>
          {task?.assignTo}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ color: '#858585' }} style={{fontSize:14 ,fontWeight:500}} >
          {task?.description}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography sx={{ color: '#858585' }}>
          {/* {task?.application} */}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ color: '#858585', textAlign: 'left' }} style={{fontSize:14 ,fontWeight:500}}>
          {task.dueDate && moment(task.dueDate).format('YYYY-MM-DD')}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ color: '#858585', textAlign: 'left' }} style={{fontSize:14 ,fontWeight:500}}>
          {task.updateTime && moment(task.updateTime).format('YYYY-MM-DD hh:MM A')}
        </Typography>
      </Grid>
      {/* <Grid item xs={2} sx={{ textAlign: 'right' }} >
        <Link href={'/tasks/view/' + task?.id}>
          <Button variant='outlined' size='small'>Edit</Button>
        </Link>
        <Button variant='outlined' size='small' onClick={() => onDeleteClick(task?.id)}>Delete</Button>
      </Grid> */}
      <Grid item xs={12} mt={1}>
        <Divider />
      </Grid>
    </Grid>
  )
}

export default function NestedGrid({ taskData = [], onDeleteTask }) {
  const renderDataRows = () => {
  
    const rowList = [];
    taskData && taskData.length > 0 && taskData.map((task, index) => {
      rowList.push(
        <FormRow task={task}/>
      )
    })

    return rowList;
  }

  return (
    <Grid container >
      {renderHeader()}
      {renderDataRows()}
      <Stack spacing={2}>
        <Pagination count={2} shape='rounded' />
      </Stack>
    </Grid>
  )
}
