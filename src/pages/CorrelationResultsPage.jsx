import React, {Component, useState, useRef} from "react";
import CorrelationGraph from "../components/CorrelationGraph";
import DefVSDef from "../components/CorrelationComponents/DefVSDef";
import DefVSIsoType from "../components/CorrelationComponents/DefVSIsoType";

class CorrelationResultsPage extends Component {

    state = {source: null};


    render() {
        const items = this.props.myArrayVariableName; // The items which were selected by the user in the CorrelationSearchPage
        const eventKey = this.props.eventK; //The current eventkey which were selected by the user in the CorrelationSearchPage

        const graphResults = () => {
            if(eventKey == 'first'){
                return ( <CorrelationGraph eventK={eventKey} itemsSelected={items}></CorrelationGraph>)
            } else if(eventKey == 'second'){

            } else if(eventKey=='third'){
                return ( <CorrelationGraph eventK={eventKey} itemsSelected={items}></CorrelationGraph>)

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