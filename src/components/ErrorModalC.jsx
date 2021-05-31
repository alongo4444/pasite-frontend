import React, { Component } from "react";
import '../styles/StrainForm.css';
import { Button, Modal} from "react-bootstrap";


/**
 * the component of an error in the system
 */
class ErrorModalC extends Component {
    state = {
        open: this.props.open,
        msg: this.props.msg

    };

    handleClose = () => {
        this.setState({ open: false});
    }

    handleOpen = (msg) => {
        this.setState({msg: msg})
        this.setState({ open: true});
    }

    render() {
        return (
            <div>
            <Modal show={this.state.open} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.msg}</Modal.Body>
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