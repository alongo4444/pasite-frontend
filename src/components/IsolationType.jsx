import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import DropdownCheckbox from "./DropdownCheckbox";
import {AiFillCheckSquare} from 'react-icons/ai';
/**
 * the component of the isolation types
 */
class IsolationType extends Component {

    constructor(props) {
        super(props);
        this.ddc = React.createRef();
    };

    render() {
        return (
            <div className="rowC">
                <AiFillCheckSquare style={{marginTop: "1%"}}></AiFillCheckSquare>
                <span className="space">Showing Isolation Type distribution</span>
                {/*<br/><br/>*/}
                {/*<FadeIn>*/}
                {/*    <DropdownCheckbox ref={this.ddc} options={["Clinical", "Environment"]}/>*/}
                {/*</FadeIn>*/}
            </div>
        )
    }
}
export default IsolationType;