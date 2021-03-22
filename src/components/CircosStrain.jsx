import React, {Component} from "react";


class CircosStrain extends Component {
    state = {
        file: null,
        loaded: false
    };


    render() {
        return (
            <iframe src={"http://127.0.0.1:8801/api/v1/strains/strainCircos/" + this.props.svnn} width="1000" height="1000" />
        )
    }

}

export default CircosStrain;