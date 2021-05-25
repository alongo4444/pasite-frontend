import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal, Container} from "react-bootstrap";
import TextOrFileUpload from "../components/TextOrFileUpload";
import ErrorModalC from "./ErrorModalC";

/**
 * the component of getting genes by the defense systems
 */
export default function GenesByDefenseForm() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [checkedAll, setCheckedAll] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedA, setSelectedA] = React.useState(false);
    const [checked, setChecked] = React.useState({
        // locus_tag: true,
        genomic_accession: true,
        start: true,
        end: true,
        strand: true,
        attributes_x: true,
        product_accession: true,
        nonredundant_refseq: true,
        name: true
    });
    const childErr = React.createRef();

    /* ################################################ */
    /* #### TOGGLES checK STATE BASED ON inputName #### */
    /* ################################################ */

    const toggleCheck = (inputName) => {
        setChecked((prevState) => {
            const newState = {...prevState};
            newState[inputName] = !prevState[inputName];
            return newState;
        });
    };

    /* ###################################################### */
    /* #### CHECKS OR UNCHECKS ALL FROM SELECT ALL CLICK #### */
    /* ###################################################### */

    const selectAll = (value) => {
        setCheckedAll(value);
        setChecked((prevState) => {
            const newState = {...prevState};
            for (const inputName in newState) {
                newState[inputName] = value;
            }
            return newState;
        });
    };

    /* ############################################# */
    /* #### EFFECT TO CONTROL CHECKED_ALL STATE #### */
    /* ############################################# */

    // IF YOU CHECK BOTH INDIVIDUALLY. IT WILL ACTIVATE THE checkedAll STATE
    // IF YOU UNCHECK ANY INDIVIDUALLY. IT WILL DE-ACTIVATE THE checkAll STATE

    React.useEffect(() => {
        let allChecked = true;
        for (const inputName in checked) {
            if (checked[inputName] === false) {
                allChecked = false;
            }
        }
        if (allChecked) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [checked]);

    /* ########################## */
    /* #### RETURN STATEMENT #### */

    /* ########################## */


    function getData() {

        let selectedC = [];

        for (let key in checked) {
            // check if the property/key is defined in the object itself, not in parent
            if (checked[key] == true)
                selectedC.push(key)
        }

        let selectedAS = [];
        if (Array.isArray(selectedA) && selectedA.length > 0) {
            for (let key in selectedA) {
                selectedAS.push(selectedA[key]['name'])
            }
        } else {
            selectedAS.push(selectedA['name']);
        }

        if (selectedC.length == 0) {
            setModalShow(true)
            return;
        }


        console.log(selectedAS)
        // console.log(selectedC)


        const FileDownload = require('js-file-download');

        const Qs = require('qs')

        let params = {selectedC: selectedC, selectedAS: selectedAS}

        let myAxios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })

        myAxios.get('http://127.0.0.1:8800/api/v1/genes/genes_by_defense', {params})
            .then((res) => {
                FileDownload(res.data, 'genes_by_defense.csv');
            }).catch(function (error) {
            if (error['response']) {
                if (error['response']['status'] == 400) {
                    childErr.current.handleOpen("One or more of the parameters is invalid.")
                    return
                }
            }
            childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.")
        });

    }


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Missing Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Select a field</h4>
                    <p>
                        Please select at least one of the fields from the list.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Ok</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const getSelected = (selected) => {
        setSelectedA(selected)
    }


    /*
handle file upload and load each line to array of
 integers (aka strain indexes for subtree) for subtree generating
 using selectedFile state.
 */
    const onFileChange = (e) => {

        // Update the state
        if (e.target.files.length > 0) {
            e.preventDefault()
            const reader = new FileReader()
            console.log(e)
            reader.onload = async (e) => {
                const text = (e.target.result);
                let ts = text.split(/\r?\n/);
                let selectedAS = [];
                let id = 0;
                for (let key in ts) {
                    selectedAS.push({'name': ts[key], 'id': id});
                    id++;
                }


                setSelectedA(selectedAS)
                e.target.value = null;
            };
            reader.readAsText(e.target.files[0])
        }
    };

    return (
        <div>
            <FadeIn>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Form>
                <br/>
                <Form.Group as={Row} controlId="selectStrain">
                    <Form.Label style={{display: "flex", alignItems:"center", justifyContent:"flex"}} className="wrapper" column sm="4">
                        <p style={{textAlign: "right"}}>{"Select single/multiple defense system/s:"}</p>
                    </Form.Label>

                    <Col style={{textAlign:"center"}} sm="4">
                        <TextOrFileUpload apiUrl="http://127.0.0.1:8800/api/v1/defense/"
                                          multipleChoice={true} parentFileChangeCallback={onFileChange}
                                          parentHandleTextBox={getSelected} label="Please upload a file that contains a list of defense systems separated by new lines (/n)"
                        /><h6 className="note"><i>Note: Not selecting a defense system will return <b>all the genes in the database.</b></i></h6>
                    </Col>
                </Form.Group>



                <div className="chkbxs">
                    <Container>
                    <Row>
                        <Col>
                    <div>
                        <br/>
                        <input
                            id="all2"
                            type="checkbox"
                            onChange={(event) => selectAll(event.target.checked)}
                            checked={checkedAll}
                        />
                        <label for="all2" className="lbl">All</label>
                    </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                    <input id='22' type="checkbox" name="genomic_accession"
                           onChange={() => toggleCheck("genomic_accession")} checked={checked["genomic_accession"]}/>
                    <label for='22' className="lbl">genomic_accession</label>
                        </Col>
                        <Col sm>
                    <input id='32' type="checkbox" name="start" onChange={() => toggleCheck("start")}
                           checked={checked["start"]}/>
                    <label for='32' className="lbl">start</label>
                        </Col>
                        <Col sm>
                    <input id='42' type="checkbox" name="end" onChange={() => toggleCheck("end")}
                           checked={checked["end"]}/>
                    <label htmlFor='42' className="lbl">end</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                    <input id='52' type="checkbox" name="strand" onChange={() => toggleCheck("strand")}
                           checked={checked["strand"]}/>
                    <label htmlFor='52' className="lbl">strand</label>
                        </Col>
                        <Col sm>
                    <input id='62' type="checkbox" name="attributes_x" onChange={() => toggleCheck("attributes_x")}
                           checked={checked["attributes_x"]}/>
                    <label htmlFor='62' className="lbl">attributes_x</label>
                        </Col>
                        <Col sm>
                    <input id='72' type="checkbox" name="product_accession"
                           onChange={() => toggleCheck("product_accession")} checked={checked["product_accession"]}/>
                    <label htmlFor='72' className="lbl">product_accession</label>
                        </Col>
                    </Row>
                        <Row>
                            <Col sm>
                    <input id='82' type="checkbox" name="nonredundant_refseq"
                           onChange={() => toggleCheck("nonredundant_refseq")}
                           checked={checked["nonredundant_refseq"]}/>
                    <label htmlFor='82' className="lbl">nonredundant_refseq</label>
                            </Col>
                            <Col sm>
                    <input id='92' type="checkbox" name="name" onChange={() => toggleCheck("name")}
                           checked={checked["name"]}/>
                    <label htmlFor='92' className="lbl">name</label>
                            </Col>
                            <Col sm></Col>
                        </Row>
                    </Container>
                </div>
                <br/>
                <div style={{textAlign: "center"}}>
                    <Button onClick={getData}>Download</Button>
                </div>
            </Form>
            <ErrorModalC open={false} ref={childErr}/>
            </FadeIn>
        </div>
    )
}