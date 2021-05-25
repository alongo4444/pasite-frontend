import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

class DropdownCheckbox extends React.Component {

    state = {selectedOptions: []};

    render() {
        return (
            <DropdownMultiselect
                options={this.props.options}
                name="dropdown"
                handleOnChange={(selected) => {
                    this.setState({selectedOptions: selected})
                }}
            />
        );
    }
}

export default DropdownCheckbox;