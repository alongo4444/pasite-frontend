import React, {Component, useState, useRef} from "react";
import CircosStrain from "../components/CircosStrain";
import axios from "axios";

class StrainCircosResultsPage extends Component {

    state = {source: null};

    componentDidMount() {
    }

    render() {
        const svn = this.props.history.location.state.strainVariableName;
        return(
            <div>
                <CircosStrain svnn={svn} />
            </div>
        );
    }
}

export default StrainCircosResultsPage;