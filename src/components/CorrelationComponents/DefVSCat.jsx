import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import searchlogo from "../../assets/images/research.png"
import {Link} from "react-router-dom";
import AutocompleteC from "../AutocompleteC"
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Correlations.css'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {BsShieldShaded} from "react-icons/bs";
import {SiHubspot, SiMicrogenetics} from "react-icons/si";

// calculates the correlation between one defense system to an ISO Type
export default function DefVSCat({parentCallback2}) {
    //const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [selectedDF, setSelectedDF] = React.useState([]);
    const [selectedCls, setSelectedCls] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [buttonOff, setButtonOff] = React.useState(true)

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        // let arr = selectedDF.concat(selectedIso);
        // setSelected(arr)
        console.log(selectedDF)
        let arr = selectedDF.concat(selectedCls);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedDF]);

    React.useEffect(() => {
        // let arr = selectedDF.concat(selectedIso);
        // setSelected(arr)
        console.log(selectedCls)
        let arr = selectedCls.concat(selectedDF);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedCls]);


    React.useEffect(() => {
        if (getSelected() === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selected]);


    const getSelectedDF = (selectedA) => {
        if (selectedA) {
            setSelectedDF([selectedA]);
        } else {
            setSelectedDF([]);
        }
    }

    const getSelectedCls = (selectedA) => {
        if (selectedA) {
            setSelectedCls([selectedA]);
        } else {
            setSelectedCls([]);
        }
    }

    const getSelected = () => {
        return selected.length;
    }

    const getSelectedLengthIso = () => {
        return selectedCls.length;
    }

    return (
        <div className="search-form">

            <FadeIn>
                <div className="title_s">
                    <h1>Defense System vs Attribute</h1>
                </div>
                <Form>

                    <Form.Group as={Row} controlId="selectDefSys">
                        <Container>

                            <Row >
                                <Col className="col_s">
                                    <ListItemIcon><BsShieldShaded/></ListItemIcon>
                                </Col>
                                <Col className="col_s">
                                    <ListItemIcon><SiHubspot/></ListItemIcon>
                                </Col>
                            </Row>


                            <Row>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select a defense system</p>
                                </Col>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select an attribute</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={false}
                                                    parentCallback={getSelectedDF} labelText="Choose a Defense System"></AutocompleteC></Col><FontAwesomeIcon
                                icon={faPlusCircle}/>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/isolation/attributes/'
                                                    multipleChoice={false}
                                                    parentCallback={getSelectedCls} labelText="Select an attribute"></AutocompleteC></Col>
                            </Row>
                        </Container>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button id="dvcSearch" onClick={() => parentCallback2(selectedDF, selectedCls)}
                                disabled={buttonOff}>Search</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>


    );
}