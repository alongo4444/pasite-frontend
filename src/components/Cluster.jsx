import React, { Component } from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function SearchPage() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedA, setSelectedA] = React.useState(false);


    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('http://127.0.0.1:8801/api/v1/strains');
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();
            if (active) {
                setOptions(countries.filter(x=> x.name != null))
            }

        })();

        return () => {
            active = false;
        };
    },[loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    async function get_strains_cluster() {
        console.log(selectedA)
    }




    return (
        <div >
            <FadeIn>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}></p>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} controlId="selectStrain">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}>Select single/multiple strain/s:</p>
                        </Form.Label>

                        <Col sm="4">
                            <Autocomplete
                                id="asynchronous-demo"
                                multiple={true}
                                style={{ width: 800 }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                onChange={(event, value) => setSelectedA(value)}
                                getOptionSelected={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                options={options}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose strains..."
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Col>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button onClick={get_strains_cluster}>Download</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>
    )
}