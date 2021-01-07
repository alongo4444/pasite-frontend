import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/BrowsePage.css'
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader';
import axios from "axios";
import {useRef, useEffect} from 'react';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";


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

        let images = [
            {
                url:this.state.source,
                title:"image title 1"
            },
            ]
        return (
            <div>
                <FadeIn>
                    <Lightbox images={images}/>
                </FadeIn>
            </div>
        )
    }

}

export default ResultsPage;