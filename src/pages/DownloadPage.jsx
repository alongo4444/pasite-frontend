import React, {useState} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from "axios";

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
                        <Button onClick={getData}>Download</Button>
                    </div>
    );
}

