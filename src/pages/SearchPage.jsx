import React, {useState} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import searchlogo from '../assets/images/research.png'
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in";
import {Link} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import {MultiSelect} from '@progress/kendo-react-dropdowns';
import {filterBy} from '@progress/kendo-data-query';
import axios from "axios";

const CULTURE_SHIPS = [
        {text: "Grapes 🍇", id: "grapes"},
        {text: "Mango 🥭", id: "mango"},
        {text: "Strawberry 🍓", id: "strawberry", disabled: true},
        {text: "Watermelon 🍉", id: "watermelon"},
        {text: "Pear 🍐", id: "pear"},
        {text: "Apple 🍎", id: "apple"},
        {text: "Tangerine 🍊", id: "tangerine"},
        {text: "Pineapple 🍍", id: "pineapple"},
        {text: "Peach 🍑", id: "peach"},
]

class SearchPage extends React.Component {


    state = {
        data: CULTURE_SHIPS.slice(),
        value: [],
        rowsPerPage: 10
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    filterChange = (event) => {
        this.setState({
            data: filterBy(CULTURE_SHIPS.slice(), event.filter)
        });
    }

    render() {
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
                                    data={this.state.data}
                                    onChange={this.handleChange}
                                    value={this.state.value}
                                    textField="text"
                                    dataItemKey="id"
                                    filterable={true}
                                    onFilterChange={this.filterChange}
                                />
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
                                <Form.Control onChange={e => this.setState({ rowsPerPage: e.target.value })} className="mb-1" as="select">
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
                                state: {myArrayVariableName: this.state.value, rpp: this.state.rowsPerPage} // send the selected items as a parameter to the result page
                            }}><Button>Search</Button></Link>
                        </div>
                    </Form>
                </FadeIn>
            </div>
        );
    }
}

//
// const SearchPage: React.FC = () => {
//     const options = [
//         {label: "Grapes 🍇", value: "grapes"},
//         {label: "Mango 🥭", value: "mango"},
//         {label: "Strawberry 🍓", value: "strawberry", disabled: true},
//         {label: "Watermelon 🍉", value: "watermelon"},
//         {label: "Pear 🍐", value: "pear"},
//         {label: "Apple 🍎", value: "apple"},
//         {label: "Tangerine 🍊", value: "tangerine"},
//         {label: "Pineapple 🍍", value: "pineapple"},
//         {label: "Peach 🍑", value: "peach"},
//     ];
//
//     const [selected, setSelected] = useState([]);
// };

export default SearchPage;