import React, {Component} from "react";
import {Card, Fade, Container, Row, Col, Carousel} from "react-bootstrap";
import {Bell, Book} from 'react-bootstrap-icons';
import styles from '../styles/MainPage.css';
import FadeIn from 'react-fade-in';
import PhiloTreeC from "../components/PhiloTreeC"
import slide1 from "../assets/images/slide1.jpg"
import slide2 from "../assets/images/slide2.jpg"
import slide3 from "../assets/images/slide3.jpg"
import slide4 from "../assets/images/slide4.jpg"
import slide5 from "../assets/images/slide5.jpg"
import slide6 from "../assets/images/slide6.jpg"
import {faDna, faAtom} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
import axios from "axios";
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import GenesByClusterC from "../components/GenesByClusterC";
import DropdownCheckbox from "../components/DropdownCheckbox";
import CorrelationGraph from "../components/CorrelationGraph";
import CorrelationResultsPage from "./CorrelationResultsPage";


class MainPage extends Component {

    state = {source: null};

    render() {

        return (
            <div>
                <FadeIn>
                    <div style={{width: "98%", marginLeft: "1%"}}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    style={{height: "750px", objectFit: 'cover'}}
                                    className="d-block w-100"
                                    src={slide4}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <div className="caption_wrper">
                                    <div className="slidecaption">
                                        <h1>Pseudomonoas AeruginoSite</h1>
                                    </div>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    style={{height: "750px", objectFit: 'cover'}}
                                    className="d-block w-100"
                                    src={slide5}
                                    alt="Second slide"
                                />

                                <Carousel.Caption>
                                    <div className="caption_wrper">
                                    <div className="slidecaption">
                                        <h3>Web-platform for exploration of the bacteria Pseudomonas Aeruginosa</h3>
                                        <p>Explore strains,genes and defense systems using advanced visualization and
                                            tabular tools for convenient research </p>
                                    </div>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    style={{height: "750px", objectFit: 'cover'}}
                                    className="d-block w-100"
                                    src={slide6}
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <div className="caption_wrper">
                                    <div className="slidecaption">
                                        <h3>Contact us and Citation</h3>
                                        <p>Let us know if anything is missing or any feedback</p>
                                    </div>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </FadeIn>

            </div>
        );
    }
}

export default MainPage;
