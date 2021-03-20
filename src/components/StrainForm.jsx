import React, { Component } from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import AutocompleteC from "../components/AutocompleteC";
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
        locus_tag: true,
        attributes_x: true,
        chromosome_y: true,
        genomic_accession_y: true,
        start_y: true,
        end_y: true,
        strand_y: true,
        product_accession_y: true,
        nonredundant_refseq_y: true,
        name_y: true,
        symbol_y: true,
        geneid_y: true,
        product_length_y: true,
        protein_sequence: true,
        dna_sequence: true,
    });

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
        myAxios.get('http://127.0.0.1:8801/api/v1/download_genes',{params})
            .then((res) => {
                FileDownload(res.data, 'report.csv');
            }); // URL : https://path/to/api?foo=5&foo=2


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

                        <AutocompleteC multipleChoice={true} true parentCallback={getSelected} apiUrl="http://127.0.0.1:8801/api/v1/strains" labelText="Select single/multiple strain/s:" />

                        <div className="chkbxs">
                        <div>
                            <label for="all" className="lbl">All</label>
                            <input
                                id="all"
                                type="checkbox"
                                onChange={(event) => selectAll(event.target.checked)}
                                checked={checkedAll}
                            />
                        </div>

                            <label for="1" className="lbl">locus_tag</label>
                            <input id='1' type="checkbox" name="locus_tag" onChange={() => toggleCheck("locus_tag")} checked={checked["locus_tag"]}/>
                            <label for='2' className="lbl">attributes_x</label>
                            <input id='2' type="checkbox" name="attributes_x" onChange={() => toggleCheck("attributes_x")} checked={checked["attributes_x"]}/>
                            <label for='3' className="lbl">chromosome_y</label>
                            <input id='3' type="checkbox" name="chromosome_y" onChange={() => toggleCheck("chromosome_y")} checked={checked["chromosome_y"]}/>
                            <label htmlFor='4' className="lbl">genomic_accession_y</label>
                            <input id='4' type="checkbox" name="genomic_accession_y" onChange={() => toggleCheck("genomic_accession_y")} checked={checked["genomic_accession_y"]}/>
                            <label htmlFor='5' className="lbl">start_y</label>
                            <input id='5' type="checkbox" name="start_y" onChange={() => toggleCheck("start_y")} checked={checked["start_y"]}/>
                            <label htmlFor='6' className="lbl">end_y</label>
                            <input id='6' type="checkbox" name="end_y" onChange={() => toggleCheck("end_y")} checked={checked["end_y"]}/>
                            <label htmlFor='7' className="lbl">strand_y</label>
                            <input id='7' type="checkbox" name="strand_y" onChange={() => toggleCheck("strand_y")} checked={checked["strand_y"]}/>
                            <label htmlFor='8' className="lbl">product_accession_y</label>
                            <input id='8' type="checkbox" name="product_accession_y" onChange={() => toggleCheck("product_accession_y")} checked={checked["product_accession_y"]}/>
                            <label htmlFor='9' className="lbl">nonredundant_refseq_y</label>
                            <input id='9' type="checkbox" name="nonredundant_refseq_y" onChange={() => toggleCheck("nonredundant_refseq_y")} checked={checked["nonredundant_refseq_y"]}/>
                            <label htmlFor='10' className="lbl">name_y</label>
                            <input id='10' type="checkbox" name="name_y" onChange={() => toggleCheck("name_y")} checked={checked["name_y"]}/>
                            <label htmlFor='11' className="lbl">symbol_y</label>
                            <input id='11' type="checkbox" name="symbol_y" onChange={() => toggleCheck("symbol_y")} checked={checked["symbol_y"]}/>
                            <label htmlFor='12' className="lbl">geneid_y</label>
                            <input id='12' type="checkbox" name="geneid_y" onChange={() => toggleCheck("geneid_y")} checked={checked["geneid_y"]}/>
                            <label htmlFor='13' className="lbl"> product_length_y</label>
                            <input id='13' type="checkbox" name="product_length_y" onChange={() => toggleCheck("product_length_y")} checked={checked["product_length_y"]}/>
                            <label htmlFor='14' className="lbl"> protein_sequence</label>
                            <input id='14' type="checkbox" name="protein_sequence" onChange={() => toggleCheck("protein_sequence")} checked={checked["protein_sequence"]}/>
                            <label htmlFor='15' className="lbl"> dna_sequence</label>
                            <input id='15' type="checkbox" name="dna_sequence" onChange={() => toggleCheck("dna_sequence")} checked={checked["dna_sequence"]}/>
                        </div>

                        <div style={{textAlign: "center"}}>
                            <Button onClick={getData}>Download</Button>
                        </div>
                    </Form>
                </FadeIn>
            </div>
        )
    }