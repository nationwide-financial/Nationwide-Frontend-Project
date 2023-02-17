import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { _gatLoanType } from "../../services/loanTypeService";
import { s3URL } from '../../utils/config'
import { useRouter } from "next/router";

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const LoanApplicationTypePopup = ({ popupOpen, handleClose, userId }) => {
    const router = useRouter();
    const [loanTypeData, setLoanTypeData] = useState([]);
    const [product, setProduct] = useState();
    const [coContact, setCoContact] = useState(false);

    useEffect(() => {
        getLoanType();
    }, []);

    const getLoanType = async () => {
        try {
            const res = await _gatLoanType();
            setLoanTypeData(res?.data?.data?.Items)
        } catch (err) {
            console.log(err)
        }
    };

    const handelSelectProduct = (id) => {
        setProduct(id)
    }

    const handleContinue = () => {
        if (!coContact) {
            router.push(`/application/application-form-data?product=${product}&contact=${userId}`);
        } else {
            router.push(`/contact/add/${product}/coEnabled/${userId}`);
        }
    }

    return (
        <Dialog open={popupOpen} onClose={() => handleClose()} fullWidth m={4}>
            <Box sx={{ maxWidth: "100%" }} p={2}>
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={() => handleClose()}
                >
                    <Typography
                        variant="h6"
                        style={{ fontWeight: 700, fontSize: 30 }}
                    >
                        New Application
                    </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                    <FormControl
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <label>
                            {" "}
                            <Typography
                                variant="h6"
                                style={{
                                    fontSize: 17,
                                    fontWeight: 700,
                                    fontStyle: "normal",
                                    marginBottom: 10,
                                }}
                            >
                                Selected Product
                            </Typography>
                        </label>

                        {loanTypeData?.map((row, key) => (
                            <div key={key}>
                                <Box
                                    sx={{ maxWidth: "100%" }}
                                    className="hover_effect"
                                >
                                    <Stack spacing={2} direction="row">
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            borderColor="#393939"
                                            style={{
                                                backgroundColor:
                                                    row.PK == product ? "#1478F1" : "",
                                                color:
                                                    row.PK == product ? "#FFFFFF" : "#393939",
                                            }}
                                            onMouseOver={() => {
                                                backgroundColor: "#1478F1";
                                                color: "#FFFFFF";
                                            }}
                                            onClick={() => {
                                                handelSelectProduct(row.PK);
                                            }}
                                        >
                                            <Grid
                                                container
                                                display={"flex"}
                                                fontWeight={700}
                                            >
                                                <Grid
                                                    xs={6}
                                                    align="left"
                                                    // color={"#393939"}
                                                    textTransform="capitalize"
                                                >
                                                    <Typography
                                                        //  className="page_sub_content_header"
                                                        style={{
                                                            fontSize: 20,
                                                            fontWeight: 700,
                                                            textTransform: "capitalize",
                                                        }}
                                                        p={1}
                                                    >
                                                        {row.loanName}
                                                    </Typography>
                                                </Grid>{" "}
                                                <Grid xs={6} align="right" color={"#393939"}>
                                                    {row.img != null && (
                                                        <img
                                                            src={`${s3URL}/${row.img}`}
                                                            height="40"
                                                            width="40"
                                                        />
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Button>
                                    </Stack>
                                </Box>
                                <br />
                            </div>
                        ))}
                        <label>
                            {" "}
                            <Typography variant="h6" className="check_box_label">
                                Application Form Options
                            </Typography>
                        </label>
                        <Box sx={{ maxWidth: "100%" }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) => {
                                                setCoContact(e.target.checked);
                                            }}
                                        />
                                    }
                                    className="check_box_label_subtext"
                                    label="Include Co-Borrower Page"
                                />
                            </FormGroup>
                        </Box>
                    </FormControl>
                </DialogContent>
                <div style={{ marginBottom: 100, marginLeft: 16 }}>
                    <DialogActions
                        style={{ display: "flex", justifyContent: "left" }}
                        mt={2}
                    >
                        <Button
                            variant="contained"
                            onClick={handleContinue}
                            textTransform="capitalize"
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </div>
            </Box>
        </Dialog>
    )
}

export default LoanApplicationTypePopup;