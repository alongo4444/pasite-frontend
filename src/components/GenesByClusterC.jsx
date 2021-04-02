import React from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button} from "react-bootstrap";
import axios from "axios";
import ErrorModalC from "./ErrorModalC";
import CSVorFastaC from "../components/CSVorFastaC";


export default function GenesByClusterC({genes}) {

    const childErr = React.createRef();
    const fileSelect = React.createRef();

    function getData() {
        const FileDownload = require('js-file-download');

        const Qs = require('qs')

        let params = { genes: genes, csv: fileSelect.current.getCsv(), prot: fileSelect.current.getProt()}

        let myAxios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })

        myAxios.get('http://127.0.0.1:8800/api/v1/genes/genes_by_cluster',{params})
            .then((res) => {
                if (fileSelect.current.getCsv()) {
                    FileDownload(res.data, 'genes_by_cluster.csv')
                } else {
                    FileDownload(res.data, 'genes_by_cluster.faa')
                }
            }).catch(function (error) {childErr.current.handleOpen()});
    }



    return (
        <div className="search-form">
            <CSVorFastaC ref={fileSelect}/>
            <div style={{textAlign: "left"}}>
                <Button onClick={getData}>Download Genes in the Same Cluster</Button>
            </div>
            <ErrorModalC open={false} ref={childErr}/>
        </div>
    );
}

