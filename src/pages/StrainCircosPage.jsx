import React, {useState} from "react";
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import searchlogo from '../assets/images/research.png'
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in";
import {Link} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import {MultiSelect} from '@progress/kendo-react-dropdowns';
import {filterBy} from '@progress/kendo-data-query';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function StrainCircosPage() {
    const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('http://127.0.0.1:8800/api/v1/strains');
            await sleep(1e3); // For demo purposes.
            const strains = await response.json();
            if (active) {
                setOptions(strains.filter(x=> x.name != null))
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

    return (
        <div className="search-form">
            <FadeIn>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}></p>
                        </Form.Label>
                        <Col sm="4">
                            <div className="imgr_wr">
                                <img style={{display: "inline-block"}} className="imgr" src={searchlogo}/>
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="selectStrain">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}>Select a strain</p>
                        </Form.Label>

                        <Col sm="4">
                            <Autocomplete
                                id="asynchronous-demo"
                                multiple={false}
                                style={{ width: 800 }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                getOptionSelected={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                options={options}
                                loading={loading}
                                onInputChange={(event,newInputEvent) =>
                                {
                                    setStrainVariableName(newInputEvent);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a strain..."
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
                        <Link to={{
                            pathname: '/resultsCircosStrain',
                            state: {
                                strainVariableName: strainVariableName, // send the selected strain to the result display page
                            }
                        }}><Button>Display</Button></Link>
                    </div>
                </Form>
            </FadeIn>
        </div>
    );
}