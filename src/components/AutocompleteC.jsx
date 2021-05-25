import React from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row} from "react-bootstrap";
import ErrorModalC from "./ErrorModalC";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';


/**
 * the component of the searching module
 * apiUrl - the url of the requested HTML call to the backend (i.e: http://127.0.0.1:8800/api/v1/strains). The backend need to return list of dictionaries in the format: [{name: "a", key: "0"},...]
 * parentCallback - the callback that will be called in the parent which holds this component. The parent will receive the current selected objects for each change on this component.  See DownloadPage for example or ask Alon.
 * multipleChoice - determines the multiselect option, 'true' means multiselect enabled, 'false' otherwise.
 * labelText - The text which will appear in the label of the component (i.e: "Select single/multiple strain/s:").
 * disabled - Disables the autocomplete
 */
export default function AutocompleteC({
                                          apiUrl,
                                          parentCallback,
                                          multipleChoice,
                                          limit_length = 0,
                                          parentCallbackLegnth = null,
                                          labelText ="",
                                          disabled=false
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

                const countries = await response.json();
                if (active) {
                    setOptions(countries.filter(x => x.name != null))
                }
            } catch (e) {
                if(childErr.current) {
                    childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.");
                }
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
                        disableCloseOnSelect = {true}
                        disabled={disabled}
                        id="asynchronous-demo"
                        multiple={multipleChoice}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        onChange={(event, value) => parentCallback(value)}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={options}
                        getOptionDisabled={(() => {
                            if (parentCallbackLegnth) {
                                return parentCallbackLegnth() >= limit_length
                            }
                            return false
                        })
                        }
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
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
            <ErrorModalC open={false} ref={childErr}/>
        </div>
    );
}

