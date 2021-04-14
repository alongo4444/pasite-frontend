import React, { Component } from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import AutocompleteC from "../components/AutocompleteC";
import TextOrFileUpload from "./TextOrFileUpload";
import ErrorModalC from "./ErrorModalC";
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function StrainForm() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [checkedAll, setCheckedAll] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedA, setSelectedA] = React.useState(false);
    const [checked, setChecked] = React.useState({
        genomic_accession: true,
        start_g: true,
        end_g: true,
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
            const newState = { ...prevState };
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
            const newState = { ...prevState };
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
            if(checked[key] == true)
                selectedC.push(key)
        }

        let selectedAS=[];
        if(Array.isArray(selectedA)) {
            for (let key in selectedA) {
                selectedAS.push(selectedA[key]['key'])
            }
        }else{
            selectedAS.push(selectedA['key']);
        }

        if(selectedC.length == 0){
            setModalShow(true)
            return;
        }


        console.log(selectedAS)
        // console.log(selectedC)


        const FileDownload = require('js-file-download');

        const Qs = require('qs')

        let params = { selectedC: selectedC, selectedAS: selectedAS }

        let myAxios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })
            myAxios.get('http://127.0.0.1:8800/api/v1/genes/download_genes', {params})
                .then((res) => {
                    FileDownload(res.data, 'report.csv');
                }).catch(function (error) {childErr.current.handleOpen()});
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
                let selectedAS=[];
                let id = 0;
                for (let key in ts) {
                    selectedAS.push({'name':ts[key], 'id': id});
                    id++;
                    // selectedAS[key]['name'].push(ts[key]['name'])
                }


                setSelectedA(selectedAS)
                // this.setState({selectedFile: text.split(/\r?\n/)});
                e.target.value = null;
            };
            reader.readAsText(e.target.files[0])
        }
    };

    return (
            <div >
                <FadeIn>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label className="wrapper" column sm="4">
                                <p style={{textAlign: "right"}}></p>
                            </Form.Label>
                        </Form.Group>

                        <Form.Group as={Row} controlId="selectStrain">
                            <Form.Label className="wrapper" column sm="4">
                                <p style={{textAlign: "right"}}>{"Select single/multiple strain/s:"}</p>
                            </Form.Label>

                            <Col sm="4">
                                {/*<AutocompleteC multipleChoice={true} true parentCallback={getSelected} apiUrl="http://127.0.0.1:8800/api/v1/strains"/>*/}
                                <TextOrFileUpload apiUrl="http://127.0.0.1:8800/api/v1/strains" multipleChoice={true} parentFileChangeCallback={onFileChange} parentHandleTextBox={getSelected} label="Please upload a file that contains a list of strains
                            separated by new lines (/n)" />
                                <h6 className="note"><i>Note: Not selecting a strain will return <b>all the genes in the database.</b></i></h6>
                            </Col>
                        </Form.Group>


                        <div className="chkbxs">
                            Columns:
                        <div>
                            <br/>
                            <input
                                id="all"
                                type="checkbox"
                                onChange={(event) => selectAll(event.target.checked)}
                                checked={checkedAll}
                            />
                            <label for="all" className="lbl">All</label>
                        </div>

                            <input id='2' type="checkbox" name="genomic_accession"
                                   onChange={() => toggleCheck("genomic_accession")}
                                   checked={checked["genomic_accession"]}/>
                            <label htmlFor='2' className="lbl">genomic_accession</label>

                            <input id='3' type="checkbox" name="start_g" onChange={() => toggleCheck("start_g")}
                                   checked={checked["start_g"]}/>
                            <label htmlFor='3' className="lbl">start_g</label>

                            <input id='4' type="checkbox" name="end_g" onChange={() => toggleCheck("end_g")}
                                   checked={checked["end_g"]}/>
                            <label htmlFor='4' className="lbl">end_g</label>

                            <input id='5' type="checkbox" name="strand" onChange={() => toggleCheck("strand")}
                                   checked={checked["strand"]}/>
                            <label htmlFor='5' className="lbl">strand</label>

                            <input id='6' type="checkbox" name="attributes_x"
                                   onChange={() => toggleCheck("attributes_x")} checked={checked["attributes_x"]}/>
                            <label htmlFor='6' className="lbl">attributes_x</label>

                            <input id='7' type="checkbox" name="product_accession"
                                   onChange={() => toggleCheck("product_accession")}
                                   checked={checked["product_accession"]}/>
                            <label htmlFor='7' className="lbl">product_accession</label>

                            <input id='8' type="checkbox" name="nonredundant_refseq"
                                   onChange={() => toggleCheck("nonredundant_refseq")}
                                   checked={checked["nonredundant_refseq"]}/>
                            <label htmlFor='8' className="lbl">nonredundant_refseq</label>

                            <input id='9' type="checkbox" name="name" onChange={() => toggleCheck("name")}
                                   checked={checked["name"]}/>
                            <label htmlFor='9' className="lbl">name</label>

                        </div>
                        <br/>
                        <div style={{textAlign: "center"}}>
                            <Button onClick={getData}>Download</Button>
                        </div>
                    </Form>
                    {/*<Modal show={show} onHide={handleClose}>*/}
                    {/*    <Modal.Header closeButton>*/}
                    {/*        <Modal.Title>Modal heading</Modal.Title>*/}
                    {/*    </Modal.Header>*/}
                    {/*    <Modal.Body>There is a problem with the server request. Sorry for the inconvenience.</Modal.Body>*/}
                    {/*    <Modal.Footer>*/}
                    {/*        <Button variant="secondary" onClick={handleClose}>*/}
                    {/*            Close*/}
                    {/*        </Button>*/}
                    {/*    </Modal.Footer>*/}
                    {/*</Modal>*/}
                </FadeIn>
                <ErrorModalC open={false} ref={childErr}/>
            </div>
        )
    }