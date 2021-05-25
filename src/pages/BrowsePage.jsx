import React, {Component, useEffect, useRef, useState} from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import IconButton from '@material-ui/core/IconButton';
import {ArrowsFullscreen, ZoomIn, ZoomOut} from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner'
import '../styles/BrowsePage.css';
import chroma from 'chroma-js';
// import {colourOptions} from '../utilities/colors';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import '../assets/fonts/YesevaOne-Regular.ttf';
import MiniDrawer from "../components/Drawer";
import Cluster from "../components/Cluster";
import IsolationType from "../components/IsolationType";
import GenesByClusterC from "../components/GenesByClusterC";
import TextOrFileUpload from "../components/TextOrFileUpload";
import ErrorModalC from "../components/ErrorModalC";
import Divider from '@material-ui/core/Divider';


var qs = require('qs');
/**
 * the Browse Page - phylogenetic trees
 */
class BrowsePage extends Component {
    constructor(props) {
        super(props);
        this.cluster = React.createRef();
        this.isltype = React.createRef();
        this.childErr = React.createRef();
        this.state = {
            source: [],
            loaded: false,
            textbox: true,
            textOrFile: 'Text Box',
            selectedOption: [],
            selectedFile: {},
            selectedStrains: [],
            isOpen: false,
            generateType: "defense",
            checkmlst: false,
            loadedCluster: false,
            colourOptions:{}
        }
    };

