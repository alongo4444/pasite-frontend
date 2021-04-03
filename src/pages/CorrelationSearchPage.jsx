import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Form, Nav, Row, Tab} from "react-bootstrap";
import searchlogo from "../assets/images/research.png";
import {Link} from "react-router-dom";
import DefVSDef from "../components/CorrelationComponents/DefVSDef";
import DefVSIsoType from "../components/CorrelationComponents/DefVSIsoType";
import StrainForm from "../components/StrainForm";
import GenesByClusterC from "../components/GenesByClusterC";
import CorrelationResultsPage from "./CorrelationResultsPage";
import MiniDrawer from "../components/Drawer";
import '../styles/CorrelationSearchPage.css'
import DrawerCorrelation from "../components/CorrelationComponents/DrawerCorrelation";
import DefVSCluster from "../components/CorrelationComponents/DefVSCluster";
import ClusterVSIsoType from "../components/CorrelationComponents/ClusterVSIsoType";


class CorrelationSearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: false, //flag to show if the result is shown or not
            params: [], //holds the params for the calculations in the result window
            generateType: 'dvd' //holds the current eventKey of the tabs (which tab was selected last)
        };
    };

    getParams = (params) => {
        this.setState({params: params})
        this.setState({results: true})
    }

    getTwoParams = (param1, param2) => {
        this.setState({params: [param1[0], param2[0]]})
        this.setState({results: true})
    }

    getThreeParams = (param1, param2, param3) => {
        this.setState({params: [param1[0], param2, param3[0]]})
        this.setState({results: true})
    }

    changeResults = () => {
        this.setState({results: false})
    }

    generatingTypeHandler = Gtype => {
        this.changeResults()
        if (Gtype == "dvd") {
            this.setState({generateType: "dvd"})
        } else if (Gtype == "dvc") {
            this.setState({generateType: "dvc"})
        } else if (Gtype == "dvi") {
            this.setState({generateType: "dvi"})
        } else if (Gtype == "dvcl") {
            this.setState({generateType: "dvcl"})
        } else {
            this.setState({generateType: "clvi"})
        }
    }


    render() {

        // const currWindow = () => {
        //     if (this.state.results == false) {
        //         let currEvenKey = this.state.key  //holds the current eventKey of the tabs (which tab was selected last)
        //         if (currEvenKey == 'first') {
        //             return (<DefVSDef parentCallback2={this.getParams}/>)
        //         } else if (currEvenKey == 'second') {
        //
        //         } else {
        //             return (<DefVSIsoType parentCallback2={this.getTwoParams}/>)
        //         }
        //     } else {
        //         return (<CorrelationResultsPage eventK={this.state.key} myArrayVariableName={this.state.params}/>)
        //     }
        // }

        const currWindow = () => {
            if (this.state.results == false) {
                let currEvenKey = this.state.generateType  //holds the current eventKey of the tabs (which tab was selected last)
                if (currEvenKey == 'dvd') {
                    return (<DefVSDef parentCallback2={this.getParams}/>)
                } else if (currEvenKey == 'dvc') {

                } else if (currEvenKey == 'dvi') {
                    return (<DefVSIsoType parentCallback2={this.getTwoParams}/>)
                } else if (currEvenKey == 'dvcl') {
                    return (<DefVSCluster parentCallback2={this.getThreeParams}/>)
                } else if (currEvenKey == 'clvi') {
                    return (<ClusterVSIsoType parentCallback2={this.getThreeParams}/>)
                }

            } else {
                return (
                    <CorrelationResultsPage eventK={this.state.generateType} myArrayVariableName={this.state.params}/>)
            }
        }


        return (
            <div>
                {/*<Tab.Container activeKey={this.state.key} onSelect={(k) => this.setState({key: k})} id="left-tabs-example" defaultActiveKey="first">*/}
                {/*    <h2>Correlation</h2>*/}
                {/*    <Row>*/}
                {/*        <Col sm={2}>*/}
                {/*            <Nav variant="pills" className="flex-column">*/}
                {/*                <Nav.Item>*/}
                {/*                    <Nav.Link onSelect={this.changeResults} eventKey="first">Defense System vs Defense System</Nav.Link>*/}
                {/*                </Nav.Item>*/}
                {/*                <Nav.Item>*/}
                {/*                    <Nav.Link onSelect={this.changeResults}  eventKey="second">Category vs Defense System</Nav.Link>*/}
                {/*                </Nav.Item>*/}
                {/*                <Nav.Item>*/}
                {/*                    <Nav.Link onSelect={this.changeResults}  eventKey="third">Iso Type vs Defense System</Nav.Link>*/}
                {/*                </Nav.Item>*/}
                {/*            </Nav>*/}
                {/*        </Col>*/}
                {/*        <Col sm={10}>*/}
                {/*            <Tab.Content>*/}
                {/*                <Tab.Pane eventKey="first">*/}
                {/*                    {currWindow()}*/}
                {/*                </Tab.Pane>*/}
                {/*                <Tab.Pane eventKey="second">*/}
                {/*                    {currWindow()}*/}
                {/*                </Tab.Pane>*/}
                {/*                <Tab.Pane eventKey="third">*/}
                {/*                    {currWindow()}*/}
                {/*                </Tab.Pane>*/}
                {/*            </Tab.Content>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Tab.Container>*/}

                {currWindow()}

                <div id="drawer">
                    <DrawerCorrelation generatingTypeHandler={this.generatingTypeHandler}/>
                </div>
            </div>
        );
    }
}

export default CorrelationSearchPage;