import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

// function createData(name, LoanAmount, State) {
//   {
//     return {
//       name,
//       LoanAmount,
//       State,
//       history: [{}],
//     }
//   }
// }
// function Row(props) {
//   const { row } = props
//   const [open, setOpen] = React.useState(false)

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell>
//           <IconButton
//             aria-label='expand row'
//             size='small'
//             onClick={() => setOpen(!open)}
//             style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component='th' scope='row' style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}>
//           {row.name}
//         </TableCell>
//         <TableCell align='right'  style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}>{row.LoanAmount}</TableCell>
//         <TableCell align='right'  style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}>{row.State}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout='auto' unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant='h6' gutterBottom component='div'  style={{fontSize:11, fontWeight:500}}>
//                 History
//               </Typography>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   )
// }

// const rows = [
//   createData('James Borrower', 560000, 'FL'),
//   createData('James Borrower', 560000, 'FL'),
//   createData('James Borrower', 560000, 'FL'),
//   createData('James Borrower', 560000, 'FL'),
//   createData('James Borrower', 560000, 'FL'),
//   createData('James Borrower', 560000, 'FL'),
// ]


export default function CollapsibleTable({rows=[]}) {
  const [open, setOpen] = React.useState(false)
  return (
    <TableContainer >
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontSize: 11, fontWeight: 700 }}>Name</TableCell>
            <TableCell align='right' style={{ fontSize: 11, fontWeight: 700 }}>Loan Amount</TableCell>
            <TableCell align='right' style={{ fontSize: 11, fontWeight: 700 }}>State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            // <Row key={row.name} row={row} />
            <React.Fragment key={index}>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={() => setOpen(!open)}
                    style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component='th' scope='row' style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}>
                  {row?.basicInformation?.firstName || ""} { " "}{row?.basicInformation?.lastName || ""}
                </TableCell>
                <TableCell align='right'  style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}>{row?.application?.applicationBasicInfo?.loan_amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""} </TableCell>
                <TableCell align='right'  style={{fontSize:11, fontWeight:500 ,padding:0,margin:0}}>{row?.application?.status_ || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout='auto' unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant='h6' gutterBottom component='div'  style={{fontSize:11, fontWeight:500}}>
                        History
                      </Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