    /*
    load empty phylogenetic tree as default tree
     */
    componentDidMount() {
        Promise.all([axios
            .get(
                "http://127.0.0.1:8800/api/v1/strains/phyloTree",
                {responseType: 'arraybuffer'},
            ),axios
            .get(
                "http://127.0.0.1:8800/api/v1/strains/defSystemsColors"
            )]).then(([response,colors])=>{
            const base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );
            this.setState({source: "data:;base64," + base64});
            this.setState({loaded: true});
            this.setState({colourOptions: colors.data});
        }).catch((err) => {
            this.setState({loaded: true})
            console.log(err);
            if (this.childErr.current) {
                this.childErr.current.handleOpen();
            }});
    }

    /*
    compute a new tree when the user click the button "generate tree"
    similar to the orginial function, this time - with query params.
     */
    computeTree = () => {
        this.setState({source: []});
        this.setState({loaded: false});
        this.setState({loadedCluster: false})
        let systems = []
        if (this.state.generateType == "cluster") {
            return this.cluster.current.getTree(this.state.selectedFile, this.state.selectedStrains, this.state.checkmlst).then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({source: "data:;base64," + base64});
                this.setState({loaded: true})
                // this.setState({selectedFile: {}})
                // this.setState({selectedOption: []})
                this.setState({loadedCluster: true})
            }).catch((err) => {
                    this.setState({loaded: true})
                    console.log(err);
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen();
                    }
                }
            );
        }
        if (this.state.generateType == "distinct systems") {
            let url = "http://127.0.0.1:8800/api/v1/defense/distinct_count";
            return axios
                .get(url, {
                        params: {
                            subtree: this.state.textbox == false ? this.state.selectedFile : this.state.selectedStrains,
                            MLST: this.state.checkmlst
                        },
                        paramsSerializer: function (params) {
                            return qs.stringify(params, {arrayFormat: 'repeat'})
                        },
                        responseType: 'arraybuffer',
                    }
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    this.setState({source: "data:;base64," + base64});
                    this.setState({loaded: true})
                }).catch((err) => {
                        this.setState({loaded: true})
                        console.log(err);
                        if (this.childErr.current) {
                            this.childErr.current.handleOpen();
                        }
                    }
                );
        } else {
            let url = "http://127.0.0.1:8800/api/v1/strains/phyloTree"
            if (this.state.generateType == "isolation") {
                url = "http://127.0.0.1:8800/api/v1/isolation/isolation_tree"
            }
            return axios
                .get(url, {
                        params: {
                            systems: this.state.selectedOption.map((option) => option.label),
                            subtree: this.state.textbox == false ? this.state.selectedFile : this.state.selectedStrains,
                            MLST: this.state.checkmlst
                        },
                        paramsSerializer: function (params) {
                            return qs.stringify(params, {arrayFormat: 'repeat'})
                        },
                        responseType: 'arraybuffer',
                    }
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    this.setState({source: "data:;base64," + base64});
                    this.setState({loaded: true})
                    // this.setState({selectedFile: {}})
                    // this.setState({selectedStrains: []})
                }).catch((err) => {
                        this.setState({loaded: true})
                        console.log(err);
                        if (this.childErr.current) {
                            this.childErr.current.handleOpen();
                        }
                    }
                );
        }
    };

    /*
    handle file upload and load each line to array of
     integers (aka strain indexes for subtree) for subtree generating
     using selectedFile state.
     */
    onFileChange = e => {

        // Update the state
        if (e.target.files.length > 0) {
            e.preventDefault()
            const reader = new FileReader()
            reader.onload = async (e) => {
                const text = (e.target.result);
                this.setState({selectedFile: text.split(/\r?\n/)});
                e.target.value = null;
            };
            reader.readAsText(e.target.files[0])
        }

    };

    /*
    handle the values inserted to autocomplete component and
    saves them in variable of subtree selectedStrains
     */

    handleTextBox = selected => {
        console.log(selected)
        // Update the state
        if (selected.length > 0) {
            let array = [];
            Object.keys(selected).map((key, index) => (
                array.push(selected[key]['index'])
            ))
            this.setState({selectedStrains: [...array]});
        }

    };

    generatingTypeHandler = Gtype => {
        if (Gtype == "defense") {
            this.setState({generateType: "defense"})
        }
        if (Gtype == "cluster") {
            this.setState({generateType: "cluster"})
        }
        if (Gtype == "isolation") {
            this.setState({generateType: "isolation"})
        }
        if (Gtype == "distinct systems") {
            this.setState({generateType: "distinct systems"}, () => this.computeTree());
        }
    }

    /*
    update the state of the file upload/strain selection on change
     */
    setSwitchTextBox = data => {
        this.setState({textbox: data});
    }


    render() {
        /*
        handles defense systems choice into selectedOptions state and save it.
         */
        const handleChange = selectedOption => {
            if (selectedOption == null) {
                selectedOption = []
            }
            this.setState(
                {selectedOption},
                () => console.log(`Option selected:`, this.state.selectedOption)
            );
        };

        /*
        color the defense systems options in the autocomplete box.
        also, handles multi value selection in it.
         */
        const colourStyles = {
            control: styles => ({...styles, backgroundColor: 'white'}),
            option: (styles, {data, isDisabled, isFocused, isSelected}) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? null
                        : isSelected
                            ? data.color
                            : isFocused
                                ? color.alpha(0.1).css()
                                : null,
                    color: isDisabled
                        ? '#ccc'
                        : isSelected
                            ? chroma.contrast(color, 'white') > 2
                                ? 'white'
                                : 'black'
                            : data.color,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor:
                            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                    },
                };
            },
            multiValue: (styles, {data}) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: color.alpha(0.1).css(),
                };
            },
            multiValueLabel: (styles, {data}) => ({
                ...styles,
                color: data.color,
            }),
            multiValueRemove: (styles, {data}) => ({
                ...styles,
                color: data.color,
                ':hover': {
                    backgroundColor: data.color,
                    color: 'white',
                },
            }),
        };

        /*
        render choice of drawer into the defense systems/cluster/isolation type
        section and component
         */
        const renderGenerateType = () => {
            if (this.state.generateType == "defense") {
                return (
                    <div>
                        <div>Choose the Defense Systems you would like to show:</div>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={this.state.colourOptions}
                            styles={colourStyles}
                            onChange={handleChange}
                        />
                    </div>
                )
            }

            if (this.state.generateType == "cluster") {
                return (
                    <div>
                        <div>Choose the number of genes you would like to show:</div>
                        <Cluster ref={this.cluster}/>
                    </div>)
            }
            if (this.state.generateType == "isolation") {
                return (<IsolationType ref={this.isltype}/>)
            } else {
                return (
                    <div>showing the distribution of distinct count of defense systems of each strain across the
                        tree</div>)
            }
        }

        const setCheckMLST = () => {
            let a = !this.state.checkmlst;
            this.setState({checkmlst: a}, function () {
                console.log(this.state.checkmlst);
            })
        }

        const downloadCluster = () => {
            if (this.state.generateType == "cluster" && this.cluster.current) {
                if (this.state.loadedCluster) {
                    return (
                        // console.log(this.cluster.current)
                        <GenesByClusterC
                            genes={[this.cluster.current.state.selected_geneA, this.cluster.current.state.selected_geneB, this.cluster.current.state.selected_geneC]}/>
                    )
                }
                return (<div></div>)
            }
        }

        return (
            <div className="mainDiv">
                <FadeIn>
                    <div className='rowC'>
                        <div className='sidebar'>
                            <div className="instructions">choose a way to upload strains and create subtree:</div>
                            <TextOrFileUpload updateTextbox={this.setSwitchTextBox}
                                              apiUrl="http://127.0.0.1:8800/api/v1/strains/indexes"
                                              multipleChoice={true}
                                              parentFileChangeCallback={this.onFileChange}
                                              parentHandleTextBox={this.handleTextBox} label="Please upload a file that contains a list of strains
                            separated by new lines (/n)"/>

                            <Divider/>
                            <br/>
                            <div style={{width: "95%", marginLeft: "5%"}}>
                                {renderGenerateType()}
                                <br/>
                                <Divider/>
                                <div className='rowC'>
                                    <input style={{marginTop:'2%'}} id='1' type="checkbox" name="mlst" onChange={setCheckMLST}/>
                                    <label style={{paddingLeft: '5%'}} htmlFor='1'> Display MLST across the tree</label>
                                </div>
                                <br/>
                                <Button onClick={() => this.computeTree()} variant="outline-primary"
                                        className='GenerateTree'>Generate Tree</Button>
                            </div>
                        </div>
                        <div className='Phylo_Tree'>
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={200}
                                defaultPositionY={100}
                            >
                                {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                                    <React.Fragment>
                                        <div style={{marginLeft: "40%"}} className="tools">
                                            <IconButton onClick={zoomIn} color="primary" aria-label="upload picture"
                                                        component="span">
                                                <ZoomIn/>
                                            </IconButton>
                                            <IconButton onClick={zoomOut} color="primary" aria-label="upload picture"
                                                        component="span">
                                                <ZoomOut/>
                                            </IconButton>
                                            <IconButton onClick={resetTransform} color="primary"
                                                        aria-label="upload picture"
                                                        component="span">
                                                <ArrowsFullscreen/>
                                            </IconButton>
                                        </div>
                                        {!this.state.loaded && (
                                            <div style={{marginLeft: "45%"}}><Spinner animation="border"
                                                                                      variant="primary"/>
                                            </div>)}
                                        <TransformComponent>


                                            <img style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                                 src={this.state.source}/>
                                        </TransformComponent>
                                    </React.Fragment>
                                )}
                            </TransformWrapper>
                            {downloadCluster()}
                            <div id="drawer">
                                <MiniDrawer generatingTypeHandler={this.generatingTypeHandler}/>
                            </div>
                        </div>
                    </div>

                </FadeIn>
                <ErrorModalC open={false} ref={this.childErr}/>
            </div>
        )
    }

}

export default BrowsePage;

