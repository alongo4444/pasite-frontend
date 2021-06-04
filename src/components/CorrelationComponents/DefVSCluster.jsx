import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AutocompleteC from "../AutocompleteC"
import {faPlusCircle, faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import '../../styles/Correlations.css'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {BsShieldShaded} from "react-icons/bs";
import {SiMicrogenetics} from "react-icons/si";

/**
 * calculates the correlation between one defense system to a cluster Type
 */
export default function DefVSCluster({parentCallback2}) {
    const [open, setOpen] = React.useState(false);
    const [selectedDF, setSelectedDF] = React.useState([]);
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
        console.log(selectedDF)
        let arr = selectedDF.concat(selected_gene);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedDF]);

    React.useEffect(() => {
        console.log(selected_gene)
        let arr = selected_gene.concat(selectedDF);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selected_gene]);


    const getSelectedDF = (selectedA) => {
        if (selectedA) {
            setSelectedDF([selectedA]);
        } else {
            setSelectedDF([]);
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
                    <h1>Defense System vs Cluster</h1>
                </div>

                <Form>
                    <Form.Group as={Row} controlId="selectDefSys">
                        <Container>

                            <Row >
                                <Col className="col_s">
                                    <ListItemIcon><BsShieldShaded/></ListItemIcon>
                                </Col>
                                <Col className="col_s">
                                    <ListItemIcon><SiMicrogenetics/></ListItemIcon>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select a defense system</p>
                                </Col>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select a strain and a gene</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={false}
                                                    parentCallback={getSelectedDF}></AutocompleteC></Col><FontAwesomeIcon
                                icon={faPlusCircle}/>
                                <Col>
                                    <Autocomplete
                                        id="strains-combo-box"
                                        labelText="Choose a Defense System"
                                        options={strains}
                                        getOptionLabel={(option) => option.name}
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
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/getGeneStrainId/" + selected_strain.id}
                                                   labelText="Choose Gene"
                                                   disabled={selected_strain == ""}
                                    />

                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button id="dvclSearch" onClick={() => parentCallback2(selectedDF, selected_strain, selected_gene)}
                                disabled={buttonOff}>Search</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>


    );
}