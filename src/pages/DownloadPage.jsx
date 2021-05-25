import React, {useState} from "react";
import '../styles/DownloadPage.css';
import {Form, Col, Row, Tab, Nav, Card} from "react-bootstrap";
import axios from "axios";
import StrainForm from "../components/StrainForm"
import GenesByClusterC from "../components/GenesByClusterC";
import GenesByDefenseForm from "../components/GenesByDefenseForm";
import {BrowserRouter as Switch} from "react-router-dom";
import {Route} from "react-router";
import SearchPage from "./SearchPage";
import ResultsPage from "./ResultsPage";
import BrowsePage from "./BrowsePage";
import StrainCircosPage from "./StrainCircosPage";
import StrainCircosResultsPage from "./StrainCircosResultsPage";
import CorrelationSearchPage from "./CorrelationSearchPage";
import CorrelationResultsPage from "./CorrelationResultsPage";
import MainPage from "./MainPage";

/**
 * The Download Page
 */
export default function DownloadPage() {

    return (
                    <div style={{textAlign: "center"}}>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Card className="card_m_2"  >
                            <Card.Header style={{marginBottom: "2%", backgroundColor:"white", padding: "0px"}}>
                                {/*<Nav variant="pills" className="flex-column">*/}
                                <Nav justify variant="pills" >
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Genes by Strain/s</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Genes by Defense System/s</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body >
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <StrainForm/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <GenesByDefenseForm/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                        </Tab.Container>

                    </div>
    );
}

