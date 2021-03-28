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
    const [selectedA, setSelectedA] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

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
    }

    const getSelectedLength = () => {
        return selectedA.length;
    }

    return (
        <div>
            <AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={true} limit_length={2}
                           parentCallback={getSelected} parentCallbackLegnth={getSelectedLength}></AutocompleteC>
        </div>
    );
}