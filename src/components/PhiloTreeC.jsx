import React, { Component } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import RBButton from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faArrowUp, faArrowDown, faArrowRight,
    faSortAmountUp, faAlignRight, faAlignLeft
} from "@fortawesome/free-solid-svg-icons";
import '../styles/PhiloTreeC.css';

import Phylotree from "./phylotreeFolder/phylotree.jsx";

import "../styles/phylotree.css";


function Button(props) {
    return (<OverlayTrigger
        placement="top"
        overlay={<Tooltip>
            {props.title}
        </Tooltip>}
    >
        <RBButton
            variant="secondary"
            {...props}
        >
            {props.children}
        </RBButton>
    </OverlayTrigger>);
}

function HorizontalExpansionButton(props) {
    return (<Button
        style={{ fontSize: 10 }}
        title="Expand horizontally"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faArrowLeft} />
        <FontAwesomeIcon key={2} icon={faArrowRight} />
    </Button>);
}

function HorizontalCompressionButton(props) {
    return (<Button
        style={{ fontSize: 10 }}
        title="Compress horizontally"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faArrowRight} />
        <FontAwesomeIcon key={2} icon={faArrowLeft} />
    </Button>);
}

function VerticalExpansionButton(props) {
    return (<Button
        style={{fontSize: 10, display: "flex", flexDirection: "column"}}
        title="Expand vertically"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faArrowUp} />
        <FontAwesomeIcon key={2} icon={faArrowDown} />
    </Button>);
}

function VerticalCompressionButton(props) {
    return (<Button
        style={{fontSize: 10, display: "flex", flexDirection: "column"}}
        title="Compress vertically"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faArrowDown} />
        <FontAwesomeIcon key={2} icon={faArrowUp} />
    </Button>);
}


function AscendingSortButton(props) {
    return (<Button
        title="Sort in ascending order"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faSortAmountUp} flip="vertical"/>
    </Button>);
}


function DescendingSortButton(props) {
    return (<Button
        title="Sort in descending order"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faSortAmountUp}/>
    </Button>);
}


function AlignTipsRightButton(props) {
    return (<Button
        title="Align tips to right"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faAlignRight}/>
    </Button>);
}


function AlignTipsLeftButton(props) {
    return (<Button
        title="Align tips to left"
        {...props}
    >
        <FontAwesomeIcon key={1} icon={faAlignLeft}/>
    </Button>);
}

/**
 * the phylogenetic tree component
 */
class PhiloTreeC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: null,
            width: 500,
            height: 500,
            alignTips: "right",
            sort: null,
            internal: false
        };
    }
    componentDidMount() {

    }
    toggleDimension(dimension, direction) {

        if(this.state[dimension] > 550 && direction == "expand"){
            return;
        }
        else if(this.state[dimension] < 430 &&  direction != "expand"){
            return;
        }
            const new_dimension = this.state[dimension] +
            (direction == "expand" ? 20 : -20),
            new_state = {};
        new_state[dimension] = new_dimension;
        this.setState(new_state);
    }
    handleSort(direction) {
        this.setState({sort: direction});
    }
    alignTips(direction) {
        this.setState({alignTips: direction});
    }
    render() {
        const { padding } = this.props;
        const { width, height } = this.state;
        return (<div style={{textAlign: "center"}}>
            <h3 className="title_tree">{this.props.title}</h3>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <ButtonGroup>
                    <HorizontalExpansionButton
                        onClick={()=>this.toggleDimension("width", "expand")} style={{ backgroundColor: "#6A5ACD"}}
                    />
                    <HorizontalCompressionButton
                        onClick={()=>this.toggleDimension("width", "compress")} style={{backgroundColor: "#6A5ACD"}}
                    />
                    <VerticalExpansionButton
                        onClick={()=>this.toggleDimension("height", "expand")} style={{backgroundColor: "#6A5ACD"}}
                    />
                    <VerticalCompressionButton
                        onClick={()=>this.toggleDimension("height", "compress")} style={{backgroundColor: "#6A5ACD"}}
                    />
                    <AscendingSortButton
                        onClick={()=>this.handleSort("ascending")} style={{backgroundColor: "#6A5ACD"}}
                    />
                    <DescendingSortButton
                        onClick={()=>this.handleSort("descending")} style={{backgroundColor: "#6A5ACD"}}
                    />
                    <AlignTipsLeftButton
                        onClick={()=>this.alignTips("left")} style={{backgroundColor: "#6A5ACD"}}
                    />
                    <AlignTipsRightButton
                        onClick={()=>this.alignTips("right")} style={{backgroundColor: "#6A5ACD"}}
                    />
                </ButtonGroup>
                {/*<div>*/}
                {/*    <input*/}
                {/*        type='checkbox'*/}
                {/*        onChange={()=>this.setState({internal: !this.state.internal})}*/}
                {/*    />*/}
                {/*    {this.state.internal ? 'Hide' : 'Show' } internal labels*/}
                {/*</div>*/}
            </div>
            <svg width={width} height={height}>
                <Phylotree
                    width={width-2*padding}
                    height={height-2*padding}
                    transform={`translate(${padding}, ${padding})`}
                    newick= {this.props.newick}
                    alignTips={this.state.alignTips}
                    sort={this.state.sort}
                    internalNodeLabels={this.state.internal}
                    includeBLAxis
                />
            </svg>
        </div>);
    }
}

PhiloTreeC.defaultProps = {
    padding: 10
};


export default PhiloTreeC;
