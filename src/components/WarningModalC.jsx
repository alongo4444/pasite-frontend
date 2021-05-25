import React, {Component} from "react";
import '../styles/StrainForm.css';
import {Button, Modal} from "react-bootstrap";


class WarningModalC extends Component {
    state = {
        open: this.props.open,
        badSystems: this.props.badSystems,
        badStrains: this.props.badStrains
    };

    handleClose = () => {
        this.setState({open: false});
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    render() {
        return (
            <div>
                <Modal show={this.state.open} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Parameters Alert</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Some of the Parameters you chose were invalid.
                        {this.props.badSystems.length>0 &&
                        (<div>
                            <br/>
                            the following defense systems were omitted from your query:
                            <br/>
                            {this.props.badSystems}
                        </div>)}
                        {this.props.badStrains.length>0 &&
                        (<div>
                            <br/>
                            the following strains were omitted from your query:
                            <br/>
                            {this.props.badStrains}
                        </div>)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            this.setState({open: false})
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default WarningModalC;