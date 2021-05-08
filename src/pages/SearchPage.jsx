import React, {useState} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import searchlogo from '../assets/images/research.png'
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in";
import {Link} from 'react-router-dom';
import AutocompleteC from "../components/AutocompleteC";

export default function SearchPage() {
    const [rpp, setRpp] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [selectedA, setSelectedA] = React.useState(false);
    const [buttonOff, setButtonOff] = React.useState(true)

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        if (getSelectedLength() > 0){
            setButtonOff(false)
        }
        else{
            setButtonOff(true)
        }
    }, [selectedA]);

    const getSelectedLength = () => {
        return selectedA.length;
    }

    const getSelected = (selected) => {
        setSelectedA(selected)
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

                    <Form.Group as={Row} controlId="selectStrain">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}>{"Select single/multiple strain/s:"}</p>
                        </Form.Label>

                        <Col sm="4">
                            <AutocompleteC multipleChoice={true} true parentCallback={getSelected} apiUrl="http://127.0.0.1:8800/api/v1/strains"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="numResults">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}>Number of results in page:</p>
                        </Form.Label>
                        <Col xs="auto">
                            <Form.Control className="mb-1" as="select" value={rpp}
                                          onChange={e => setRpp(e.target.value)}>
                                <option>10</option>
                                <option>25</option>
                                <option>30</option>
                                <option>50</option>
                                <option>1000</option>
                            </Form.Control>
                        </Col>

                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Link to={{
                            pathname: '/results',
                            state: {
                                myArrayVariableName: selectedA, // send the selected items as a parameter to the result page
                                rpp: rpp //send the number of results per page as a parameter to the result page
                            }
                        }}><Button disabled={buttonOff}>Search</Button></Link>
                    </div>
                </Form>
            </FadeIn>
        </div>
    );
}

