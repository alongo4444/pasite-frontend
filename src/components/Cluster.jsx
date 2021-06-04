import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutocompleteC from "./AutocompleteC";
import ErrorModalC from "../components/ErrorModalC";

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
        downloadable: false,
        ackey: true,

    }
    constructor() {
        super();
        this.childErr = React.createRef();
        this.childAC1 = React.createRef();
        this.childAC2 = React.createRef();
        this.childAC3 = React.createRef();
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

    getTree(){
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
        this.setState({downloadable: true})
        return [...arr]
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

    clearInput(){
        if(this.childAC1.current) {
            this.childAC1.current.clearInput()
        }
        if(this.childAC2.current) {
            this.childAC2.current.clearInput()
        }
        if(this.childAC3.current) {
            this.childAC3.current.clearInput()
        }
        this.setState({ackey: !this.state.ackey}) // changing the key value resets the input value
        this.setState({selected_strainA: false})
        this.setState({selected_strainB: false})
        this.setState({selected_strainC: false})
        this.setState({selected_geneA: false})
        this.setState({selected_geneB: false})
        this.setState({selected_geneC: false})
        this.setState({showing_one: false})
        this.setState({showing_two: false})
        this.setState({showing_three: false})
    }

    render() {

        return (
            <container>
                <div>
                    <Autocomplete
                        key={this.state.ackey}
                        id="Choose_num"
                        options={this.state.num_cluster}
                        getOptionLabel={(option) => option}
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
                                        key={this.state.ackey}
                                        id="strains-combo-box"
                                        options={this.state.strains}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) => this.choice_strainA(value)}
                                        renderInput={(params) => <TextField {...params} size="small"
                                                                            label="Choose Strain"
                                                                            variant="outlined"/>}
                                    />
                                    <br/>
                                    <AutocompleteC multipleChoice={false} true
                                                   parentCallback={this.choice_geneA}
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/getGeneStrainId/" + this.state.selected_strainA.id}
                                                   labelText="Choose Gene"
                                                   ref = {this.childAC1}
                                                   disableCloseOnSelect = {false}
                                    />
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
                                        key={this.state.ackey}
                                        id="strains-combo-box"
                                        options={this.state.strains}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) => this.choice_strainB(value)}
                                        renderInput={(params) => <TextField {...params} size="small"
                                                                            label="Choose Strain"
                                                                            variant="outlined"/>}
                                    />
                                    <br/>
                                    <AutocompleteC multipleChoice={false} true
                                                   parentCallback={this.choice_geneB}
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/getGeneStrainId/" + this.state.selected_strainB.id}
                                                   labelText="Choose Gene"
                                                   ref = {this.childAC2}
                                                   disableCloseOnSelect = {false}
                                    />
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
                                        key={this.state.ackey}
                                        id="strains-combo-box"
                                        options={this.state.strains}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) => this.choice_strainC(value)}
                                        renderInput={(params) => <TextField {...params} size="small"
                                                                            label="Choose Strain"
                                                                            variant="outlined"/>}
                                    />
                                    <br/>
                                    <AutocompleteC multipleChoice={false} true
                                                   parentCallback={this.choice_geneC}
                                                   apiUrl={"http://127.0.0.1:8800/api/v1/cluster/getGeneStrainId/" + this.state.selected_strainC.id}
                                                   labelText="Choose Gene"
                                                   ref = {this.childAC3}
                                                   disableCloseOnSelect = {false}
                                    />

                                </FadeIn>
                            </div>
                            : null
                        }
                    </div>
                </div>
                <ErrorModalC open={false} ref={this.childErr}/>
            </container>
        )
    }
}

export default Cluster;