import { Grid, TableContainer, Paper, Table, TableHead, TableCell, TableRow, MenuItem, Select, TableBody, Button, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";

const appHeaders = [
    { label: 'First Name', field: 'firstName' },
    { label: 'Last Name', field: 'lastName' },
    { label: 'Email', field: 'email' },
    { label: 'Phone', field: 'phone' },
    { label: 'ID Number', field: 'idNumber' },
    { label: 'Date of Birth', field: 'dob' },
    { label: 'Street Address', field: 'streetAddress' },
    { label: 'City', field: 'city' },
    { label: 'Province', field: 'state' },
    { label: 'Postal Code', field: 'postalCode' },
    { label: 'Country', field: 'country' },
    { label: 'Company Name', field: 'companyName' },
    { label: 'Job Title', field: 'jobTitle' }
]

function ImportMapping({ data, onPressBack, onPressImport }) {
    const [appHeaderState, setAppHeaderState] = useState([]);
    const [error, setError] = useState();
    console.log("App State ", appHeaderState);

    const renderTableHead = () => {
        const tableHead = [<TableCell key="1" sx={{ minWidth: 150 }}><b>APP HEADERS</b></TableCell>];
        let i = 0;
        appHeaders.forEach((item, key) => {
            tableHead.push(
                <TableCell sx={{ minWidth: 150 }} key={key}>
                    <Select fullWidth size='small' displayEmpty onChange={(e) => handleValueChange(key, e.target.value)}>
                        <MenuItem disabled>Select Value</MenuItem>
                        {appHeaders.map((header, i) => <MenuItem value={header} key={i}>
                            {header.label}
                        </MenuItem>)}
                    </Select>
                </TableCell>
            )

            i = i + 1;
        });
        return tableHead;
    }

    const handleValueChange = (position, value) => {
        const stateCopy = [...appHeaderState];
        setError(null);
        if (stateCopy.includes(value)) {
            setError("Duplicate header selection")
        } else {
            stateCopy[position] = value;
            setAppHeaderState(stateCopy);
        }

    }
    const renderFileHeaders = () => {
        const fileHeaders = [<TableCell key="2" sx={{ minWidth: 150 }}><b>Your Headers</b></TableCell>];
        data && data[0] && data.length > 0 && Object.entries(data[0]).forEach(([key, item]) => {
            fileHeaders.push(
                <TableCell key={key}>
                    {item}
                </TableCell>
            )
        })
        return fileHeaders;
    }

    const renderData = () => {
        const tableData = [];
        data && data[0] && data.length > 0 && Object.entries(data).forEach(([key, item]) => {
            if (key != 0) {
                tableData.push(
                    <TableRow key={key}>
                        <TableCell><b>Your Data</b></TableCell>
                        <TableCell>{item.row1}</TableCell>
                        <TableCell>{item.row2}</TableCell>
                        <TableCell>{item.row3}</TableCell>
                        <TableCell>{item.row4}</TableCell>
                        <TableCell>{item.row5}</TableCell>
                        <TableCell>{item.row6 && moment(item.row6).format('DD-MM-YYYY')}</TableCell>
                        <TableCell>{item.row7}</TableCell>
                        <TableCell>{item.row8}</TableCell>
                        <TableCell>{item.row9}</TableCell>
                        <TableCell>{item.row10}</TableCell>
                        <TableCell>{item.row11}</TableCell>
                        <TableCell>{item.row12}</TableCell>
                        <TableCell>{item.row13}</TableCell>
                    </TableRow>
                )
            }
        });
        return tableData;
    }

    const onImport = () => {
        const formattedObject = [];
        console.log(appHeaderState)
        if (appHeaderState.length !== 13 || appHeaderState.includes(undefined)) {
            setError("All the headers are mandatory")
        } else {
            setError(undefined);
            data && data.forEach((contact, key) => {
                console.log("Contact ", contact)
                if (key !== 0) {
                    formattedObject.push({
                        basicInformation: {
                            [appHeaderState[0].field]: contact.row1,
                            [appHeaderState[1].field]: contact.row2,
                            [appHeaderState[2].field]: contact.row3,
                            [appHeaderState[3].field]: contact.row4,
                            [appHeaderState[4].field]: contact.row5,
                            [appHeaderState[5].field]: contact.row6,
                            [appHeaderState[6].field]: contact.row7,
                            [appHeaderState[7].field]: contact.row8,
                            [appHeaderState[8].field]: contact.row9,
                            [appHeaderState[9].field]: contact.row10,
                            [appHeaderState[10].field]: contact.row11
                        },
                        jobInformation: {
                            [appHeaderState[11].field]: contact.row12,
                            [appHeaderState[12].field]: contact.row13
                        }
                    })
                }
            })
            onPressImport(formattedObject);
        }
    }


    console.log("App Header State", appHeaderState)
    return (
        <Grid container spacing={2} p={2}>
            <Grid item xs={12} mt={2}>
                <h1>Map Your New Contact List</h1>
                <h3 style={{ marginTop: 30 }}>Verify List Field Mappings</h3>
            </Grid>
            <Grid item xs={12} m={2}>
                <Typography variant="h6" color='error'>{error}</Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none', maxWidth: window.innerWidth - 320, overflowX: 'scroll' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {renderTableHead()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {renderFileHeaders()}
                            </TableRow>
                            {renderData()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container m={2}>
                <Grid item xs={6}>
                    <Button onClick={() => onPressBack()} variant="contained">Back To Field Mapping</Button>
                </Grid>
                <Grid item xs={6} justifyContent='flex-end' display='flex'>
                    <Button variant="contained" onClick={() => onImport(appHeaderState)}>Import Now</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

ImportMapping.layout = "AdminLayout"
export default ImportMapping;