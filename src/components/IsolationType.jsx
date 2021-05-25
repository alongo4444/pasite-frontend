import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GenesByClusterC from "./GenesByClusterC";
import {serialize} from "react-awesome-slider/src/helpers/components";
import StrainCircosResultsPage from "../pages/StrainCircosResultsPage";
import DropdownCheckbox from "./DropdownCheckbox";

/**
 * the component of the isolation types
 */
class IsolationType extends Component {

    constructor(props) {
        super(props);
        this.ddc = React.createRef();
    };

    render() {
        return (
            <div>
                <FadeIn>
                    <DropdownCheckbox ref={this.ddc} options={["Clinical", "Environment"]}/>
                </FadeIn>
            </div>
        )
    }
}
export default IsolationType;