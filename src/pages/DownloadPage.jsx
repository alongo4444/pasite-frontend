import React, {useState} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button, OverlayTrigger, Tooltip, Tab, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from "axios";
import StrainForm from "../components/StrainForm";

export default function DownloadPage() {



    function getData() {

        const q = ['pid1234', 'pid1235']

        const FileDownload = require('js-file-download');

        const Qs = require('qs')

        let params = { q }

        let myAxios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })
        myAxios.get('http://127.0.0.1:8801/api/v1/test_genes',{params})
            .then((res) => {
            FileDownload(res.data, 'report.csv');
        }); // URL : https://path/to/api?foo=5&foo=2


        // axios
        //     .get("http://127.0.0.1:8801/api/v1/test_genes",{params = )
        //     .then((res) => {
        //         FileDownload(res.data, 'report.csv');
        //     });
    }

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
                                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                        <StrainForm/>

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            test
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
    );
}

