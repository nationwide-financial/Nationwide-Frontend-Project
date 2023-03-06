import { Box, Button, Grid, Input, Stack, TextField, CircularProgress } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { _addBulkContacts } from '../../services/contactServices';
import { useRouter } from "next/router";
import ImportHealth from "../../components/ContactImportHealth/importHealth";
import ImportMapping from "../../components/ContactImportHealth/importMapping";

const ExcelJs = require('exceljs');

const fileTypes = ["xlsx"];

function ImportContacts() {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showHealth, setShowHealth] = useState(false);
    const [showMapping, setShowMapping] = useState(false);
    const [healthData, setHealthData] = useState({ validCount: 0, invalidCount: 0 });
    const [fileData, setFileData] = useState([]);
    const [error, setError] = useState()
    const handleChange = (file) => {
        setFile(file);
    };

    const onClickSubmit = async () => {
        const workbook = new ExcelJs.Workbook();
        const data = [];

        if (file) {
            // setLoading(true);
            const fileName = file.name.split('.');
            const fileType = fileName[fileName.length - 1];
            switch (fileType) {
                case 'xlsx': {
                    const workBookLoaded = await workbook.xlsx.load(file)
                    const worksheet = workBookLoaded.getWorksheet(1)
                    const values = worksheet.getSheetValues();

                    values.forEach((row, key) => {
                        if (row.length !== 0) {
                            if (key !== 1) {
                                const firstName = row[1];
                                const lastName = row[2];
                                const middleInitial = row[3];
                                const otherName = row[4];
                                const email = typeof row[5] === 'object' ? row[5]?.text : row[5];
                                const homePhoneNumber = row[6];
                                const mobilePhoneNumber = row[7];
                                const work = row[8];
                                const fax = row[9];
                                const address1 = row[10];
                                const address2 = row[11];
                                const cityOrState = row[12];
                                const Zip = row[13];
                                const country = row[14];
                                const eligibilityStatus = row[15];
                                const primaryLanguage = row[16];
                                const preferredMethod = row[17];
                                const primaryNumber = row[18];
                                const bestTimeToCall = row[19];
                                const timeZone = row[20];
                                const creditScore = row[21];
                                const date = row[22];
                                const creditReportType = row[23];
                                const dob = row[24];
                                const ssn = row[25];
                                const dl = row[26];
                                const state = row[27];
                                const employer = row[28];
                                const occ = row[29];
                                const empLengthY = row[30];
                                const empLengthM = row[31];
                                const mortgageBalance = row[32];
                                const homeValue = row[33];

                                data.push({
                                    row1: firstName,
                                    row2: lastName,
                                    row3: middleInitial,
                                    row4: otherName,
                                    row5: email,
                                    row6: homePhoneNumber,
                                    row7: mobilePhoneNumber,
                                    row8: work,
                                    row9: fax,
                                    row10: address1,
                                    row11: address2,
                                    row12: cityOrState,
                                    row13: Zip,
                                    row14: country,
                                    row15: eligibilityStatus,
                                    row16: primaryLanguage,
                                    row17: preferredMethod,
                                    row18: primaryNumber,
                                    row19: bestTimeToCall,
                                    row20: timeZone,
                                    row21: creditScore,
                                    row22: date,
                                    row23: creditReportType,
                                    row24: dob,
                                    row25: ssn,
                                    row26: dl,
                                    row27: state,
                                    row28: employer,
                                    row29: occ,
                                    row30: empLengthY,
                                    row31: empLengthM,
                                    row32: mortgageBalance,
                                    row33: homeValue
                                })
                            }
                        }
                    })
                    break;
                };
                default: {
                    console.log("Invalid File Type")
                }
            }
        }
        setFileData(data);
        setShowMapping(true);
        // const response = await _addBulkContacts({ contacts: validatedData });

        // setLoading(false);
        // if (response?.status === 201) {
        //     setHealthData({ validCount: validatedData.length, invalidCount: invalidData.length })
        //     setShowHealth(true);
        // } else {
        //     setHealthData({ validCount: validatedData.length, invalidCount: invalidData.length })
        //     setShowHealth(true);
        //     setError(response?.response.data['message']);
        // }
    }

    const onPressBack = () => {
        setHealthData({ validCount: 0, invalidCount: 0 });
        setShowHealth(false)
    }

    const onClickBackToMapping = () => {
        setFileData([]);
        setShowMapping(false);
    }
    
    const handleClickImport = async(formattedData) => {
        console.log("FORMATTED ", formattedData)
        const response = await _addBulkContacts({ contacts: formattedData });
        console.log("res ", response)
        setLoading(false);
        if (response?.status === 201) {
            setHealthData({ validCount: response.validatedData && response.validatedData, invalidCount: response.invalidData && response.invalidData})
            setShowMapping(false);
            setShowHealth(true);
        } else {
            setHealthData({ validCount: response.validatedData && response.validatedData, invalidCount: response.invalidData && response.invalidData })
            setShowMapping(false);
            setShowHealth(true);
            setError(response?.response.data['message']);
        }
    }

    return (
        <>
            {loading ? <CircularProgress /> : showMapping ? <ImportMapping data={fileData} onPressBack={onClickBackToMapping} onPressImport={handleClickImport} /> : 
            showHealth ? <ImportHealth data={healthData} onGoBack={onPressBack} /> : <Grid container spacing={2} m={2}>
                <Grid item xs={12} mt={2}>
                    <h1>Upload List</h1>
                </Grid>
                <Grid container xs={12} mt={5} direction="column" justifyContent='center' alignItems="center">
                    <DownloadIcon sx={{ color: "#1976d2", fontSize: 50, marginBottom: 4 }} />
                    <h3>Download Sample File</h3>
                    <p>Download a properly formed xlsx file for import</p>
                    <a href="/assets/contact_template.xlsx" download>
                        <Button variant="contained" sx={{ width: 150, marginTop: 2 }}>Download</Button>
                    </a>
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Box maxWidth={530} mx='auto'
                        sx={{
                            backgroundColor: '#FFF',
                            padding: '40px',
                            borderRadius: 4,
                            textAlign: 'right'
                        }}
                    >
                        <Stack spacing={2} sx={{ textAlign: 'left' }}>
                            <p><b>1. Name Your List</b></p>
                            <TextField placeholder="Text" size="small" />
                            <FileUploader
                                classes='nationwide-drag-drop'
                                label='Drag and Drop Or Click Here to Upload Your File'
                                handleChange={handleChange}
                                types={fileTypes}
                                multiple={false}
                            />
                        </Stack>
                        <Button onClick={() => onClickSubmit()} variant="contained" sx={{ marginTop: 2, minWidth: 150 }}>Next</Button>
                    </Box>
                </Grid>
            </Grid>}
        </>
    )
}

ImportContacts.layout = "AdminLayout"
export default ImportContacts;