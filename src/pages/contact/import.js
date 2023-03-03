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
                                const email = typeof row[3] === 'object' ? row[3]?.text : row[3];
                                const phone = typeof row[4] === 'object' ? row[4]?.result : row[4];
                                const idNumber = row[5];
                                const dob = row[6];
                                const streetAddress = row[7];
                                const city = row[8];
                                const state = row[9];
                                const postalCode = row[10];
                                const country = row[11];
                                const companyName = row[12];
                                const jobTitle = row[13];

                                data.push({
                                    row1: firstName,
                                    row2: lastName,
                                    row3: email,
                                    row4: phone,
                                    row5: idNumber,
                                    row6: dob,
                                    row7: streetAddress,
                                    row8: city,
                                    row9: state,
                                    row10: postalCode,
                                    row11: country,
                                    row12: companyName,
                                    row13: jobTitle
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