import React, {Component} from "react";
import {Carousel} from "react-bootstrap";
import FadeIn from 'react-fade-in';
import slide4 from "../assets/images/slide4.jpg"
import slide5 from "../assets/images/slide5.jpg"
import slide6 from "../assets/images/slide6.jpg"

import 'react-awesome-slider/dist/styles.css';


/**
 * The Main page of the application
 */
class MainPage extends Component {

    state = {source: null};

    render() {

        return (
            <div>
                <FadeIn>
                    <div style={{width: "98%", marginLeft: "1%"}}>
                        <Carousel interval={null} >
                            <Carousel.Item>
                                <iframe width="560" height="315"
                                        src="https://www.youtube.com/embed/4NphfoHIxPM?controls=0"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </Carousel.Item>
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
