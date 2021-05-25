import React, { Component } from "react";
import {Card, Carousel} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import '../styles/NavBarC.css';
import SearchPage from "../pages/SearchPage";
import ResultsPage from "../pages/ResultsPage";
import BrowsePage from "../pages/BrowsePage";
import DownloadPage from "../pages/DownloadPage";
import CorrelationResultsPage from "../pages/CorrelationResultsPage";
import CorrelationSearchPage from "../pages/CorrelationSearchPage"
import MainPage from "../pages/MainPage";
import StrainCircosResultsPage from "../pages/StrainCircosResultsPage"
import StrainCircosPage from "../pages/StrainCircosPage";
import { BrowserRouter as Switch } from "react-router-dom";
import { Route } from "react-router";

/**
 * the navigation bar component
 */
class NavBarC extends Component{
    state = {
        currPath: "/"
    };

    constructor(props) {
        super(props);
        this.state = {
            allProjects: JSON.parse(localStorage.getItem('allProjects')) || []
        }
    }


    render() {
        const changeSelected = (path) =>{
            // this.setState({currPath: path})
            this.setState({
                allProjects: path
            },() => {
                localStorage.setItem('allProjects', JSON.stringify(this.state.allProjects))
            });
        }

        return (
            <div >
            <Card className="card_m"  >
                <Card.Header style={{marginBottom: "2%"}}>
                    <Nav variant={"tabs"} fill activeKey={this.state.allProjects}>
                        <Nav.Item onClick={() => changeSelected("/")}>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() =>changeSelected("/search")}>
                            <Nav.Link href="/search">Search</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() =>changeSelected("/CircosStrain")}>
                            <Nav.Link href="/CircosStrain">Circos Strain View</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() =>changeSelected("/browse")}>
                            <Nav.Link href="/browse">Browse</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() =>changeSelected("/download")}>
                            <Nav.Link href="/download">Download</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => changeSelected("/CorrelationSearchPage")}>
                            <Nav.Link href="/CorrelationSearchPage">Correlation</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="body_c" style={{ minHeight:'600px', padding: '0px', marginBottom: "2%"}} >
                    <span className="cb">
                    <Card.Text>
                        <Switch>
                            <Route path="/search" component={SearchPage}/>

                            <Route path="/results" component={ResultsPage}/>

                            <Route path="/browse" component={BrowsePage}/>

                            <Route path="/download" component={DownloadPage}/>

                            <Route path="/CircosStrain" component={StrainCircosPage}/>

                            <Route path="/resultsCircosStrain" component={StrainCircosResultsPage}/>

                            <Route path="/CorrelationSearchPage" component={CorrelationSearchPage}/>

                            <Route path="/resultsCorrelationPage" component={CorrelationResultsPage}/>

                            <Route exact path="/">
                                <MainPage component={MainPage} />
                            </Route>
                        </Switch>
                    </Card.Text>
                        </span>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default NavBarC;