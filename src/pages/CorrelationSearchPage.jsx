import React from "react";
import DefVSDef from "../components/CorrelationComponents/DefVSDef";
import DefVSIsoType from "../components/CorrelationComponents/DefVSIsoType";
import CorrelationResultsPage from "./CorrelationResultsPage";
import '../styles/CorrelationSearchPage.css'
import DrawerCorrelation from "../components/CorrelationComponents/DrawerCorrelation";
import DefVSCluster from "../components/CorrelationComponents/DefVSCluster";
import ClusterVSIsoType from "../components/CorrelationComponents/ClusterVSIsoType";
import DefVSCat from "../components/CorrelationComponents/DefVSCat";

/**
 * the Correlation Page - the search view
 */
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

        const currWindow = () => {
            if (this.state.results == false) {
                let currEvenKey = this.state.generateType  //holds the current eventKey of the tabs (which tab was selected last)
                if (currEvenKey == 'dvd') {
                    return (<DefVSDef parentCallback2={this.getParams}/>)
                } else if (currEvenKey == 'dvc') {
                    return (<DefVSCat parentCallback2={this.getTwoParams}/>)
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
                {currWindow()}

                <div className="sidebar" id="drawer">
                    <DrawerCorrelation generatingTypeHandler={this.generatingTypeHandler}/>
                </div>
            </div>
        );
    }
}

export default CorrelationSearchPage;