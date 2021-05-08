import React, {Component} from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import '../styles/DefenseSystemStrain.css';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import {faDownload, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ErrorModalC from "../components/ErrorModalC";

class DefenseSystemStrain extends Component {
    state = {
        result_table: [],
    };
    constructor() {
        super();
        this.childErr = React.createRef();
    }
    componentDidMount() {
        axios
            .get(
                "http://127.0.0.1:8800/api/v1/strains/strainGenesDefSystems/"+this.props.svnn
            )
            .then(response => {
                this.setState({result_table: response.data})
            }).catch((err) => {
            console.log(err);
            if (this.childErr.current) {
                this.childErr.current.handleOpen();
            }});
    }
    render() {
        const { ExportCSVButton } = CSVExport;
        const columns = [
            {dataField: "locus_tag", text: "locus tag", sort: true},
            {dataField: "defense_system", text: "defense system ", sort: true},
            {dataField: "anti_crispr", text: "anti crispr", sort: true},
        ]

        return (
            <div>
                <FadeIn>
                    <div style={{height: "100%", width: "90%",marginLeft:"5%"}}>

                        <ToolkitProvider
                            keyField="id"
                            data={this.state.result_table}
                            columns={ columns }
                            exportCSV
                        >
                            {
                                props => (
                                    <div>
                                        <BootstrapTable  { ...props.baseProps }
                                                         pagination={paginationFactory({
                                                             sizePerPage: 50,
                                                             pageStartIndex: 1, // first page will be 0, default is 1
                                                             paginationSize: 10,  // the pagination bar size, default is 5
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
                                                         })}
                                        />
                                        <ExportCSVButton className="exportB" { ...props.csvProps }><FontAwesomeIcon icon={faDownload}/> Download to CSV</ExportCSVButton>
                                    </div>
                                )
                            }
                        </ToolkitProvider>

                        {/*<BootstrapTable*/}
                        {/*    keyField="locus_tag"*/}
                        {/*    data={this.state.result_table}*/}
                        {/*    columns={columns} //which columns from the data to show as columns*/}
                        {/*    pagination={paginationFactory({*/}
                        {/*        sizePerPage: 50,*/}
                        {/*        pageStartIndex: 1, // first page will be 0, default is 1*/}
                        {/*        paginationSize: 10,  // the pagination bar size, default is 5*/}
                        {/*        showTotal: true, // display pagination information*/}
                        {/*        firstPageText: '<<', // the text of first page button*/}
                        {/*        prePageText: 'Prev', // the text of previous page button*/}
                        {/*        nextPageText: 'Next', // the text of next page button*/}
                        {/*        lastPageText: '>>', // the text of last page button*/}
                        {/*        nextPageTitle: 'Go to next', // the title of next page button*/}
                        {/*        prePageTitle: 'Go to previous', // the title of previous page button*/}
                        {/*        firstPageTitle: 'Go to first', // the title of first page button*/}
                        {/*        lastPageTitle: 'Go to last', // the title of last page button*/}
                        {/*        hideSizePerPage: false, // hide the size per page dropdown*/}
                        {/*        hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false*/}
                        {/*    })}*/}
                        {/*/>*/}
                    </div>
                </FadeIn>
                <ErrorModalC open={false} ref={this.childErr}/>
            </div>
        )
    }

}

export default DefenseSystemStrain;