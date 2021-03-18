import React, {Component} from "react";
import axios from "axios";

class CircosStrain extends Component{
    //Defining initial state
    state ={
        data : null
    }

    componentDidMount() {
        let html_file = axios
            .get(`localhost:8801/api/v1/strains/strainCircos/:strain_name`)
            .then(res => this.setState({ data: res.data }))
            .catch(err => console.log(err))
        this.setState({data:html_file})
    }

    render() {
        return (<div>
            
        </div>);
    }
}

export default CircosStrain;