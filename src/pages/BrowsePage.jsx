import React, {Component} from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import IconButton from '@material-ui/core/IconButton';
import {ArrowsFullscreen, ZoomIn, ZoomOut} from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form';
import '../styles/BrowsePage.css';
import chroma from 'chroma-js';
import {colourOptions} from '../utilities/colors';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import '../assets/fonts/YesevaOne-Regular.ttf';
import Switch from "react-switch";
import AutocompleteC from "../components/AutocompleteC";

var qs = require('qs');

class BrowsePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: [],
            loaded: false,
            textbox: true,
            textOrFile: 'Text Box',
            selectedOption: [],
            selectedFile: {},
            selectedStrains: []
        }
    };

    componentDidMount() {
        axios
            .get(
                "http://127.0.0.1:8801/api/v1/strains/phyloTree",
                {responseType: 'arraybuffer'},
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
            });
    }

    computeTree = () => {
        this.setState({source: []});
        this.setState({loaded: false})
        return axios
            .get(
                "http://127.0.0.1:8801/api/v1/strains/phyloTree", {
                    params: {
                        systems: this.state.selectedOption.map((option) => option.label),
                        subtree: this.state.selectedFile
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
                this.setState({selectedFile: {}})
            }).catch((err) => console.log(err)
            );
    };
    onFileChange = e => {

        // Update the state
        if (e.target.files.length > 0) {
            e.preventDefault()
            const reader = new FileReader()
            console.log(e)
            reader.onload = async (e) => {
                const text = (e.target.result);
                this.setState({selectedFile: text.split(/\r?\n/)});
                e.target.value = null;
            };
            reader.readAsText(e.target.files[0])
        }

    };

    handleTextBox = selected => {

        // Update the state
        if (selected.length > 0) {
            let array = [];

            Object.keys(selected).map((key, index) => (
                array.push(selected[key]['name'])
            ))
            this.setState({selectedStrains: array});
        }

    };


    render() {
        const handleChange = selectedOption => {
            this.setState(
                {selectedOption},
                () => console.log(`Option selected:`, this.state.selectedOption)
            );
        };
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
        const renderTextBox = () => {
            if (this.state.textbox == true) {
                return <AutocompleteC multipleChoice={true} apiUrl="http://127.0.0.1:8801/api/v1/strains"
                                      labelText=""
                                      parentCallback={this.handleTextBox}/>;
            } else {
                return <Form.Group>
                    <Form.File onChange={(e) => this.onFileChange(e)} id="exampleFormControlFile1"
                               label="Please upload a file that contains list of strains"/>
                </Form.Group>;
            }
        }

        const setSwitchTextBox = () => {
            if (this.state.textbox == true) {
                this.setState({textbox: false});
                this.setState({textOrFile: 'File Upload'});

            } else {
                this.setState({textbox: true});
                this.setState({textOrFile: 'Text Box'});
            }
        }

        return (
            <div className="mainDiv">
                <FadeIn>
                    <div className='rowC'>
                        <div className='sidebar'>
                            <div className="instructions">choose a way to upload strains and create subtree:</div>
                            <div className="textBox">
                                <div className='rowC'>
                                    <Switch onChange={setSwitchTextBox} checked={this.state.textbox}/> <span
                                    className="switch">{this.state.textOrFile}</span>
                                </div>
                                <Form>
                                    {renderTextBox()}
                                </Form>
                            </div>
                            <div className="instructions">Choose the Defense Systems you would like to show:</div>

                            <div style={{width: "95%", marginLeft: "5%"}}>
                                <Select
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={colourOptions}
                                    styles={colourStyles}
                                    onChange={handleChange}
                                />
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
                                        <div style={{marginLeft: "42%"}} className="tools">
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
                                            <div style={{marginLeft: "52%"}}><Spinner animation="border"
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
                        </div>
                    </div>

                </FadeIn>
            </div>
        )
    }

}

export default BrowsePage;

