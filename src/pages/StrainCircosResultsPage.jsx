import React, {Component, useState, useRef} from "react";
import CircosStrain from "../components/CircosStrain";

class StrainCircosResultsPage extends Component {

    state = {source: null};

    componentDidMount() {
    }

    render() {
        const svn = this.props.history.location.state.strainVariableName;
        return(
            <span>
                <CircosStrain svnn={svn} />
            </span>
        );
    }
}

export default StrainCircosResultsPage;