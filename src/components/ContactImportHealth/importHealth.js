import { Button, Grid, Typography } from "@mui/material"
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

function ImportHealth({ data, onGoBack,listData }) {
    console.log("listData",listData)
    console.log("Props ", data)
    return (
        <Grid container spacing={2} m={2}>
            <Grid item xs={12} m={1} mb={4}>
                <Typography variant="h1" sx={{ fontSize: 36, fontWeight: 'bold' }} mb={4}>Your List Health Report</Typography>
                <Typography variant="h1" sx={{ fontSize: 26, fontWeight: 600 }}>Here&apos;s what we found for the list</Typography>
            </Grid>
            <Grid container xs={12} direction='row' sx={{ backgroundColor: '#ffffff', borderRadius: 2 }} m={1} mb={6} mx={3} p={3}>
                <Grid item xs={12} mb={2}>
                    <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600 }}>The Good</Typography>
                </Grid>
                <Grid item xs={4} p={2} direction='column' justifyContent='center' alignContent='center' sx={{ borderRight: '1px solid #bababa' }}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={2}>Total Contacts in List</Typography>
                    <Typography variant="h1" fontSize={20} align='center'>{data.validCount + data.invalidCount}</Typography>
                </Grid>
                <Grid item xs={4} p={2} direction='column' justifyContent='center' alignContent='center' sx={{ borderRight: '1px solid #bababa' }}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={2}>Total Valid Contacts</Typography>
                    <Typography variant="h1" fontSize={20} align='center'>{data.validCount}</Typography>
                </Grid>
                <Grid item xs={4} p={2} direction='column' justifyContent='center' alignContent='center'>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={2}>Total Contacts Importing</Typography>
                    <Typography variant="h1" fontSize={20} align='center'>{data.validCount}</Typography>
                </Grid>
            </Grid>
            <Grid container xs={12} direction='row' sx={{ backgroundColor: '#ffffff', borderRadius: 2 }} m={1} mb={6} mx={3} p={3}>
            <TableContainer
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left"><b>First Name</b></TableCell>
                                  <TableCell align="left"><b>last Name</b></TableCell>
                                  <TableCell align="left"><b>Middle Initial</b></TableCell>
                                  <TableCell align="left"><b>Other Name</b></TableCell>
                                  <TableCell align="left"><b>Email Address</b></TableCell>
                                  <TableCell align="left"><b>Home Phone Number</b></TableCell>
                                  <TableCell align="left"><b>Mobile Phone Number</b></TableCell>
                                  <TableCell align="left"><b>work</b></TableCell>
                                  <TableCell align="left"><b>fax</b></TableCell>
                                  <TableCell align="left"><b>address1</b></TableCell>
                                  <TableCell align="left"><b>address2</b></TableCell>
                                  <TableCell align="left"><b>city Or State</b></TableCell>
                                  <TableCell align="left"><b>Zip</b></TableCell>
                                  <TableCell align="left"><b>country</b></TableCell>
                                  <TableCell align="left"><b>eligibility Status</b></TableCell>
                                  <TableCell align="left"><b>primary Language</b></TableCell>
                                  <TableCell align="left"><b>preferred Method</b></TableCell>
                                  <TableCell align="left"><b>primary Number</b></TableCell>
                                  <TableCell align="left"><b>best Time To Call</b></TableCell>
                                  <TableCell align="left"><b>time Zone</b></TableCell>
                                  <TableCell align="left"><b>credit Score</b></TableCell>
                                  <TableCell align="left"><b>date</b></TableCell>
                                  <TableCell align="left"><b>credit Report Type</b></TableCell>
                                  <TableCell align="left"><b>dob</b></TableCell>
                                  <TableCell align="left"><b>ssn</b></TableCell>
                                  <TableCell align="left"><b>dl</b></TableCell>
                                  <TableCell align="left"><b>state</b></TableCell>
                                  <TableCell align="left"><b>employer</b></TableCell>
                                  <TableCell align="left"><b>occ</b></TableCell>
                                  <TableCell align="left"><b>empLengthY</b></TableCell>
                                  <TableCell align="left"><b>empLengthM</b></TableCell>
                                  <TableCell align="left"><b>mortgage Balance</b></TableCell>
                                  <TableCell align="left"><b>home Value</b></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {listData?.map((row, i) => (
                                  <TableRow  key={i} sx={{ "&:last-child td, &:last-child th": { border: 0, },}}>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.firstName} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.lastName} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.middleInitial} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.otherName} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.emailAddress} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.homePhoneNumber} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.mobilePhoneNumber} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.work} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.fax} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.address1} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.address2} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.cityOrState} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.Zip} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.country} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.eligibilityStatus} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.primaryLanguage} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.preferredMethod} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.primaryNumber} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.bestTimeToCall} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.timeZone} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.creditScore} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.date} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.creditReportType} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.dob} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.ssn} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.dl} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.state} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.employer} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.occ} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.empLengthY} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.empLengthM} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.mortgageBalance} </TableCell>
                                    <TableCell component="th" scope="row"> {row?.basicInformation?.homeValue} </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
            </Grid>

            <Grid container xs={12} direction='row' sx={{ backgroundColor: '#ffffff', borderRadius: 2 }} m={1} mb={6} mx={3} p={3}>
                <Grid item xs={12} mb={2}>
                    <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600 }}>The Naughty</Typography>
                </Grid>
                <Grid item xs={3} p={2} direction='column' justifyContent='center' alignContent='center' sx={{ borderRight: '1px solid #bababa' }}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={2}>Total Invalid Contacts</Typography>
                    <Typography variant="h1" fontSize={20} align='center'>{data.invalidCount}</Typography>
                </Grid>
                <Grid item xs={3} p={2} direction='column' justifyContent='center' alignContent='center' sx={{ borderRight: '1px solid #bababa' }}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={2}>Duplicate Contacts</Typography>
                    <Typography variant="h1" fontSize={12} align='center' color='red'>TO BE IMPLEMENTED</Typography>
                </Grid>
                <Grid item xs={3} p={2} direction='column' justifyContent='center' alignContent='center' sx={{ borderRight: '1px solid #bababa' }}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={2}>Contacts Truncated</Typography>
                    <Typography variant="h1" fontSize={12} align='center' color='red'>TO BE IMPLEMENTED</Typography>
                </Grid>
                <Grid item xs={3} p={2} direction='column' justifyContent='center' alignContent='center'>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={2}>Total fields Truncated</Typography>
                    <Typography variant="h1" fontSize={12} align='center' color='red'>TO BE IMPLEMENTED</Typography>
                </Grid>
            </Grid>
            <Grid container xs={12} direction='row' sx={{ backgroundColor: '#ffffff', borderRadius: 2 }} m={1} mx={3} p={3}>
                <Grid item xs={12} mb={4}>
                    <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600 }}>What does it Mean?</Typography>
                </Grid>
                <Grid item xs={4} p={2} direction='column' display='flex' sx={{ borderRight: '1px solid #bababa' }}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={1}>Invalid Contacts</Typography>
                    <Typography variant="h1" fontSize={14} align='center' mb={2}>Download a properly formed xlxs file for import</Typography>
                    <Button variant="contained" sx={{ margin: 'auto' }}>Search and Fix them in your list</Button>
                </Grid>
                <Grid item xs={4} p={2} direction='column' justifyContent='center' alignContent='center' sx={{ borderRight: '1px solid #bababa' }}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={1}>Duplicate Contacts</Typography>
                    <Typography variant="h1" fontSize={14} align='center'>Download a properly formed xlxs file for import</Typography>
                </Grid>
                <Grid item xs={4} p={2} display='flex' direction='column' justifyContent='center' alignContent='center'>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={1}>Truncated Contacts</Typography>
                    <Typography variant="h1" fontSize={14} align='center' mb={2}>Download a properly formed xlxs file for import</Typography>
                    <Button variant="contained" sx={{ margin: 'auto' }}>Contact Field Lengths Guide</Button>
                </Grid>
                <Grid item xs={12} display='flex' direction='column' justifyContent='center' alignContent='center' mt={8}>
                    <Typography variant="h2" fontSize={20} align='center' fontWeight={400} mb={1}>All Contacts Are Now Being Imported</Typography>
                    <Typography variant="h1" fontSize={14} align='center' mb={2}>If your list has over 5,000 contacts, it may take a minute or two. We&apos;ll send an email when finished</Typography>
                    <Link href={'/contact'} style={{ textAlign: 'center', margin: 'auto' }}>
                        <Button variant="contained">Go To My Contacts</Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

ImportHealth.layout = "AdminLayout";
export default ImportHealth;