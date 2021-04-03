import React, { Component } from "react";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import AutocompleteC from "../components/AutocompleteC";
import TextOrFileUpload from "./TextOrFileUpload";

class ErrorModalC extends Component {
    state = {open: this.props.open};

    handleClose = () => {
        this.setState({ open: false});
    }

    handleOpen = () => {
        this.setState({ open: true});
    }

    render() {
        return (
            <div>
            <Modal show={this.state.open} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Server Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>There is a problem with the server request. Sorry for the inconvenience.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{this.setState({open:false})}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
} export default ErrorModalC;