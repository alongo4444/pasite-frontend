import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/StrainForm.css';
import DropdownCheckbox from "./DropdownCheckbox";


class IsolationType extends Component {

    constructor(props) {
        super(props);
        this.ddc = React.createRef();
    };

    render() {
        return (
            <div>
                Choose the Desired Isolation type:
                <br/><br/>
                <FadeIn>
                    <DropdownCheckbox ref={this.ddc} options={["Clinical", "Environment"]}/>
                </FadeIn>
            </div>
        )
    }
}
export default IsolationType;