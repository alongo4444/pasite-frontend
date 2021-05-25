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
import './CorrelationComponents/Correlations.css'
import ErrorModalC from "./ErrorModalC";
import CorrelationBoxPlot from "./CorrelationBoxPlot";
import {Col, Container, Row} from "react-bootstrap";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {BsShieldShaded, BsFillCaretRightFill} from "react-icons/bs";
import {SiHubspot, SiMicrogenetics} from "react-icons/si";
import {GiDrippingTube} from "react-icons/gi";

am4core.useTheme(am4themes_animated);

/**
 * the Vann correlation component
 */
class CorrelationGraph extends Component {
// export default function CorrelationGraph({itemsSelected, eventK}) {

    constructor(props) {
        super(props);
        this.childErr = React.createRef();
        this.state = {
            title: "",
            results: [],
            itemNames: [],
            withd_y: [],
            without_y: []
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
        if (this.props.eventK == 'dvd') {
            // this.setState({title: 'Correlation Between:'})
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
                            console.log(series.data);
                        })

                    }).catch((err) => {
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.")
                    }
                });
            })
        } else if (this.props.eventK == 'dvc') {
            const items = [this.props.itemsSelected[0].name, this.props.itemsSelected[1].name]
            this.setState({itemNames: items}, function () {
                const Qs = require('qs')
                axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystemAndAttribute', {
                    params: {
                        system: this.props.itemsSelected[0].name, category: this.props.itemsSelected[1].name
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {arrayFormat: 'repeat'})
                    },
                    //responseType: 'arraybuffer'
                })
                    .then(response => {
                        this.setState({withd_y: response.data[1]}, function () {
                            this.setState({without_y: response.data[2]}, function () {
                                this.setState({results: response.data[0]}, function () {
                                    // Create chart
                                    let chart = am4core.create("chartdiv", am4plugins_venn.VennDiagram);

                                    // Create and configure series
                                    let series = chart.series.push(new am4plugins_venn.VennSeries())
                                    series.dataFields.category = "name";
                                    series.dataFields.value = "value";
                                    series.dataFields.intersections = "sets";
                                    series.data = [
                                        {name: this.state.itemNames[0], value: this.state.results['K']},
                                        {name: this.state.itemNames[1], value: this.state.results['n']},
                                        {
                                            name: this.state.itemNames[0] + "\n&\n" + this.state.itemNames[1],
                                            value: this.state.results['k'],
                                            sets: [this.state.itemNames[0], this.state.itemNames[1]]
                                        }

                                    ];
                                    // series.data =  [{ name: "A", value: 10 }, { name: "B", value: 10 }, { name: "C", value: 10 }, { name: "X", value: 2, sets: ["A", "B"] }, { name: "Y", value: 2, sets: ["A", "C"] }, { name: "Z", value: 2, sets: ["B", "C"] }, { name: "Q", value: 1, sets: ["A", "B", "C"] }];
                                    console.log(series.data);
                                })
                            })
                        })
                    }).catch((err) => {
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.")
                    }
                });
            })
        } else if (this.props.eventK == 'dvi') {
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
                            // series.data =  [{ name: "A", value: 10 }, { name: "B", value: 10 }, { name: "C", value: 10 }, { name: "X", value: 2, sets: ["A", "B"] }, { name: "Y", value: 2, sets: ["A", "C"] }, { name: "Z", value: 2, sets: ["B", "C"] }, { name: "Q", value: 1, sets: ["A", "B", "C"] }];
                            console.log(series.data);
                        })

                    }).catch((err) => {
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.")
                    }
                });
            })
        } else if (this.props.eventK == 'dvcl') {
            const items = [this.props.itemsSelected[0].name, this.props.itemsSelected[1].name, this.props.itemsSelected[2].name]
            this.setState({itemNames: items}, function () {
                const Qs = require('qs')
                axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenDefenseSystemAndCluster', {
                    params: {
                        system: items[0], strain: items[1], gene: items[2]
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
                            // series.data =  [{ name: "A", value: 10 }, { name: "B", value: 10 }, { name: "C", value: 10 }, { name: "X", value: 2, sets: ["A", "B"] }, { name: "Y", value: 2, sets: ["A", "C"] }, { name: "Z", value: 2, sets: ["B", "C"] }, { name: "Q", value: 1, sets: ["A", "B", "C"] }];
                            console.log(series.data);
                        })

                    }).catch((err) => {
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.")
                    }
                });
            })
        } else if (this.props.eventK == 'clvi') {
            const items = [this.props.itemsSelected[0].name, this.props.itemsSelected[1].name, this.props.itemsSelected[2].name]
            this.setState({itemNames: items}, function () {
                const Qs = require('qs')
                axios.get('http://127.0.0.1:8800/api/v1/statistics/correlationBetweenClusterAndIsolationType', {
                    params: {
                        isoType: items[0], strain: items[1], gene: items[2]
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
                            // series.data =  [{ name: "A", value: 10 }, { name: "B", value: 10 }, { name: "C", value: 10 }, { name: "X", value: 2, sets: ["A", "B"] }, { name: "Y", value: 2, sets: ["A", "C"] }, { name: "Z", value: 2, sets: ["B", "C"] }, { name: "Q", value: 1, sets: ["A", "B", "C"] }];
                            console.log(series.data);
                        })

                    }).catch((err) => {
                    if (this.childErr.current) {
                        this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.")
                    }
                });
            })
        }
    }


    // componentWillUnmount() {
    //     if (this.chart) {
    //         this.chart.dispose();
    //     }
    // }

    render() {

        const columns = [
            {dataField: "N", text: "Number of strains (N)", sort: false},
            {dataField: "K", text: "Defense System A (K)", sort: false},
            {dataField: "n", text: "Defense System B (n)", sort: false},
            {dataField: "k", text: "Intersection (k)", sort: false},
            {dataField: "pvalue", text: "P-Value", sort: false}
        ]

        let getGraph = () => {
            if (this.props.eventK != 'dvc') {
                return (
                    <div>
                        <div id="chartdiv" style={{width: "100%", height: "450px"}}></div>
                    </div>
                )
            } else {
                return (
                    <div id="boxplotdiv">
                        <CorrelationBoxPlot  withd_y={this.state.withd_y} withoutd_y={this.state.without_y}/>
                        <br/>
                        <br/>
                    </div>
                )
            }
        }

        const corrText = () => {
            if (this.props.eventK == 'dvd') {
                return (
                    <Container>
                        <Row>
                            <Col>
                                Defense system:
                            </Col>
                            <Col>
                                Defense system:
                            </Col>
                        </Row> <Row>
                        <Col className="col_s">
                            <ListItemIcon><BsShieldShaded className="icon_s"/>{this.props.itemsSelected[0].name}
                            </ListItemIcon>
                        </Col>
                        <Col className="col_s">
                            <ListItemIcon><BsShieldShaded className="icon_s"/>{this.props.itemsSelected[1].name}
                            </ListItemIcon>
                        </Col>
                    </Row>
                    </Container>
                )
            } else if (this.props.eventK == 'dvc') {
                return (
                    <Container>
                        <Row>
                            <Col>
                                Defense system:
                            </Col>
                            <Col>
                                Attribute:
                            </Col>
                        </Row> <Row>
                        <Col className="col_s">
                            <ListItemIcon><BsShieldShaded className="icon_s"/>{this.props.itemsSelected[0].name}
                            </ListItemIcon>
                        </Col>
                        <Col className="col_s">
                            <ListItemIcon><SiHubspot className="icon_s"/>{this.props.itemsSelected[1].name}
                            </ListItemIcon>
                        </Col>
                    </Row>
                    </Container>
                )
            } else if (this.props.eventK == 'dvi') {
                return (
                    <Container>
                        <Row>
                            <Col>
                                Defense system:
                            </Col>
                            <Col>
                                Isolation Type:
                            </Col>
                        </Row> <Row>
                        <Col className="col_s">
                            <ListItemIcon><BsShieldShaded className="icon_s"/>{this.props.itemsSelected[0].name}
                            </ListItemIcon>
                        </Col>
                        <Col className="col_s">
                            <ListItemIcon><GiDrippingTube className="icon_s"/>{this.props.itemsSelected[1].name}
                            </ListItemIcon>
                        </Col>
                    </Row>
                    </Container>
                )
            }else if (this.props.eventK == 'dvcl') {
                return (
                    <Container>
                        <Row>
                            <Col>
                                Defense system:
                            </Col>
                            <Col>
                                Cluster:
                            </Col>
                        </Row> <Row>
                        <Col className="col_s">
                            <ListItemIcon><BsShieldShaded className="icon_s"/>{this.props.itemsSelected[0].name}
                            </ListItemIcon>
                        </Col>
                        <Col className="col_s">
                            <ListItemIcon><SiMicrogenetics className="icon_s"/>{this.props.itemsSelected[1].name} <BsFillCaretRightFill/> {this.props.itemsSelected[2].name}
                            </ListItemIcon>
                        </Col>
                    </Row>
                    </Container>
                )
            } else{
                return (
                    <Container>
                        <Row>
                            <Col>
                                Isolation Type:
                            </Col>
                            <Col>
                                Cluster:
                            </Col>
                        </Row> <Row>
                        <Col className="col_s">
                            <ListItemIcon><SiMicrogenetics className="icon_s"/>{this.props.itemsSelected[0].name}
                            </ListItemIcon>
                        </Col>
                        <Col className="col_s">
                            <ListItemIcon><GiDrippingTube className="icon_s"/>{this.props.itemsSelected[1].name} <BsFillCaretRightFill/> {this.props.itemsSelected[2].name}
                            </ListItemIcon>
                        </Col>
                    </Row>
                    </Container>
                )
            }
        }

        const noticeText = () => {
            if (this.props.eventK != 'dvc') {
                return (
                    <h6>Notice: The P-Value is based on the Hypergeometric test.</h6>
                )
            } else{
                return (
                <h6>Notice: The P-Value is based on the Mann-Whitney test.</h6>
                )
            }

        }

        return (
            <div>
                <FadeIn>

                    <div className="title_s">
                        <h1>Correlation Between:</h1>
                        <br/>
                        {corrText()}
                    </div>
                    {
                        getGraph()
                    }

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


                    </div>
                    {noticeText()}
                </FadeIn>
                <ErrorModalC open={false} ref={this.childErr}/>
            </div>
        );
    }
}

export default CorrelationGraph;