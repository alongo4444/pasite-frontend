import React, {Component, useState, useRef} from "react";
import CorrelationGraph from "../components/CorrelationGraph";

class CorrelationResultsPage extends Component {

    state = {source: null};


    render() {
        const defSystems = this.props.history.location.state.myArrayVariableName;
        console.log(defSystems)
        return(
            <div>
            <CorrelationGraph defenseSystems={defSystems}></CorrelationGraph>
            </div>
        );
    }
}

export default CorrelationResultsPage;