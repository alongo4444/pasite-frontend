import React from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button} from "react-bootstrap";
import axios from "axios";
import ErrorModalC from "./ErrorModalC";


export default function GenesByClusterC({indexC}) {

    const childErr = React.createRef();

    function getData() {
        const FileDownload = require('js-file-download');

        const Qs = require('qs')

        let params = { indexC: indexC}

        let myAxios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })

        myAxios.get('http://127.0.0.1:8800/api/v1/genes/genes_by_cluster',{params})
            .then((res) => {
                FileDownload(res.data, 'genes_by_cluster.csv');
            }).catch(function (error) {childErr.current.handleOpen()});
    }

    return (
        <div className="search-form">
            <div style={{textAlign: "center"}}>
                <Button onClick={getData}>Download Genes in the Same Cluster</Button>
            </div>
            <ErrorModalC open={false} ref={childErr}/>
        </div>
    );
}

