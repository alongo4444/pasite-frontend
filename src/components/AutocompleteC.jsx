import React, {Component} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row} from "react-bootstrap";
import ErrorModalC from "./ErrorModalC";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import BrowsePage from "../pages/BrowsePage";
import Switch from "react-switch";


/**
 * the component of the searching module
 * apiUrl - the url of the requested HTML call to the backend (i.e: http://127.0.0.1:8800/api/v1/strains). The backend need to return list of dictionaries in the format: [{name: "a", key: "0"},...]
 * parentCallback - the callback that will be called in the parent which holds this component. The parent will receive the current selected objects for each change on this component.  See DownloadPage for example or ask Alon.
 * multipleChoice - determines the multiselect option, 'true' means multiselect enabled, 'false' otherwise.
 * labelText - The text which will appear in the label of the component (i.e: "Select single/multiple strain/s:").
 * disabled - Disables the autocomplete
 */
// export default function AutocompleteC({
//                                           apiUrl,
//                                           parentCallback,
//                                           multipleChoice,
//                                           limit_length = 0,
//                                           parentCallbackLegnth = null,
//                                           labelText ="",
//                                           disabled=false
//                                       }) {
//     const [open, setOpen] = React.useState(false);
//     const [options, setOptions] = React.useState([]);
//     const loading = open && options.length === 0;
//
//     const childErr = React.createRef();
//
//     React.useEffect(() => {
//         let active = true;
//         if (!loading) {
//             return undefined;
//         }
//
//
//         (async () => {
//             try {
//                 const response = await fetch(apiUrl);
//
//                 const countries = await response.json();
//                 if (active) {
//                     setOptions(countries.filter(x => x.name != null))
//                 }
//             } catch (e) {
//                 if(childErr.current) {
//                     childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.");
//                 }
//             }
//
//         })();
//
//         return () => {
//             active = false;
//         };
//     }, [loading]);
//
//     React.useEffect(() => {
//         if (!open) {
//             setOptions([]);
//         }
//     }, [open]);
//
//     const clearInput = () => {
//         const elem = document.getElementsByClassName(
//             "MuiAutocomplete-clearIndicator"
//         )[0];
//         if (typeof elem.onclick == "function") {
//             elem.onclick.apply(elem);
//         }
//     }
//
//     return (
//         <div className="search-form">
//             <Form.Group as={Row} controlId="selectStrain">
//                 <Col>
//                     <Autocomplete
//                         disableCloseOnSelect = {true}
//                         disabled={disabled}
//                         id="asynchronous-demo"
//                         multiple={multipleChoice}
//                         open={open}
//                         onOpen={() => {
//                             setOpen(true);
//                         }}
//                         onClose={() => {
//                             setOpen(false);
//                         }}
//                         onChange={(event, value) => parentCallback(value)}
//                         getOptionSelected={(option, value) => option.name === value.name}
//                         getOptionLabel={(option) => option.name}
//                         options={options}
//                         getOptionDisabled={(() => {
//                             if (parentCallbackLegnth) {
//                                 return parentCallbackLegnth() >= limit_length
//                             }
//                             return false
//                         })
//                         }
//                         loading={loading}
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 label = {labelText}
//                                 variant="outlined"
//                                 size="small"
//                                 InputProps={{
//                                     ...params.InputProps,
//                                     endAdornment: (
//                                         <React.Fragment>
//                                             {loading ? <CircularProgress color="inherit" size={20}/> : null}
//                                             {params.InputProps.endAdornment}
//                                         </React.Fragment>
//                                     ),
//                                 }}
//                             />
//                         )}
//                     />
//                 </Col>
//             </Form.Group>
//             <ErrorModalC open={false} ref={childErr}/>
//         </div>
//     );
// }

class AutocompleteC extends Component{


    //     const [open, setOpen] = React.useState(false);
//     const [options, setOptions] = React.useState([]);
//     const loading = open && options.length === 0;
//
//     const childErr = React.createRef();

    constructor(props) {
        super(props)
        this.childErr = React.createRef()
        this.state = {
            open: false,
            options: [],
            loading: false,
            acKey: true
        }
        // this.loading = ;

    }

    componentDidUpdate(prevProps, prevState, snapshot: SS) {
        let isLoaded = this.state.open && this.state.options.length === 0;
        let active = true;
        if (!isLoaded) {
            return undefined;
        }
        // this.setState({loading: true})


        (async () => {
            try {

                const response = await fetch(this.props.apiUrl);

                const countries = await response.json();
                if (active) {
                    // setOptions(countries.filter(x => x.name != null))
                    this.setState({options: countries.filter(x => x.name != null)})
                    this.setState({loading: false})

                }

            } catch (e) {
                if(this.childErr.current) {
                    this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.");
                }
            }
            active = false;
        })();

        return () => {
            active = false;
        };
    }

    clearInput = () => {
            this.setState({acKey: !this.state.acKey}) // changing the key value resets the input value
    }

    render() {


        return(
        <div className="search-form">
            <Form.Group as={Row} controlId="selectStrain">
                <Col>
                    <Autocomplete
                        key={this.state.acKey}
                        disableCloseOnSelect = {this.props.disableCloseOnSelect}
                        disabled={this.props.disabled}
                        id="asynchronous-demo"
                        multiple={this.props.multipleChoice}
                        open={this.state.open}
                        noOptionsText={'Loading...'}
                        onOpen={() => {
                            // setOpen(true);
                            this.setState({open: true})
                        }}
                        onClose={() => {
                            this.setState({open: false})
                            this.setState({loading: false})
                            this.setState({options: []})
                        }}
                        onChange={(event, value) => this.props.parentCallback(value)}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={this.state.options}
                        getOptionDisabled={(() => {
                            if (this.props.parentCallbackLegnth) {
                                return this.props.parentCallbackLegnth() >= this.props.limit_length
                            }
                            return false
                        })
                        }
                        loading={this.state.loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label = {this.props.labelText}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {this.state.loading ? <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Col>
            </Form.Group>
            <ErrorModalC open={false} ref={this.childErr}/>
        </div>
        );
    }
}
export default AutocompleteC;
