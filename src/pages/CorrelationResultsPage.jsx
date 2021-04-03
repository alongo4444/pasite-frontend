import React, {Component, useState, useRef} from "react";
import CorrelationGraph from "../components/CorrelationGraph";
import DefVSDef from "../components/CorrelationComponents/DefVSDef";
import DefVSIsoType from "../components/CorrelationComponents/DefVSIsoType";
import GraphDefVSIsoType from "../components/CorrelationComponents/GraphDefVSIsoType";

class CorrelationResultsPage extends Component {

    state = {source: null};


    render() {
        const items = this.props.myArrayVariableName; // The items which were selected by the user in the CorrelationSearchPage
        const eventKey = this.props.eventK; //The current eventkey which were selected by the user in the CorrelationSearchPage

        const graphResults = () => {
            if(eventKey == 'dvd'){
                return ( <CorrelationGraph eventK={eventKey} itemsSelected={items}></CorrelationGraph>)
            } else if(eventKey == 'dvc'){

            } else if(eventKey=='dvi'){
                return ( <CorrelationGraph eventK={eventKey} itemsSelected={items}/>)
            }
        }

        console.log(items)
        return(
            <div>
                {graphResults()}
            </div>
        );
    }
}

export default CorrelationResultsPage;