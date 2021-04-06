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
import ErrorModalC from "./ErrorModalC";

am4core.useTheme(am4themes_animated);


class CorrelationGraph extends Component {
// export default function CorrelationGraph({itemsSelected, eventK}) {

    constructor(props) {
        super(props);
        this.childErr = React.createRef();
        this.state = {
            results: [],
            itemNames: []
        };

    }

    // const [results, setResults] = React.useState([]);
    // const [itemNames, setItemNames] = React.useState([]);
    // const childErr = React.createRef();
    //
    //
    // React.useEffect(() => {
    //     if (eventK == 'first') {
    //         const Qs = require('qs')
    //         axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystems', {
    //             params: {
    //                 systems: itemsSelected.map((option) => option.name),
    //             },
    //             paramsSerializer: params => {
    //                 return Qs.stringify(params, {arrayFormat: 'repeat'})
    //             },
    //             //responseType: 'arraybuffer'
    //         })
    //             .then(response => {
    //                 setResults(response.data)
    //             })
    //     } else if (eventK == 'second') {
    //
    //     } else if (eventK == 'third') {
    //         const Qs = require('qs')
    //         axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystemAndIsolationType', {
    //             params: {
    //                 system: itemsSelected[0].name, isoType: itemsSelected[1].name
    //             },
    //             paramsSerializer: params => {
    //                 return Qs.stringify(params, {arrayFormat: 'repeat'})
    //             },
    //             //responseType: 'arraybuffer'
    //         })
    //             .then(response => {
    //                 setResults(response.data)
    //             })
    //     }
    // }, [itemsSelected]);
    //
    //
    // React.useEffect(() => {
    //
    //     if (!results[0]) {
    //         return undefined;
    //     }
    //
    //     let chart = am4core.create("chartdiv", am4plugins_venn.VennDiagram);
    //
    //     // Create and configure series
    //     let series = chart.series.push(new am4plugins_venn.VennSeries())
    //     series.dataFields.category = "name";
    //     series.dataFields.value = "value";
    //     series.dataFields.intersections = "sets";
    //     series.data = [
    //         {name: itemNames[0], value: results[0]['K']},
    //         {name: itemNames[1], value: results[0]['n']},
    //         {
    //             name: itemNames[0] + "\n&\n" + itemNames[1],
    //             value: results[0]['k'],
    //             sets: [itemNames[0], itemNames[1]]
    //         }
    //     ];
    //     console.log(series.data);
    // }, [results])
    //
    //
    // React.useEffect(() => {
    //     if (eventK == 'first') {
    //         setItemNames(itemsSelected.map((option) => option.name))
    //     } else if (eventK == 'second') {
    //
    //     } else if (eventK == 'third') {
    //         const items = [itemsSelected[0].name, itemsSelected[1].name]
    //         setItemNames(items, function () {
    //             const Qs = require('qs')
    //             axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystemAndIsolationType', {
    //                 params: {
    //                     system: itemsSelected[0].name, isoType: itemsSelected[1].name
    //                 },
    //                 paramsSerializer: params => {
    //                     return Qs.stringify(params, {arrayFormat: 'repeat'})
    //                 },
    //                 //responseType: 'arraybuffer'
    //             })
    //                 .then(response => {
    //                     setResults(response.data)
    //
    //                 }).catch(function (error) {
    //                 if (childErr.current) {
    //                     childErr.current.handleOpen()
    //                 }
    //             });
    //         })
    //     }
    // })

