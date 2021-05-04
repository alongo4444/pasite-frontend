import React, {Component} from "react";
import '../styles/CircosStrain.css';

class CircosStrain extends Component {
    state = {
        file: null,
        loaded: false
    };


    render() {
        return (
            <iframe className="circosFrame" src={"https://paeruginosite.herokuapp.com/api/v1/strains/strainCircos/" + this.props.svnn} width="1000" height="1000" />
        )
    }

}

export default CircosStrain;