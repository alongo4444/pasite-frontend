import React, {useState} from "react";
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import searchlogo from '../assets/images/research.png'
import FadeIn from "react-fade-in";
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorModalC from "../components/ErrorModalC";


/**
 * The Strain Circos search page
 */
export default function StrainCircosPage() {
    const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const childErr = React.createRef();

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }



        (async () => {
            const response = await fetch('http://127.0.0.1:8800/api/v1/strains');
            const strains = await response.json();
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (strains && strains.message) || response.status;
                return Promise.reject(error);
            }
            if (active) {
                setOptions(strains.filter(x=> x.name != null))
            }

        })().catch((err) => {
            console.log(err);
            if (childErr.current) {
                childErr.current.handleOpen();
                }});

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
                            <Autocomplete className="textBox"
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
            <ErrorModalC open={false} ref={childErr}/>
        </div>
    );
}