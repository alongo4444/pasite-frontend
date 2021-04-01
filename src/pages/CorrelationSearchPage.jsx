import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Form, Row} from "react-bootstrap";
import searchlogo from "../assets/images/research.png";
import {Link} from "react-router-dom";
import AutocompleteC from "../components/AutocompleteC";

export default function CorrelationSearchPage() {
    //const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [selectedA, setSelectedA] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [buttonOn, setButtonOn] = React.useState(true)

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        return () => {
            active = false;
        };
    },[loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        if (getSelectedLength() === 2){
            setButtonOn(false)
        }
        else{
            setButtonOn(true)
        }
    }, [selectedA]);


    const getSelected = (selected) => {
        setSelectedA(selected)

    }


    const getSelectedLength = () => {
        return selectedA.length;
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

                    <Form.Group as={Row} controlId="selectDefSys">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}>Select two different defense systems</p>
                        </Form.Label>
                        <Col sm="4">
                            <AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={true} limit_length={2}
                                           parentCallback={getSelected} parentCallbackLegnth={getSelectedLength}></AutocompleteC>
                        </Col>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Link to={{
                            pathname: '/resultsCorrelationPage',
                            state: {
                                myArrayVariableName: selectedA, // send the selected items as a parameter to the result page
                                //rpp: rpp //send the number of results per page as a parameter to the result page
                            }
                        }}><Button disabled={buttonOn}>Search</Button></Link>
                    </div>
                </Form>
            </FadeIn>
        </div>


    );
}