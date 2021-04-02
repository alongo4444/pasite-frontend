import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import searchlogo from "../../assets/images/research.png"
import {Link} from "react-router-dom";
import AutocompleteC from "../AutocompleteC"
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// calculates the correlation between one defense system to an ISO Type
export default function DefVSIsoType({parentCallback2}) {
    //const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [selectedDF, setSelectedDF] = React.useState([]);
    const [selectedIso, setSelectedIso] = React.useState([]);
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
        let arr = selectedDF.concat(selectedIso);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedDF]);

    React.useEffect(() => {
        // let arr = selectedDF.concat(selectedIso);
        // setSelected(arr)
        console.log(selectedIso)
        let arr = selectedIso.concat(selectedDF);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedIso]);


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

    const getSelectedISO = (selectedA) => {
        if (selectedA) {
            setSelectedIso([selectedA]);
        } else {
            setSelectedIso([]);
        }
    }

    const getSelected = () => {
        return selected.length;
    }

    const getSelectedLengthIso = () => {
        return selectedIso.length;
    }

    return (
        <div className="search-form">
            <FadeIn>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}></p>
                        </Form.Label>
                        <Col sm="4">
                            <div className="imgr_wr">
                                <img style={{display: "inline-block"}} className="imgr" src={searchlogo}/>
                            </div>
                        </Col>
                    </Form.Group>

                    {/*<Form.Group as={Row} controlId="selectDefSys">*/}
                    {/*    <Form.Label className="wrapper" column sm="4">*/}
                    {/*        <p style={{textAlign: "right"}}>Select two different defense systems</p>*/}
                    {/*    </Form.Label>*/}
                    {/*    <Row>*/}
                    {/*        <Col sm="2">*/}
                    {/*            <AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={false}*/}
                    {/*                           parentCallback={getSelected}></AutocompleteC>*/}
                    {/*        </Col>*/}
                    {/*        &*/}
                    {/*        <Col sm="2">*/}
                    {/*            <AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={false}*/}
                    {/*                           parentCallback={getSelected}></AutocompleteC>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*        <Col sm="2">*/}
                    {/*            <p style={{textAlign: "right"}}>Select two different defense systems</p>*/}
                    {/*        </Col>*/}
                    {/*        <Col sm="2">*/}
                    {/*            <p style={{textAlign: "right"}}>Select two different defense systems</p>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</Form.Group>*/}

                    <Form.Group as={Row} controlId="selectDefSys">
                        <Container>
                            <Row>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select a defense system</p>
                                </Col>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select an isolation type</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={false}
                                                    parentCallback={getSelectedDF}></AutocompleteC></Col><FontAwesomeIcon
                                icon={faPlusCircle}/>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/isolation/'
                                                    multipleChoice={false}
                                                    parentCallback={getSelectedISO}></AutocompleteC></Col>
                            </Row>
                        </Container>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button onClick={() => parentCallback2(selectedDF, selectedIso)}
                                disabled={buttonOff}>Search</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>


    );
}