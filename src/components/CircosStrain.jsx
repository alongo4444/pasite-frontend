import React, {Component} from "react";
import axios from "axios";
import InnerHTML from 'dangerously-set-html-content'

class CircosStrain extends Component {
    state = {
        file: null,
        loaded: false
    };


    componentDidMount() {
        axios
            .get(
                "http://127.0.0.1:8801/api/v1/strains/strainCircos/" + this.props.svnn,
            )
            .then(response => {
                this.setState({file: response.data});
                this.setState({loaded: true})
            });

    }

    render() {
        // return (<iframe dangerouslySetInnerHTML={{ __html: this.state.file}}/>);

        return (
           // <div dangerouslySetInnerHTML={{ __html: this.state.file }}/>
             <InnerHTML html={this.state.file} />
        )
    }

}

export default CircosStrain;