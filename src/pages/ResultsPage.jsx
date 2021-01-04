import React, {Component} from "react";
import PhiloTreeC from "../components/PhiloTreeC";
import FadeIn from "react-fade-in";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import '../styles/ResultsPage.css';

class ResultsPage extends Component {
    state = {
        result_table: []
    };

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8801/api/v1/genes")
            .then((res) => {
                this.setState({ result_table: res.data });
                console.log(this.state.result_table)
            });
    }

    render() {
        const params = this.props.history.location.state.myArrayVariableName; // get the selected items from the search page (sent from the SearchPage component).

        const columns = [
            {dataField: "dna_sequence", text: "dna_sequence"},
            {dataField: "end_y", text: "end_y"},
            {dataField: "geneID_y", text: "geneID_y"},
            {dataField: "genomic_accession_y", text: "genomic_accession_y"},
            {dataField: "name_y", text: "name_y", sort: true},
            {dataField: "product_accession_y", text: "product_accession_y"},
            {dataField: "product_length_y", text: "product_length_y"},
            {dataField: "product_sequence", text: "product_sequence"},
            {dataField: "start_y", text: "start_y"},
            {dataField: "strand_y", text: "strand_y"},
            {dataField: "symbol_y", text: "symbol_y"}
            ]


        return (
            <div>
                <FadeIn>
                    <BootstrapTable
                        keyField="name"
                        data={this.state.result_table}
                        columns={columns}
                        pagination={paginationFactory()}
                        />
                    <div>
                        <PhiloTreeC title={"Phylogenetic Tree"}
                                    newick={"(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.397100):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.157450):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021)"}/>
                    </div>
                    <ol>
                        {params.map((item) => (
                            <li>{item['text']}</li>
                        ))}
                    </ol>
                </FadeIn>
            </div>
        )
    }
}

export default ResultsPage;