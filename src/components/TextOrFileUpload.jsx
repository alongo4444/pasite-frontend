import React from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row} from "react-bootstrap";
import FadeIn from "react-fade-in";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import AutocompleteC from "./AutocompleteC";
import Switch from "react-switch";
import Button from "react-bootstrap/Button";


//apiUrl - For the autocomplete: the url of the requested HTML call to the backend (i.e: http://127.0.0.1:8801/api/v1/strains). The backend need to return list of dictionaries in the format: [{name: "a", key: "0"},...]
//multipleChoice - For the autocomplete: determines the multiselect option, 'true' means multiselect enabled, 'false' otherwise.
//parentHandleTextBox - For the autocomplete: the callback that will be called in the parent which holds this component when the user chooses an option from the autocomplete component.
//parentFileChangeCallback -  the callback that will be called in the parent which holds this component when the user chooses a file. The file should contain the options with \n separating between them.
//label - the description of the component for the user

export default function TextOrFileUpload({ apiUrl, parentFileChangeCallback, parentHandleTextBox,updateTextbox=null, multipleChoice, label, limit_length=0, parentCallbackLegnth=null}) {

    const [textbox, setTextbox] = React.useState(true);
    const [textOrFile, setTextOrFile] = React.useState('Text Box' );


    const renderTextBox = () => {
        if (textbox == true) {
            return <AutocompleteC  multipleChoice={true} apiUrl={apiUrl}
                                   parentCallback={(selected) => parentHandleTextBox(selected)} multipleChoice={multipleChoice} parentCallbackLegnth={parentCallbackLegnth} limit_length={limit_length}/>
        } else {
            return <Form.Group>
                <Form.File onChange={(e) => parentFileChangeCallback(e)} id="exampleFormControlFile1"
                           label={label}/>
            </Form.Group>;
        }
    }

 /*
update the state of the file upload/strain selection on change
 */
    const setSwitchTextBox = () => {
        if (textbox == true) {
            // this.setState({textbox: false}
            setTextbox(false)
            // this.setState({textOrFile: 'File Upload'});
            setTextOrFile('File Upload')

        } else {
            // this.setState({textbox: true});
            setTextbox(true)
            // this.setState({textOrFile: 'Text Box'});
            setTextOrFile('Text Box')
        }
    }

    React.useEffect(() =>{
        if (updateTextbox !=null) {
            updateTextbox(textbox)
        }
    },[textbox])

    return (
        <div className="search-form">
            <div className="textBox">
                <div className='rowC'>
                    <Switch onChange={setSwitchTextBox} checked={textbox}/> <span
                    className="switch">{textOrFile}</span>
                </div>
                <Form>
                    {renderTextBox()}
                </Form>
            </div>
        </div>
    );
}

