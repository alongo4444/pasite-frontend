import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Form, Nav, Row, Tab} from "react-bootstrap";
import searchlogo from "../assets/images/research.png";
import {Link} from "react-router-dom";
import DefVSDef from "../components/CorrelationComponents/DefVSDef";
import StrainForm from "../components/StrainForm";
import GenesByClusterC from "../components/GenesByClusterC";
import CorrelationResultsPage from "./CorrelationResultsPage";


class CorrelationSearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: false, //flag to show if the result is shown or not
            params: [], //holds the params for the calculations in the result window
            key: 'first' //holds the current eventKey of the tabs (which tab was selected last)
        };
    };

    getParams = (params) => {
        this.setState({params: params})
        this.setState({results: true})
    }

    changeResults= () => {
        this.setState({results: false})
    }

    render() {

        const currWindow = () => {
            if(this.state.results == false) {
                let currEvenKey = this.state.key  //holds the current eventKey of the tabs (which tab was selected last)
                if(currEvenKey=='first') {
                    return (<DefVSDef parentCallback2={this.getParams}/>)
                } else if(currEvenKey=='second'){

                } else{

                }
            } else{
                return (<CorrelationResultsPage myArrayVariableName={this.state.params}/>)
            }
        }

        return (
            <div>
                <Tab.Container activeKey={this.state.key} onSelect={(k) => this.setState({key: k})} id="left-tabs-example" defaultActiveKey="first">
                    <h2>Correlation</h2>
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link onSelect={this.changeResults} eventKey="first">Defense System vs Defense System</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onSelect={this.changeResults}  eventKey="second">Genes by Defense System</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {currWindow()}
                                    {/*<DefVSDef/>*/}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {currWindow()}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
}

export default CorrelationSearchPage;