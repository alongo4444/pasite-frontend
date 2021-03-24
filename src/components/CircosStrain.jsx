import React, {Component} from "react";
import axios from "axios";
import InnerHTML from 'dangerously-set-html-content'

class CircosStrain extends Component {
    state = {
        file: null,
        loaded: false,
        head_scripts: null
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

        axios
            .get(
                "http://127.0.0.1:8801/api/v1/strains/strainCircosScripts/" + this.props.svnn,
            )
            .then(response => {
                this.setState({head_scripts: response.data.head});
                let arr = this.state.head_scripts;
                arr.forEach(function(entry) {
                    window.eval(entry)

                    // let script= document.createElement('script');
                    // script.text = entry;
                    // document.head.appendChild(script);

                });

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