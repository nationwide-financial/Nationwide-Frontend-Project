import { Button, Grid, Typography } from "@mui/material"
import Link from "next/link";

function ImportHealth({ data, onGoBack }) {
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