    componentDidMount() {
        if (this.props.eventK === 'first') {
            this.setState({itemNames: this.props.itemsSelected.map((option) => option.name)}, function () {
                const Qs = require('qs')
                axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystems', {
                    params: {
                        systems: this.props.itemsSelected.map((option) => option.name),
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {arrayFormat: 'repeat'})
                    },
                    //responseType: 'arraybuffer'
                })
                    .then(response => {
                        this.setState({results: response.data}, function () {
                            // Create chart
                            let chart = am4core.create("chartdiv", am4plugins_venn.VennDiagram);

                            // Create and configure series
                            let series = chart.series.push(new am4plugins_venn.VennSeries())
                            series.dataFields.category = "name";
                            series.dataFields.value = "value";
                            series.dataFields.intersections = "sets";
                            series.data = [
                                {name: this.state.itemNames[0], value: this.state.results[0]['K']},
                                {name: this.state.itemNames[1], value: this.state.results[0]['n']},
                                {
                                    name: this.state.itemNames[0] + "\n&\n" + this.state.itemNames[1],
                                    value: this.state.results[0]['k'],
                                    sets: [this.state.itemNames[0], this.state.itemNames[1]]
                                }
                            ];
                        })

                    }).catch(function (error) {
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen()
                    }
                });
            })
        } else if (this.props.eventK === 'second') {

        } else if (this.props.eventK === 'third') {
            const items = [this.props.itemsSelected[0].name, this.props.itemsSelected[1].name]
            this.setState({itemNames: items}, function () {
                const Qs = require('qs')
                axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystemAndIsolationType', {
                    params: {
                        system: this.props.itemsSelected[0].name, isoType: this.props.itemsSelected[1].name
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {arrayFormat: 'repeat'})
                    },
                    //responseType: 'arraybuffer'
                })
                    .then(response => {
                        this.setState({results: response.data}, function () {
                            // Create chart
                            let chart = am4core.create("chartdiv", am4plugins_venn.VennDiagram);

                            // Create and configure series
                            let series2 = chart.series.push(new am4plugins_venn.VennSeries())
                            series2.dataFields.category = "name";
                            series2.dataFields.value = "value";
                            series2.dataFields.intersections = "sets";
                            series2.data = [
                                {name: this.state.itemNames[0], value: this.state.results[0]['K']},
                                {name: this.state.itemNames[1], value: this.state.results[0]['n']},
                                {
                                    name: this.state.itemNames[0] + "\n&\n" + this.state.itemNames[1],
                                    value: this.state.results[0]['k'],
                                    sets: [this.state.itemNames[0], this.state.itemNames[1]]
                                }

                            ];
                            // series.data =  [{ name: "A", value: 10 }, { name: "B", value: 10 }, { name: "C", value: 10 }, { name: "X", value: 2, sets: ["A", "B"] }, { name: "Y", value: 2, sets: ["A", "C"] }, { name: "Z", value: 2, sets: ["B", "C"] }, { name: "Q", value: 1, sets: ["A", "B", "C"] }];
                            console.log(series2.data);
                        })

                    }).catch(function (error) {
                        console.log("tomerrrr")
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen()
                    }
                });
            })
        }
    }

    render() {

        const columns = [
            {dataField: "N", text: "Number of strains (N)", sort: false},
            {dataField: "K", text: "Defense System A (K)", sort: false},
            {dataField: "n", text: "Defense System B (n)", sort: false},
            {dataField: "k", text: "Intersection (k)", sort: false},
            {dataField: "pvalue", text: "P-Value", sort: false}
        ]

        /*
        const getGraph = () => {
            return (
                <div>
                    <div id="chartdiv" style={{width: "100%", height: "200px"}}></div>
                </div>
            )
        }
        */
        return (
            <div>


                <FadeIn>
                    <div id="chartdiv" style={{width: "100%", height: "200px"}}></div>

                    <div style={{height: "100%", width: "90%", marginLeft: "5%", fontSize: "14px"}}>

                        <ToolkitProvider
                            keyField="id"
                            data={this.state.results}
                            columns={columns}
                        >
                            {
                                props => (
                                    <div>
                                        <BootstrapTable  {...props.baseProps}
                                                         pagination={paginationFactory({
                                                             paginationSize: 1,  // the pagination bar size, default is 5
                                                             //lastPageText: '>>', // the text of last page button
                                                             hideSizePerPage: true, // hide the size per page dropdown
                                                             hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
                                                         })}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                        <h6>Notice: The P-Value is based on the Hypergeometric test</h6>

                    </div>
                </FadeIn>
                <ErrorModalC open={false} ref={this.childErr}/>
            </div>
        );
    }
}

export default CorrelationGraph;