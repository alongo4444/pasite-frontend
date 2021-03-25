import React, {useState} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import searchlogo from '../assets/images/research.png'
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in";
import {Link} from 'react-router-dom';
import AutocompleteC from "../components/AutocompleteC";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function SearchPage() {
    const [rpp, setRpp] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [selectedA, setSelectedA] = React.useState(false);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('http://127.0.0.1:8801/api/v1/strains');
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();
            if (active) {
                setOptions(countries.filter(x=> x.name != null))
            }

        })();

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
                            <p style={{textAlign: "right"}}>Select single/multiple strain/s:</p>
                        </Form.Label>

                        <Col sm="4">
                            <AutocompleteC multipleChoice={true} true parentCallback={getSelected} apiUrl="http://127.0.0.1:8800/api/v1/strains" labelText="Select single/multiple strain/s:"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="displaySettings">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}></p>
                        </Form.Label>

                        <>
                            {['top'].map((placement) => (
                                <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                            Tooltip on <strong>{placement}</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p style={{fontSize: "11px"}}><FontAwesomeIcon icon={faQuestion}/></p>
                                </OverlayTrigger>
                            ))}
                        </>


                        <Col xs="5">
                            <Form.Check
                                label="Display the distribution across the tree"
                            />
                        </Col>


                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}></p>
                        </Form.Label>

                        <>
                            {['top'].map((placement) => (
                                <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                            Tooltip on <strong>{placement}</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p style={{fontSize: "11px"}}><FontAwesomeIcon icon={faQuestion}/></p>
                                </OverlayTrigger>
                            ))}
                        </>
                        <Col xs="5">
                            <Form.Check
                                label="Display the distribution of the system on the genome"
                            />
                        </Col>

                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}></p>
                        </Form.Label>

                        <>
                            {['top'].map((placement) => (
                                <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                            Tooltip on <strong>{placement}</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p style={{fontSize: "11px"}}><FontAwesomeIcon icon={faQuestion}/></p>
                                </OverlayTrigger>
                            ))}
                        </>
                        <Col xs="5">
                        <span>
                        <Form.Check
                            label="Display a ranked list of the clusters that correlate based on their presence/absence"
                        />
                        </span>
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
                        }}><Button>Search</Button></Link>
                    </div>
                </Form>
            </FadeIn>
        </div>
    );
}

