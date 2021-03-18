import React, {Component} from "react";
import axios from "axios";

class CircosStrain extends Component{
    //Defining initial state


    componentDidMount() {
        console.log(this.props.svnn)
    }

    render() {
        return (<div>
            <h1>{this.props.svnn}</h1>
        </div>);
    }
}

export default CircosStrain;