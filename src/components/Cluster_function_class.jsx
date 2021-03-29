import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutocompleteCluster from "./AutocompleteCluster";
import {serialize} from "react-awesome-slider/src/helpers/components";

export default function Cluster_function_class() {
    const strains = [
        {
            name: "PAO1",
            id: "GCF_000006765.1"
        },
        {
            name: "PA14",
            id: "GCF_000014625.1"
        }
    ];
    //const strains = {'PAO1', 'PA14'};
    const num_cluster = ['1', '2', '3'];
    const [modalShow, setModalShow] = React.useState(false);
    const [selected_strainA, setSelected_strainA] = React.useState(false);
    const [selected_geneA, setSelected_geneA] = React.useState(false);
    const [selected_strainB, setSelected_strainB] = React.useState(false);
    const [selected_geneB, setSelected_geneB] = React.useState(false);
    const [selected_strainC, setSelected_strainC] = React.useState(false);
    const [selected_geneC, setSelected_geneC] = React.useState(false);
    const [showing_one, setShowing_one] = React.useState(false);
    const [showing_two, setShowing_two] = React.useState(false);
    const [showing_three, setShowing_three] = React.useState(false);

    const choice_strainA = (selected) => {
        setSelected_strainA(selected)
    }
    const choice_strainB = (selected) => {
        setSelected_strainB(selected)
    }
    const choice_strainC = (selected) => {
        setSelected_strainC(selected)
    }

    const choice_geneA = (selected) => {
        setSelected_geneA(selected)
    }
    const choice_geneB = (selected) => {
        setSelected_geneB(selected)
    }
    const choice_geneC = (selected) => {
        setSelected_geneC(selected)
    }

    function getTree() {
        const arr = []
        if (showing_one) {
            arr.push(selected_strainA.name + '-' + selected_geneA)
        }
        if (showing_two) {
            arr.push(selected_strainB.name + '-' + selected_geneB)
        }
        if (showing_three) {
            arr.push(selected_strainC.name + '-' + selected_geneC)
        }
        console.log(arr);
        let params = {list_strain_gene: arr}
        const Qs = require('qs')
        let myAxios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })
        console.log(myAxios)
        console.log(params)
        return myAxios.get('http://127.0.0.1:8800/api/v1/cluster/cluster_tree', {params})
    }

    const show_lines = (value) => {
        if (value == '1') {
            setShowing_one(true)
            setShowing_two(false)
            setShowing_three(false)
            setSelected_geneB("")
            setSelected_strainB("")
            setSelected_geneC("")
            setSelected_strainC("")
        }
        if (value == '2') {
            setShowing_one(true)
            setShowing_two(true)
            setShowing_three(false)
        }
        if (value == '3') {
            setShowing_one(true)
            setShowing_two(true)
            setShowing_three(true)
        }
    }

    return (
        <container>
            <div>
                <Autocomplete
                    id="Choose_num"
                    options={num_cluster}
                    getOptionLabel={(option) => option}
                    style={{width: 300}}
                    onChange={(event, value) => show_lines(value)}
                    renderInput={(params) => <TextField {...params} label="Choose num of gene" variant="outlined"/>}
                />
                <div>
                    {showing_one
                        ? <div>
                            <FadeIn>
                                <p style={{textAlign: "left"}}>select first strain and gene</p>
                                <Autocomplete
                                    id="strains-combo-box"
                                    options={strains}
                                    getOptionLabel={(option) => option.name}
                                    style={{width: 300}}
                                    onChange={(event, value) => choice_strainA(value)}
                                    renderInput={(params) => <TextField {...params} label="Choose Strain"
                                                                        variant="outlined"/>}
                                />
                                <Col sm="4">
                                    <AutocompleteCluster multipleChoice={false} true parentCallback={choice_geneA}
                                                         apiUrl={"http://127.0.0.1:8800/api/v1/cluster/get_gene_strain_id/" + selected_strainA.id}
                                                         labelText=""/>
                                </Col>
                            </FadeIn>
                        </div>
                        : null
                    }
                </div>
                <div>
                    {showing_two
                        ? <div>
                            <FadeIn>
                                <p style={{textAlign: "left"}}>select second strain and gene</p>
                                <Autocomplete
                                    id="strains-combo-box"
                                    options={strains}
                                    getOptionLabel={(option) => option.name}
                                    style={{width: 300}}
                                    onChange={(event, value) => choice_strainB(value)}
                                    renderInput={(params) => <TextField {...params} label="Choose Strain"
                                                                        variant="outlined"/>}
                                />
                                <Col sm="4">
                                    <AutocompleteCluster multipleChoice={false} true parentCallback={choice_geneB}
                                                         apiUrl={"http://127.0.0.1:8800/api/v1/cluster/get_gene_strain_id/" + selected_strainB.id}
                                                         labelText=""/>
                                </Col>
                            </FadeIn>
                        </div>
                        : null
                    }
                </div>
                <div>
                    {showing_three
                        ? <div>
                            <FadeIn>
                                <p style={{textAlign: "left"}}>select third strain and gene</p>
                                <Autocomplete
                                    id="strains-combo-box"
                                    options={strains}
                                    getOptionLabel={(option) => option.name}
                                    style={{width: 300}}
                                    onChange={(event, value) => choice_strainC(value)}
                                    renderInput={(params) => <TextField {...params} label="Choose Strain"
                                                                        variant="outlined"/>}
                                />
                                <Col sm="4">
                                    <AutocompleteCluster multipleChoice={false} true parentCallback={choice_geneC}
                                                         apiUrl={"http://127.0.0.1:8800/api/v1/cluster/get_gene_strain_id/" + selected_strainC.id}
                                                         labelText=""/>
                                </Col>
                            </FadeIn>
                        </div>
                        : null
                    }
                </div>
            </div>
            {/*
            <div style={{textAlign: "center"}}>
                <Button onClick={getTree}>Generate Tree</Button>
            </div>
             */}
        </container>
    )
}