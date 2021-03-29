import React, {useState} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Tab, Nav} from "react-bootstrap";
import axios from "axios";
import StrainForm from "../components/StrainForm";
import GenesByDefenseForm from "../components/GenesByDefenseForm";

export default function DownloadPage() {

    return (
                    <div style={{textAlign: "center"}}>

                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Strain's Genes</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Genes by Defense System</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <StrainForm/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <GenesByDefenseForm/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
    );
}

