import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/ResultsPage.css'
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader';
import axios from "axios";
import {ReactSVGPanZoom} from "react-svg-pan-zoom";



class ResultsPage extends Component {
    state = {
        source: []
    };

    componentDidMount() {
        axios
                .get(
                    "http://127.0.0.1:8801/api/v1/strains/phyloTree",
                    { responseType: 'arraybuffer' },
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    this.setState({ source: "data:;base64," + base64 });
                });
    }


    render() {

        return (
            <div>
                <FadeIn>
                    <img src={this.state.source}/>
                </FadeIn>
            </div>
        )
    }

}

export default ResultsPage;