import React, {Component, useState, useRef} from "react";
import CircosStrain from "../components/CircosStrain";

export default function StrainCircosPage() {
    const [strainVariableName, setStrainName] = React.useState("")
    const [detailsTable, setDetailsTable] = React.useState([])
    const prevStrainName = usePrevious(strainVariableName)
    // Similar to componentDidMount and componentDidUpdate:

    React.useEffect(() => {
        // Update the document title using the browser API
        //setStrainName(this.props.history.location.state.strainVariableName);
        console.log(strainVariableName)
    });

    // Hook
    function usePrevious(value) {
        // The ref object is a generic container whose current property is mutable ...
        // ... and can hold any value, similar to an instance property on a class
        const ref = useRef();

        // Store current value in ref
        React.useEffect(() => {
            ref.current = value;
        }, [value]); // Only re-run if value changes

        // Return previous value (happens before update in useEffect above)
        return ref.current;
    }


    return(
        <div>

        </div>
    );
}

