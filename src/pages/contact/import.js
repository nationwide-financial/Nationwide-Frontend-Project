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
    const [listData,setListData] = useState([]);
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
                                const firstName =  typeof row[1] === 'object' ? row[1]?.text : row[1];
                                const lastName = typeof row[2] === 'object' ? row[2]?.text : row[2];
                                const middleInitial = typeof row[3] === 'object' ? row[3]?.text : row[3];
                                const otherName = typeof row[4] === 'object' ? row[4]?.text : row[4];
                                const emailAddress = typeof row[5] === 'object' ? row[5]?.text : row[5];
                                const homePhoneNumber = typeof row[6] === 'object' ? row[6]?.text : row[6];
                                const mobilePhoneNumber = typeof row[7] === 'object' ? row[7]?.text : row[7];
                                const work = typeof row[8] === 'object' ? row[8]?.text : row[8];
                                const fax = typeof row[9] === 'object' ? row[9]?.text : row[9];
                                const address1 = typeof row[10] === 'object' ? row[10]?.text : row[10];
                                const address2 = typeof row[11] === 'object' ? row[11]?.text : row[11];
                                const cityOrState = typeof row[12] === 'object' ? row[12]?.text : row[12];
                                const Zip = typeof row[13] === 'object' ? row[13]?.text : row[13];
                                const primaryLanguage = typeof row[14] === 'object' ? row[14]?.text : row[14];
                                const maritalStatus = typeof row[15] === 'object' ? row[15]?.text : row[15];
                                const doYouRentOrOwn = typeof row[16] === 'object' ? row[16]?.text : row[16];
                                const timeZone = typeof row[17] === 'object' ? row[17]?.text : row[17];
                                const creditScore = typeof row[18] === 'object' ? row[18]?.text : row[18];
                                const date = typeof row[19] === 'object' ? row[19]?.text : row[19];
                                const dob = typeof row[20] === 'object' ? row[20]?.text : row[20];
                                const ssn = typeof row[21] === 'object' ? row[21]?.text : row[21];
                                const dl = typeof row[22] === 'object' ? row[22]?.text : row[22];
                                const state = typeof row[23] === 'object' ? row[23]?.text : row[23];
                                const employer = typeof row[24] === 'object' ? row[24]?.text : row[24];
                                const occ = typeof row[25] === 'object' ? row[25]?.text : row[25];
                                const employmentStatus = typeof row[26] === 'object' ? row[26]?.text : row[26];
                                const empLengthY = typeof row[27] === 'object' ? row[27]?.text : row[27];
                                const empLengthM = typeof row[28] === 'object' ? row[28]?.text : row[28];
                                const mortgagePayment = typeof row[29] === 'object' ? row[29]?.text : row[29];
                                const mortgageBalance = typeof row[30] === 'object' ? row[30]?.text : row[30];
                                const homeValue = typeof row[31] === 'object' ? row[31]?.text : row[31];
                                const bestTimeToCall = typeof row[32] === 'object' ? row[32]?.text : row[32];
                                const creditReportType = typeof row[33] === 'object' ? row[33]?.text : row[33];
                                const state_ = typeof row[34] === 'object' ? row[34]?.text : row[34];



                                data.push({
                                    row1: firstName,
                                    row2: lastName,
                                    row3: middleInitial,
                                    row4: otherName,
                                    row5: emailAddress,
                                    row6: homePhoneNumber,
                                    row7: mobilePhoneNumber,
                                    row8: work,
                                    row9: fax,
                                    row10: address1,
                                    row11: address2,
                                    row12: cityOrState,
                                    row13: Zip,
                                    row14: primaryLanguage,
                                    row15: maritalStatus,
                                    row16: doYouRentOrOwn,
                                    row17: timeZone,
                                    row18: creditScore,
                                    row19: date,
                                    row20: dob,
                                    row21: ssn,
                                    row22: dl,
                                    row23: state,
                                    row24: employer,
                                    row25: occ,
                                    row26: employmentStatus,
                                    row27: empLengthY,
                                    row28: empLengthM,
                                    row29: mortgagePayment,
                                    row30: mortgageBalance,
                                    row31: homeValue,
                                    row32: bestTimeToCall,
                                    row33: creditReportType,
                                    row34: state_
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

    console.log("DAta ", fileData)
    return (
        <>
            {loading ? <CircularProgress /> : showMapping ? <ImportMapping setListData={setListData} data={fileData} onPressBack={onClickBackToMapping} onPressImport={handleClickImport} /> : 
            showHealth ? <ImportHealth listData={listData} data={healthData} onGoBack={onPressBack} /> : <Grid container spacing={2} m={2}>
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