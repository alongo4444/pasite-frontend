import React from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Modal, Button} from "react-bootstrap";
import FadeIn from "react-fade-in";
import ErrorModalC from "./ErrorModalC";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


//apiUrl - the url of the requested HTML call to the backend (i.e: http://127.0.0.1:8800/api/v1/strains). The backend need to return list of dictionaries in the format: [{name: "a", key: "0"},...]
//parentCallback - the callback that will be called in the parent which holds this component. The parent will receive the current selected objects for each change on this component.  See DownloadPage for example or ask Alon.
//multipleChoice - determines the multiselect option, 'true' means multiselect enabled, 'false' otherwise.
//labelText - The text which will appear in the label of the component (i.e: "Select single/multiple strain/s:").
export default function AutocompleteC({
                                          apiUrl,
                                          parentCallback,
                                          multipleChoice,
                                          limit_length = 0,
                                          parentCallbackLegnth = null,
                                          labelText =""
                                      }) {
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
            try {
                const response = await fetch(apiUrl);

                await sleep(1e3); // For demo purposes.
                const countries = await response.json();
                if (active) {
                    setOptions(countries.filter(x => x.name != null))
                }
            } catch (e) {
                childErr.current.handleOpen();
            }

        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


    return (
        <div className="search-form">
            <Form.Group as={Row} controlId="selectStrain">
                <Col>
                    <Autocomplete
                        id="asynchronous-demo"
                        multiple={multipleChoice}
                        // style={{ width: "100%" }}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        // onChange={(event, value) => setSelectedA(value)}
                        onChange={(event, value) => parentCallback(value)}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={options}
                        getOptionDisabled={(() => {
                            if (parentCallbackLegnth) {
                                if (parentCallbackLegnth() >= limit_length) {
                                    return true
                                }
                            }
                            return false
                            // parentCallbackLegnth() > 3 && false ? true : false
                        })
                        }
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                // label="Choose strains..."
                                label = {labelText}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Col>
            </Form.Group>
            {/*<Modal show={show} onHide={handleClose}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Modal heading</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>There is a problem with the server request. Sorry for the inconvenience.</Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={handleClose}>*/}
            {/*            Close*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
            <ErrorModalC open={false} ref={childErr}/>
        </div>
    );
}

