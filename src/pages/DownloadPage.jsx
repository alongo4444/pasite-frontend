import React, {useState} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from "axios";

export default function DownloadPage() {



    function getData() {
        const FileDownload = require('js-file-download');
        axios
            .get("http://127.0.0.1:8801/api/v1/test_genes")
            .then((res) => {
                FileDownload(res.data, 'report.csv');
            });
    }

    return (
                    <div style={{textAlign: "center"}}>
                        <Button onClick={getData}>Download</Button>
                    </div>
    );
}

