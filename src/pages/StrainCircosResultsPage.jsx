import React, {Component, useState, useRef} from "react";
import CircosStrain from "../components/CircosStrain";
import DefenseSystemStrain from "../components/DefenseSystemStrain";

class StrainCircosResultsPage extends Component {

    state = {source: null};

//
    render() {
        const svn = this.props.history.location.state.strainVariableName;
        return(
            <div>
                <CircosStrain svnn={svn} />
                <DefenseSystemStrain svnn={svn}/>
            </div>
        );
    }
}

export default StrainCircosResultsPage;