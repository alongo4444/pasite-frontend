import React, {useState} from "react";
import MultiSelect from "react-multi-select-component";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import searchlogo from '../assets/images/research.png'
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in";
import Nav from "react-bootstrap/Nav";
import {Link} from 'react-router-dom'

const SearchPage: React.FC = () => {
    const options = [
        {label: "Grapes 🍇", value: "grapes"},
        {label: "Mango 🥭", value: "mango"},
        {label: "Strawberry 🍓", value: "strawberry", disabled: true},
        {label: "Watermelon 🍉", value: "watermelon"},
        {label: "Pear 🍐", value: "pear"},
        {label: "Apple 🍎", value: "apple"},
        {label: "Tangerine 🍊", value: "tangerine"},
        {label: "Pineapple 🍍", value: "pineapple"},
        {label: "Peach 🍑", value: "peach"},
    ];

    const [selected, setSelected] = useState([]);

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
                                <img className="imgr" src={searchlogo}/>
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="selectStrain">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}>Select single/multiple strain/s:</p>
                        </Form.Label>

                        <Col sm="4">
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy={"Select"}
                            />
                            {/*This will hold the items that were selected in the MultiSelect component. Format: {label: "", value: ""}*/}
                            <pre>{JSON.stringify(selected)}</pre>
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
                            <Form.Control className="mb-1" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>

                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Link to={{
                            pathname: '/results',
                            state: { myArrayVariableName: selected} // send the selected items as a parameter to the result page
                        }}><Button>Search</Button></Link>
                    </div>
                </Form>
            </FadeIn>
        </div>
    );
};

export default SearchPage;