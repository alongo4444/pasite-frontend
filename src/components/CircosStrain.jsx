import React, {Component} from "react";
import '../styles/CircosStrain.css';

/**
 * the circos component (the genome html file)
 */
class CircosStrain extends Component {
    state = {
        file: null,
        loaded: false
    };


    render() {
        return (
            <iframe className="circosFrame" src={"http://127.0.0.1:8800/api/v1/strains/strainCircos/" + this.props.svnn} width="1000" height="1000" />
        )
    }

}

export default CircosStrain;