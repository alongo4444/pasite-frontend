import React from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row} from "react-bootstrap";
import FadeIn from "react-fade-in";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


//apiUrl - the url of the requested HTML call to the backend (i.e: http://127.0.0.1:8801/api/v1/strains).
//parentCallback - the callback that will be called in the parent which holds this component. The parent will receive the current selected objects for each change on this component.  See DownloadPage for example or ask Alon.
//multipleChoice - determines the multiselect option, 'true' means multiselect enabled, 'false' otherwise.
//labelText - The text which will appear in the label of the component (i.e: "Select single/multiple strain/s:").
export default function AutocompleteCluster({apiUrl, parentCallback, multipleChoice, labelText}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }


        (async () => {
            const response = await fetch(apiUrl);
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();
            if (active) {
                setOptions(countries.filter(x => x != null))
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
                    <Form.Label className="wrapper">
                        <p style={{textAlign: "right"}}>{labelText}</p>
                    </Form.Label>
                    <Autocomplete
                        id="asynchronous-demo"
                        multiple={multipleChoice}
                        style={{width: 300}}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        // onChange={(event, value) => setSelectedA(value)}
                        onChange={(event, value) => parentCallback(value)}
                        getOptionSelected={(option, value) => option === value}
                        getOptionLabel={(option) => option}
                        options={options}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose gene..."
                                variant="outlined"
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
                </Form.Group>
        </div>
    );
}

