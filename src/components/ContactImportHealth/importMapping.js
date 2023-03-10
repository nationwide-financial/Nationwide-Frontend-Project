import { Grid, TableContainer, Paper, Table, TableHead, TableCell, TableRow, MenuItem, Select, TableBody, Button, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";

const appHeaders = [
    { label: 'First Name', field: 'firstName' },
    { label: 'Last Name', field: 'lastName' },
    { label: 'Middle Intial', field: 'middleInitial' },
    { label: 'Other Name', field: 'otherName' },
    { label: 'Email', field: 'emailAddress' },
    { label: 'Home Phone', field: 'homePhoneNumber' },
    { label: 'Mobile Phone', field: 'mobilePhoneNumber' },
    { label: 'Work Phone', field: 'work' },
    { label: 'Fax', field: 'fax' },
    { label: 'Address 1', field: 'address1' },
    { label: 'Address 2', field: 'address2' },
    { label: 'City or State', field: 'cityOrState' },
    { label: 'Zip', field: 'Zip' },
    { label: 'primary Language', field: 'primaryLanguage' },
    { label: 'Marital Status', field: 'maritalStatus' },
    { label: 'Do You Rent Or Own', field: 'doYouRentOrOwn' },
    { label: 'Time Zone', field: 'timeZone' },
    { label: 'Credit Score', field: 'creditScore' },
    { label: 'date', field: 'date' },
    { label: 'dob', field: 'dob' },
    { label: 'ssn', field: 'ssn' },
    { label: 'dl', field: 'dl' },
    { label: 'state', field: 'state' },
    { label: 'employer', field: 'employer' },
    { label: 'occ', field: 'occ' },
    { label: 'employment Status', field: 'employmentStatus' },
    { label: 'emp Length Y', field: 'empLengthY' },
    { label: 'emp Length M', field: 'empLengthM' },
    { label: 'mortgage Payment', field: 'mortgagePayment' },
    { label: 'mortgage Balance', field: 'mortgageBalance' },
    { label: 'home Value', field: 'homeValue' },
    { label: 'best Time To Call', field: 'bestTimeToCall' },
    { label: 'credit Report Type', field: 'creditReportType' },
    { label: 'state', field: 'state_' }
]

function ImportMapping({ data, onPressBack, onPressImport,setListData }) {
    const [appHeaderState, setAppHeaderState] = useState([]);
    const [error, setError] = useState();
    console.log("App State ", appHeaderState, appHeaderState[32]);

    const renderTableHead = () => {
        const tableHead = [<TableCell key="hd1" sx={{ minWidth: 150 }}><b>APP HEADERS</b></TableCell>];
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
        const fileHeaders = [<TableCell key="hd2" sx={{ minWidth: 150 }}><b>Your Headers</b></TableCell>];
        data && data[0] && data.length > 0 && Object.entries(data[0]).forEach(([key, item]) => {
            console.log("Data ", key, item)
            fileHeaders.push(
                <TableCell key={"k"+key}>
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
                    <TableRow key={"dt"+key}>
                        <TableCell><b>Your Data</b></TableCell>
                        <TableCell>{item.row1}</TableCell>
                        <TableCell>{item.row2}</TableCell>
                        <TableCell>{item.row3}</TableCell>
                        <TableCell>{item.row4}</TableCell>
                        <TableCell>{item.row5}</TableCell>
                        <TableCell>{item.row6}</TableCell>
                        <TableCell>{item.row7}</TableCell>
                        <TableCell>{item.row8}</TableCell>
                        <TableCell>{item.row9}</TableCell>
                        <TableCell>{item.row10}</TableCell>
                        <TableCell>{item.row11}</TableCell>
                        <TableCell>{item.row12}</TableCell>
                        <TableCell>{item.row13}</TableCell>
                        <TableCell>{item.row14}</TableCell>
                        <TableCell>{item.row15}</TableCell>
                        <TableCell>{item.row16}</TableCell>
                        <TableCell>{item.row17}</TableCell>
                        <TableCell>{item.row18}</TableCell>
                        <TableCell>{item.row19}</TableCell>
                        <TableCell>{item.row20}</TableCell>
                        <TableCell>{item.row21}</TableCell>
                        <TableCell>{item.row22}</TableCell>
                        <TableCell>{item.row23}</TableCell>
                        <TableCell>{item.row24}</TableCell>
                        <TableCell>{item.row25}</TableCell>
                        <TableCell>{item.row26}</TableCell>
                        <TableCell>{item.row27}</TableCell>
                        <TableCell>{item.row28}</TableCell>
                        <TableCell>{item.row29}</TableCell>
                        <TableCell>{item.row30}</TableCell>
                        <TableCell>{item.row31}</TableCell>
                        <TableCell>{item.row32}</TableCell>
                        <TableCell>{item.row33}</TableCell>
                        <TableCell>{item.row34}</TableCell>
                        <TableCell>{item.row35}</TableCell>
                    </TableRow>
                )
            }
        });
        return tableData;
    }

    const onImport = () => {
        const formattedObject = [];
        console.log(appHeaderState)
        if (appHeaderState.length !== 34 || appHeaderState.includes(undefined)) {
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
                            [appHeaderState[11].field]: contact.row11,
                            [appHeaderState[12].field]: contact.row12,
                            [appHeaderState[13].field]: contact.row13,
                            [appHeaderState[14].field]: contact.row14,
                            [appHeaderState[15].field]: contact.row15,
                            [appHeaderState[16].field]: contact.row16,
                            [appHeaderState[17].field]: contact.row17,
                            [appHeaderState[18].field]: contact.row18,
                            [appHeaderState[19].field]: contact.row19,
                            [appHeaderState[20].field]: contact.row20,
                            [appHeaderState[21].field]: contact.row21,
                            [appHeaderState[22].field]: contact.row22,
                            [appHeaderState[23].field]: contact.row23,
                            [appHeaderState[24].field]: contact.row24,
                            [appHeaderState[25].field]: contact.row25,
                            [appHeaderState[26].field]: contact.row26,
                            [appHeaderState[27].field]: contact.row27,
                            [appHeaderState[28].field]: contact.row28,
                            [appHeaderState[29].field]: contact.row29,
                            [appHeaderState[30].field]: contact.row30,
                            [appHeaderState[31].field]: contact.row31,
                            [appHeaderState[32].field]: contact.row32,
                            [appHeaderState[33].field]: contact.row33,
                            [appHeaderState[34].field]: contact.row34,
                        }
                    })
                }
            })
            setListData(formattedObject)
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