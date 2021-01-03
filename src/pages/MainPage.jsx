import React, {Component} from "react";
import {Card, Fade, Container, Row, Col, Carousel} from "react-bootstrap";
import {Bell, Book} from 'react-bootstrap-icons';
import '../styles/MainPage.css';
import FadeIn from 'react-fade-in';
import PhiloTreeC from "../components/PhiloTreeC"
import slide1 from "../assets/images/slide1.jpg"
import slide2 from "../assets/images/slide2.jpg"
import slide3 from "../assets/images/slide3.jpg"
import { faDna,faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MainPage extends Component {


    // componentDidMount() {
    //     this.origcol = this.card.current.style.backgroundColor;
    //     this.card.current.addEventListener('mouseenter', this.changeBackground_e)
    //     this.card.current.addEventListener('mouseleave', this.changeBackground_l)
    // }


    render() {

        return (
            <div>
                <FadeIn>
                <Container style={{maxHeight: "1080px"}} fluid>
                    <Row xs={1}  >
                        <Col md={3}>
                            <Row >
                            <Card style={{textAlign: 'left'}}>
                            <Card.Header><Bell/> News</Card.Header>
                            <Card.Body className="sidecards">
                                <Card.Text >
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                            </Row>
                            <Row>
                            <Card style={{textAlign: 'left'}}>
                                <Card.Header><Book/> Cite Us</Card.Header>
                                <Card.Body className="sidecards">
                                    <Card.Text >
                                        With supporting text below as a natural lead-in to additional content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </Row>
                            </Col>

                        <Col md={5} >
                            <h3 className="desc"> <FontAwesomeIcon icon={faDna} />  Welcome to Pseudomonas Aeruginosite</h3>
                            <Card body className="main_c" style={{display: "inline-block"}}>
                                <p>Pseudomonas Aeruginosa is a commonly studied pathogen in the biological research community. Its field of research is considered as a study attraction for its diverse metabolic capacity and the danger it imposes on infections in cystic fibrosis patients. Many strains of this bacteria (~5000 strains) have different genes (~6000 genes for each strain), accompanied by a growing variety of distinct defense systems, which delegates them with persistent antimicrobial-resistance attributes and unique characteristics.
                                    Due to this heavy amount of information gathered throughout the years by many laboratory tests and studies, the need for a cross-referenced information arose. Today there are many databases which portrait the plenty and diverse bacteria species and genes, but most of them provide services and tools for a broad diversity of bacterias and loses the advantage of specializing in defense systems in Pseudomonas Aeruginosa species. Besides, the available databases lack well-suited visualization and statistical tools for defense systems in P. Aeruginosa species and do not allow potential characteristics analysis between them and their immune systems.
                                    This project binds data collected by biologists and existing databases into an accessible and user-friendly web-platform, which will help researchers to map between the significant amount of information on the divergent P. Aeruginosa gene's attributes and the different known defense systems. The platform will provide information retrieval tools, statistical information analysis, and visualization implementations to better understand the data involved. Also, the application will provide supplementary information and conclusions by using different machine learning, AI, and algorithms to find the connection and resemblance between the distinct defense systems and their correlation with plain genome attributes and characteristics. Also, the platform will deal with queries (by allowing simple and advanced search methods) and will retrieve data accordingly to the user's request. The goal of this project is to supply the researchers and scientists community with a web interface to consume, map, and visualize the rather complex information on P. Aeruginosa defense systems. The project will provide tools to find the similarities between P. Aeruginosa defense systems, and ultimately serve as a tool to cover the gap between the abundant amount of research information and the organized biological data in that specific field.
                                </p>
                                <h6 style={{textAlign: 'center'}}><FontAwesomeIcon icon={faAtom} /> <FontAwesomeIcon icon={faAtom} /> <FontAwesomeIcon icon={faAtom} />  </h6>
                                <p>Our system objective is to map between the significant amount of information on the Pseudomonas Aeruginosa's gene's attributes and the different known defense systems (For further information regarding the subject can be found in literature survey documentation). It will aim to provide tools to the community of biologists who desire to extract divergent data about the bacteria, such as statistical information analysis, visualization realizations and information retrieval tools that will assist them in comprehending the abundant data concerning the subject. The system will also offer further information and conclusions by utilizing machine learning methods to connect between the different defense systems and their genome attributes and features. Ultimately, the system will cover the gap between the copious and constantly growing research information and the organized biological data in that given field.</p>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <div style={{textAlign: "right"}}>
                            {/*<PhiloTreeC  title={"React PhyloTree Test"} newick={"(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.397100):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.157450):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021)"}/>*/}
                                <Carousel >
                                    <Carousel.Item >
                                        <img style={{ borderRadius: "15px"}}
                                            className="d-block w-100"
                                            src={slide1}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption>
                                            <div className="slidecaption">
                                                <h3 className="xbootstrap">Browse</h3>
                                                <p className="xbootstrap">Different species of the Pseudomonas Aeruginosa bacteria</p>
                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img style={{ borderRadius: "15px"}}
                                            className="d-block w-100"
                                            src={slide2}
                                            alt="Third slide"
                                        />

                                        <Carousel.Caption>
                                            <div className="slidecaption">
                                                <h3 className="xbootstrap">Discover</h3>
                                                <p className="xbootstrap">Connections between species and their connections to the defense systems</p>
                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img style={{ borderRadius: "15px"}}
                                            className="d-block w-100"
                                            src={slide3}
                                            alt="Third slide"
                                        />

                                        <Carousel.Caption>
                                            <div className="slidecaption">
                                                <h3 className="xbootstrap">Analyze</h3>
                                                <p className="xbootstrap">New information about different genes</p>
                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Col>

                    </Row>
                </Container>
                </FadeIn>
            </div>
        );
    }
}

export default MainPage;
