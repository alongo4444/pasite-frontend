import React, {Component} from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import '../styles/ResultsPage.css';
import {Button, Accordion, Card} from "react-bootstrap";
import {faDna, faDisease, faShieldVirus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ErrorModalC from "../components/ErrorModalC";

/**
 * Results Page after a search
 */
class ResultsPage extends Component {
    state = {
        result_table: []
    };
    constructor() {
        super();
        this.childErr = React.createRef();
    }
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8800/api/v1/genes")
            .then((res) => {
                this.setState({result_table: res.data});
                console.log(this.state.result_table)
            }).catch((err) => {
            this.setState({loaded: true})
            console.log(err);
            if (this.childErr.current) {
                this.childErr.current.handleOpen("There is a problem with the server request. We apologize for the inconvenience.");
            }});
    }

    render() {
        const params = this.props.history.location.state.myArrayVariableName; // get the selected items from the search page (sent from the SearchPage component)
        const rowsPerPages = this.props.history.location.state.rpp; // get the selected number of results each page from previous component

        const columns = [
            {dataField: "locus_tag", text: "locus_tag", sort: true},
            {dataField: "genomic_accession", text: "genomic accession", sort: true},
            {dataField: "start", text: "start", sort: true},
            {dataField: "end", text: "end", sort: true},
            {dataField: "strand", text: "strand", sort: true},
            {dataField: "name", text: "name", sort: true},
            {dataField: "symbol", text: "symbol", sort: true},
        ]

        const dna_char_to_color = {
            'A': '#DC185D',
            'E': '#B8144E',
            'G': '#93103E',
            'T': '#bc6383',
            'F': '#DC185D',
            'W': '#d01a5a',
            'S': '#8A0512',
            'M': '#9D0615',
            'K': '#B10618',
            'R': '#C5071A',
            'Y': '#D9081D',
            'B': '#EC091F',
            'D': '#F6132A',
            'I': '#F6132A',
            'C': '#bc6383',
            'H': '#F7263B',
            'V': '#F83A4D',
            'N': '#F83A4D',
            'L': '#F94E5F',
            'Q': '#FA7582',
            'P': '#d01a5a',
            'Z': '#370617'

        }

        const options = {
            pageStartIndex: 1, // first page will be 0, default is 1
            paginationSize: 10,  // the pagination bar size, default is 5
            sizePerPage: rowsPerPages,
            showTotal: true, // display pagination information
            firstPageText: '<<', // the text of first page button
            prePageText: 'Prev', // the text of previous page button
            nextPageText: 'Next', // the text of next page button
            lastPageText: '>>', // the text of last page button
            nextPageTitle: 'Go to next', // the title of next page button
            prePageTitle: 'Go to previous', // the title of previous page button
            firstPageTitle: 'Go to first', // the title of first page button
            lastPageTitle: 'Go to last', // the title of last page button
            hideSizePerPage: false, // hide the size per page dropdown
            hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
        }

        const expandRow = {
            renderer: (row, rowIndex) => {return (
                <div>

                    <Accordion defaultActiveKey={"0"}>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle className="acrd" as={Button} variant="link" eventKey="0">
                                    <FontAwesomeIcon icon={faDna}/> DNA Sequence
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body id="d-seq">
                                    {row['dna_sequence'].split("").map(char => {
                                        return <span className={"seq_c"}
                                                     style={{color: this.colorCharProtein(char)}}>{`${char}`}</span>;
                                    })}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    <FontAwesomeIcon icon={faDisease}/> Protein Sequence
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body id="p-seq">
                                    {row['protein_sequence'].split("").map(char => {
                                        return <span className={"seq_c"}
                                                     style={{color: dna_char_to_color[char]}}>{`${char}`}</span>;
                                    })}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                </div>
            )}, onlyOneExpanding: true
        };


        return (
            <div>
                <FadeIn>
                    <div style={{height: "100%", width: "90%",marginLeft:"5%"}}>
                        <BootstrapTable
                            keyField="locus_tag"
                            data={this.state.result_table}
                            columns={columns} //which columns from the data to show as columns
                            pagination={ paginationFactory(options) }
                            expandRow={expandRow}
                        />
                    </div>
                </FadeIn>
                <ErrorModalC open={false} ref={this.childErr}/>
            </div>
        )
    }

    colorCharProtein(char) {
        if (char == 'A')
            return 'red'
        else if (char == 'T') {
            return 'green'
        } else if (char == 'G') {
            return 'brown'
        }
        return 'blue'
    }
}

export default ResultsPage;