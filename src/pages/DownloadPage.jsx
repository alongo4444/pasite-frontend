import React, {useState} from "react";
import '../styles/DownloadPage.css';
import {Tab, Nav, Card} from "react-bootstrap";
import StrainForm from "../components/StrainForm"
import GenesByDefenseForm from "../components/GenesByDefenseForm";


/**
 * The Download Page
 */
export default function DownloadPage() {

    return (
        <div style={{textAlign: "center"}}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Card className="card_m_2">
                    <Card.Header style={{marginBottom: "2%", backgroundColor: "white", padding: "0px"}}>
                        {/*<Nav variant="pills" className="flex-column">*/}
                        <Nav justify variant="pills">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Genes by Strain/s</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Genes by Defense System/s</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
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

