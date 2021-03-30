import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Form, Row} from "react-bootstrap";
import searchlogo from "../assets/images/research.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import AutocompleteC from "../components/AutocompleteC";

export default function CorrelationSearchPage() {
    //const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [selectedA, setSelectedA] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [buttonOn, setButtonOn] = React.useState(true)

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        return () => {
            active = false;
        };
    },[loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const getSelected = (selected) => {
        setSelectedA(selected)
        console.log(selectedA.length)
        if (selectedA.length === 2){
            setButtonOn(false)
        }
        else{
            setButtonOn(true)
        }
    }

    const getSelectedLength = () => {
        return selectedA.length;
    }

    return (
        <div>
            <AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={true} limit_length={2}
                           parentCallback={getSelected} parentCallbackLegnth={getSelectedLength}></AutocompleteC>
            <div style={{textAlign: "center"}}>
                <Link to={{
                    pathname: '/resultsCorrelationPage',
                    state: {
                        //myArrayVariableName: selectedA, // send the selected items as a parameter to the result page
                        //rpp: rpp //send the number of results per page as a parameter to the result page
                    }
                }}><Button disabled={buttonOn}>Search</Button></Link>
            </div>
        </div>

    );
}