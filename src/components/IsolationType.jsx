import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutocompleteCluster from "./AutocompleteCluster";
import GenesByClusterC from "./GenesByClusterC";
import {serialize} from "react-awesome-slider/src/helpers/components";
import StrainCircosResultsPage from "../pages/StrainCircosResultsPage";
import { Multiselect } from "multiselect-react-dropdown";

export default function IsolationType() {
        return (
            <Multiselect
                options={}
                displayValue="key"
                showCheckbox={true}
            />
        )
}
