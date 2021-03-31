import React, {Component} from "react";
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_venn from "@amcharts/amcharts4/plugins/venn";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import FadeIn from "react-fade-in";
import '../styles/CorrelationGraph.css';

am4core.useTheme(am4themes_animated);


class CorrelationGraph extends Component {
    state = {
        results: [],
        defNames : []
    };

    componentDidMount() {
        this.setState({defNames: this.props.defenseSystems.map((option) => option.name)})

        const Qs = require('qs')
        axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystems', {
            params: {
                systems: this.props.defenseSystems.map((option) => option.name),
            },
            paramsSerializer: params => {
                return Qs.stringify(params, {arrayFormat: 'repeat'})
            },
            //responseType: 'arraybuffer'
        })
            .then(response => {
                this.setState({results: response.data})
                console.log(this.state.results)
            }).catch(function (error) {
            console.log(error);
        });

        // Create chart
        var chart = am4core.create("chartdiv", am4plugins_venn.VennDiagram);

        // Create and configure series
        var series = chart.series.push(new am4plugins_venn.VennSeries())
        series.dataFields.category = "name";
        series.dataFields.value = "value";
        series.dataFields.intersections = "sets";
        series.data = [
            { name: "A", value: 10 },
            { name: "B", value: 10 },
            { name: "C", value: 3, sets: ["A", "B"] }
        ];

    }


    render() {

        const columns = [
            {dataField: "N", text: "Number of strains (N)", sort: false},
            {dataField: "K", text: "Defense System A (K)", sort: false},
            {dataField: "n", text: "Defense System B (n)", sort: false},
            {dataField: "k", text: "Intersection (k)", sort: false},
            {dataField: "pvalue", text: "P-Value", sort: false}
        ]
        return (
            <div>
                <div id="chartdiv" style={{ width: "100%", height: "200px" }}></div>

                <FadeIn>
                    <div style={{height: "100%", width: "90%",marginLeft:"5%", fontSize:"14px"}}>

                        <ToolkitProvider
                            keyField="id"
                            data={this.state.results}
                            columns={ columns }
                        >
                            {
                                props => (
                                    <div>
                                        <BootstrapTable  { ...props.baseProps }
                                                         pagination={paginationFactory({
                                                             paginationSize: 1,  // the pagination bar size, default is 5
                                                             lastPageText: '>>', // the text of last page button
                                                             hideSizePerPage: true, // hide the size per page dropdown
                                                             hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
                                                         })}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>
                </FadeIn>
            </div>
        );
    }


}

export default CorrelationGraph;