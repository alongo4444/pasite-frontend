import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import searchlogo from "../../assets/images/research.png"
import {Link} from "react-router-dom";
import AutocompleteC from "../AutocompleteC"
import {faPlusCircle, faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {BsShieldShaded} from "react-icons/bs";
import {GiDrippingTube} from "react-icons/gi";
import './Correlations.css'
import {SiMicrogenetics} from "react-icons/si";

// calculates the correlation between one cluster to an ISO Type
export default function ClusterVSIsoType({parentCallback2}) {
    //const [strainVariableName, setStrainVariableName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [selectedIso, setSelectedIso] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [buttonOff, setButtonOff] = React.useState(true);
    const [selected_strain, setSelected_strain] = React.useState([]);
    const [selected_gene, setSelected_gene] = React.useState([]);
    const [strains, setStrains] = React.useState([
        {
            name: "PAO1",
            id: "GCF_000006765.1"
        },
        {
            name: "PA14",
            id: "GCF_000014625.1"
        }
    ])

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        // let arr = selectedDF.concat(selectedIso);
        // setSelected(arr)
        console.log(selectedIso)
        let arr = selectedIso.concat(selected_gene);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedIso]);

    React.useEffect(() => {
        // let arr = selectedDF.concat(selectedIso);
        // setSelected(arr)
        console.log(selected_gene)
        let arr = selected_gene.concat(selectedIso);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selected_gene]);


    const getSelectedIso = (selectedA) => {
        if (selectedA) {
            setSelectedIso([selectedA]);
        } else {
            setSelectedIso([]);
        }
    }

    const getSelectedGene = (selectedA) => {
        if (selectedA) {
            setSelected_gene([selectedA]);
        } else {
            setSelected_gene([]);
        }
    }


    const choice_strain = (selected) => {
        if (selected != null)
            setSelected_strain(selected)
    }

    return (
        <div className="search-form">

            <FadeIn>

                <div className="title_s">
                    <h1>Cluster vs Isolation Type</h1>
                </div>
                <Form>

                    <Form.Group as={Row} controlId="selectDefSys">
                        <Container>
                            <Row >
                                <Col className="col_s">
                                    <ListItemIcon><SiMicrogenetics/></ListItemIcon>
                                </Col>
                                <Col className="col_s">
                                    <ListItemIcon><GiDrippingTube/></ListItemIcon>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select a strain and a gene</p>
                                </Col>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select an isolation type</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Autocomplete
                                        id="strains-combo-box"
                                        options={strains}
                                        getOptionLabel={(option) => option.name}
                                        //style={{width: 300}}
                                        onChange={(event, value) => choice_strain(value)}
                                        renderInput={(params) => <TextField {...params} size="small"
                                                                            label="Choose Strain"
                                                                            variant="outlined"/>}
                                    />
                                    <div style={{textAlign: 'center', paddingTop: '7px', paddingBottom: '7px'}}>
                                        <FontAwesomeIcon
                                            icon={faAngleDoubleDown}/>
                                    </div>
                                    <AutocompleteC multipleChoice={false}
                                                   parentCallback={getSelectedGene}
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/get_gene_strain_id/" + selected_strain.id}
                                                   labelText="Choose Gene"
                                                   disabled={selected_strain == ""}
                                    />

                                </Col><FontAwesomeIcon
                                icon={faPlusCircle}/>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/isolation/' multipleChoice={false}
                                                    parentCallback={getSelectedIso} labelText="Select an Isolation Type"></AutocompleteC></Col>
                            </Row>
                        </Container>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button id="clviSearch" onClick={() => parentCallback2(selectedIso, selected_strain, selected_gene)}
                                disabled={buttonOff}>Search</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>
    );
}