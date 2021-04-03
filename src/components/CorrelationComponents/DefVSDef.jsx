import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Form, Row} from "react-bootstrap";
import searchlogo from "../../assets/images/research.png"
import {Link} from "react-router-dom";
import AutocompleteC from "../AutocompleteC"

// calculates the correlation between one defense system to another
export default function DefVSDef({parentCallback2}) {
    //const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [selectedA, setSelectedA] = React.useState([]);
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
    },[loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        if (getSelectedLength() === 2){
            setButtonOff(false)
        }
        else{
            setButtonOff(true)
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
                                           parentCallback={getSelected} parentCallbackLegnth={getSelectedLength} labelText="Choose Defense Systems" ></AutocompleteC>
                        </Col>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button onClick={() => parentCallback2(selectedA)} disabled={buttonOff}>Search</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>


    );
}