import React, {Component, useEffect, useRef, useState} from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import IconButton from '@material-ui/core/IconButton';
import {ArrowsFullscreen, ZoomIn, ZoomOut} from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner'
import '../styles/BrowsePage.css';
import chroma from 'chroma-js';
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
import WarningModalC from "../components/WarningModalC";


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
        this.childWar = React.createRef()
        this.childAutoText = React.createRef();


        this.state = {
            source: [],
            loaded: false,
            textbox: true,
            textOrFile: 'Text Box',
            selectedOption: [],
            selectedFile: {},
            selectedStrains: [],
            isOpen: false,
            generateType: ["defense"],
            checkmlst: false,
            loadedCluster: false,
            colourOptions:{},
            list_strain_gene:[],
            badSystems: [],
            badStrains: []
        }

        this.parentFileChangeCallback = this.onFileChange.bind(this)
        this.updateTextBox = this.setSwitchTextBox.bind(this)
        this.parentHandleTextBox = this.handleTextBox.bind(this)
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
            console.log(colors.data)
            this.setState({colourOptions: colors.data});
        }).catch((err) => {
            this.setState({loaded: true})
            console.log(err);
            if (this.childErr.current) {
                this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.");
            }});
    }

    /*
    compute a new tree when the user click the button "generate tree"
    similar to the orginial function, this time - with query params.
     */
    async computeTree() {
        this.setState({source: []});
        this.setState({loaded: false});
        this.setState({loadedCluster: false})
        let systems = []
        if (this.state.generateType.includes("cluster")) {
            await this.setState({list_strain_gene:[...this.cluster.current.getTree()]})
        }
            let url = "http://127.0.0.1:8800/api/v1/strains/phyloTree"
            return axios
                .get(url, {
                        params: {
                            systems: this.state.generateType.includes("defense") ? this.state.selectedOption.map((option) => option.label): [],
                            subtree: this.state.textbox == false ? this.state.selectedFile : this.state.selectedStrains,
                            list_strain_gene: this.state.generateType.includes("cluster") ? this.state.list_strain_gene : [],
                            avg_defense_sys: this.state.generateType.includes("distinct systems"),
                            isolation_type: this.state.generateType.includes("isolation"),
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
                    if (this.state.generateType.includes("cluster")){
                        this.setState({loadedCluster: true})
                    }
                    console.log(response.headers['bad_subtree'])
                    if(response.headers['bad_subtree'].length>0 || response.headers['bad_systems'].length>0){
                        this.setState({badSystems: response.headers['bad_systems']},()=>{
                            this.setState({badStrains: response.headers['bad_subtree']},() => {
                                if (this.childErr.current) {
                                    this.childWar.current.handleOpen();
                                }
                            });
                        });

                    }
                }).catch((err) => {
                        this.setState({loaded: true})
                        console.log("the error:" +err);
                        if (this.childErr.current) {
                            this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.");
                        }
                    }
                );
        }

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

    arrayRemove = (arr, value) =>{

        return arr.filter(function(geeks){
            return geeks != value;
        });

    }

    generatingTypeHandler = Gtype => {
        let isActive = this.state.generateType.includes(Gtype);
        if (isActive){
            this.setState({generateType: this.arrayRemove(this.state.generateType, Gtype)});
        }
        else{
            let newArr = [...this.state.generateType,Gtype]
            this.setState({generateType: [...newArr]});
        }
    }

    /*
    update the state of the file upload/strain selection on change
     */
    setSwitchTextBox = data => {
        this.setState({textbox: data});
        if(data){
            this.setState({selectedFile: []});
        } else {
            this.setState({selectedStrains: []});
        }
    }

    resetParams = () => {
        this.setState({selectedFile:{}})
        this.setState({selectedStrains:[]})
        this.setState({checkmlst:false})
        this.setState({selectedOption: []})
        this.childAutoText.current.clearAutoComplete();
        if(this.cluster.current) {
            this.cluster.current.clearInput();
        }

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
                return (<div>
                    {this.state.generateType.includes("defense") && (<div>
                        <div>Choose the Defense Systems you would like to show:</div>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            // options={this.state.colourOptions}
                            options={this.state.colourOptions && this.state.colourOptions.constructor === Array ? this.state.colourOptions : Array(this.state.colourOptions)}
                            styles={colourStyles}
                            onChange={handleChange}
                            value={this.state.selectedOption}
                        />
                        <br/><Divider/><br/>
                    </div>)}
                        {this.state.generateType.includes("cluster") && (<div>
                            <div>Choose the number of genes you would like to show:</div>
                            <Cluster ref={this.cluster}/>
                            <br/><Divider/><br/>
                        </div>)}
                        {this.state.generateType.includes("isolation") &&(<div><IsolationType ref={this.isltype}/><br/><Divider/><br/></div>)}
                        {this.state.generateType.includes("distinct systems") && (<div>showing the distribution of distinct count of defense systems of each strain across the
                            tree<br/><Divider/><br/></div>)}
                    </div>
                )
        }

        const setCheckMLST = () => {
            let a = !this.state.checkmlst;
            this.setState({checkmlst: a}, function () {
                console.log(this.state.checkmlst);
            })
        }

        const downloadCluster = () => {
            if (this.state.generateType.includes("cluster") && this.cluster.current) {
                if (this.state.loadedCluster) {
                    return (
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
                            <TextOrFileUpload ref={this.childAutoText}
                                              updateTextbox={this.setSwitchTextBox}
                                              apiUrl="http://127.0.0.1:8800/api/v1/strains/indexes"
                                              multipleChoice={true}
                                              parentFileChangeCallback={this.onFileChange}
                                              parentHandleTextBox={this.handleTextBox} label="Please upload a file that contains a list of strains
                            separated by new lines (/n)"/>

                            <Divider/>
                            <br/>
                            <div style={{width: "95%", marginLeft: "5%"}}>
                                {renderGenerateType()}
                                <div className='rowC'>
                                    <input style={{marginTop:'2%', marginLeft:"3%"}} id='1' type="checkbox" name="mlst" onChange={setCheckMLST} checked={this.state.checkmlst}/>
                                    <label style={{paddingLeft: '3%'}} htmlFor='1'> Display MLST across the tree</label>
                                </div>
                                <br/>
                                <div class="rowC">
                                    <Button onClick={() => this.resetParams()} variant="outline-primary"
                                            className='resetParams'>Reset Query</Button>
                                    <Button onClick={() => this.computeTree()} variant="outline-primary"
                                            className='GenerateTree'>Generate Tree</Button>
                                </div>

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
                <WarningModalC open={false} badSystems={this.state.badSystems} badStrains={this.state.badStrains} ref={this.childWar}/>
            </div>
        )
    }

}

export default BrowsePage;

