import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import axios from "axios";
import {Form, Col, Row, Button, Modal} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutocompleteC from "./AutocompleteC";

import GenesByClusterC from "./GenesByClusterC";
import {serialize} from "react-awesome-slider/src/helpers/components";
import StrainCircosResultsPage from "../pages/StrainCircosResultsPage";

class Cluster extends Component {
    state = {
        strains: [
            {
                name: "PAO1",
                id: "GCF_000006765.1"
            },
            {
                name: "PA14",
                id: "GCF_000014625.1"
            }
        ],
        num_cluster: ['1', '2', '3'],
        selected_strainA: false,
        selected_strainB: false,
        selected_strainC: false,
        selected_geneA: false,
        selected_geneB: false,
        selected_geneC: false,
        showing_one: false,
        showing_two: false,
        showing_three: false,
        downloadable: false

    }

    choice_strainA = (selected) => {
        if (selected != null) {
            this.setState({
                selected_strainA: selected
            })
        }
    }
    choice_strainB = (selected) => {
        if (selected != null) {
            this.setState({
                selected_strainB: selected
            })
        }
    }

    choice_strainC = (selected) => {
        if (selected != null) {
            this.setState({
                selected_strainC: selected
            })
        }
    }

    choice_geneA = (selected) => {
        if (selected != null) {
            this.setState({
                selected_geneA: selected.name
            })
        }
    }
    choice_geneB = (selected) => {
        if (selected != null) {
            this.setState({
                selected_geneB: selected.name
            })
        }
    }
    choice_geneC = (selected) => {
        if (selected != null) {
            this.setState({
                selected_geneC: selected.name
            })
        }
    }

    getTree(selectedFile, selectedStrains,mlst){
        const arr = []
        if (this.state.showing_one) {
            arr.push(this.state.selected_strainA.name + '-' + this.state.selected_geneA)
        }
        if (this.state.showing_two) {
            arr.push(this.state.selected_strainB.name + '-' + this.state.selected_geneB)
        }
        if (this.state.showing_three) {
            arr.push(this.state.selected_strainC.name + '-' + this.state.selected_geneC)
        }
        console.log(arr);
        const Qs = require('qs')
        this.setState({downloadable: true})
        return axios.get('http://127.0.0.1:8800/api/v1/cluster/cluster_tree', {
                params: {
                    list_strain_gene: arr,
                    subtree: selectedFile.length > 0 ? selectedFile : selectedStrains,
                    MLST: mlst
                },
                paramsSerializer: function (params) {
                    return Qs.stringify(params, {arrayFormat: 'repeat'})
                },
                responseType: 'arraybuffer',
            }
        )
    }

    show_lines = (value) => {
        if (value == '1') {
            this.setState({
                    showing_one: true,
                    showing_two: false,
                    showing_three: false,
                    selected_geneB: "",
                    selected_strainB: "",
                    selected_geneC: "",
                    selected_strainC: "",
                }
            )
        }
        if (value == '2') {
            this.setState({
                    showing_one: true,
                    showing_two: true,
                    showing_three: false,
                    selected_geneC: "",
                    selected_strainC: "",
                }
            )
        }
        if (value == '3') {
            this.setState({
                    showing_one: true,
                    showing_two: true,
                    showing_three: true,
                }
            )
        }
    }


    render() {

        const showDownloadOption = () => {
            if (this.state.downloadable == true) {
                return (
                    <GenesByClusterC
                        genes={[this.state.selected_geneA, this.state.selected_geneB, this.state.selected_geneC]}/>
                )
            } else {
                return (
                    <div></div>
                )
            }
        }

        return (
            <container>
                <div>
                    <Autocomplete
                        id="Choose_num"
                        options={this.state.num_cluster}
                        getOptionLabel={(option) => option}
                        //style={{width: 300}}
                        onChange={(event, value) => this.show_lines(value)}
                        renderInput={(params) => <TextField {...params} size="small" label="Choose num of gene"
                                                            variant="outlined"/>}
                    />
                    <div>
                        {this.state.showing_one
                            ? <div>
                                <FadeIn>
                                    <p style={{textAlign: "left"}}>select first strain and gene</p>
                                    <Autocomplete
                                        id="strains-combo-box"
                                        options={this.state.strains}
                                        getOptionLabel={(option) => option.name}
                                        //style={{width: 300}}
                                        onChange={(event, value) => this.choice_strainA(value)}
                                        renderInput={(params) => <TextField {...params} size="small"
                                                                            label="Choose Strain"
                                                                            variant="outlined"/>}
                                    />
                                    <br/>
                                    <AutocompleteC multipleChoice={false} true
                                                   parentCallback={this.choice_geneA}
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/get_gene_strain_id/" + this.state.selected_strainA.id}
                                                   labelText="Choose Gene"/>
                                </FadeIn>
                            </div>
                            : null
                        }
                    </div>
                    <div>
                        {this.state.showing_two
                            ? <div>
                                <FadeIn>
                                    <p style={{textAlign: "left"}}>select second strain and gene</p>
                                    <Autocomplete
                                        id="strains-combo-box"
                                        options={this.state.strains}
                                        getOptionLabel={(option) => option.name}
                                        //style={{width: 300}}
                                        onChange={(event, value) => this.choice_strainB(value)}
                                        renderInput={(params) => <TextField {...params} size="small"
                                                                            label="Choose Strain"
                                                                            variant="outlined"/>}
                                    />
                                    <br/>
                                    <AutocompleteC multipleChoice={false} true
                                                   parentCallback={this.choice_geneB}
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/get_gene_strain_id/" + this.state.selected_strainB.id}
                                                   labelText="Choose Gene"/>
                                </FadeIn>
                            </div>
                            : null
                        }
                    </div>
                    <div>
                        {this.state.showing_three
                            ? <div>
                                <FadeIn>
                                    <p style={{textAlign: "left"}}>select third strain and gene</p>
                                    <Autocomplete
                                        id="strains-combo-box"
                                        options={this.state.strains}
                                        getOptionLabel={(option) => option.name}
                                        //style={{width: 300}}
                                        onChange={(event, value) => this.choice_strainC(value)}
                                        renderInput={(params) => <TextField {...params} size="small"
                                                                            label="Choose Strain"
                                                                            variant="outlined"/>}
                                    />
                                    <br/>
                                    <AutocompleteC multipleChoice={false} true
                                                   parentCallback={this.choice_geneC}
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/get_gene_strain_id/" + this.state.selected_strainC.id}
                                                   labelText="Choose Gene"/>

                                </FadeIn>
                            </div>
                            : null
                        }
                    </div>
                    {showDownloadOption()}
                </div>
            </container>
        )
    }
}

export default Cluster;