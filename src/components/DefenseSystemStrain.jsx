import React, {Component} from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import '../styles/DefenseSystemStrain.css';


class DefenseSystemStrain extends Component {
    state = {
        result_table: [],
    };

    componentDidMount() {
        let svn = this.props.svnn;
        let params = { svn: svn }
        // axios
        //     .get(
        //         "http://127.0.0.1:8801/api/v1/strains/strainGenesDefSystems/"+this.props.svnn
        //     )
        //     .then(response => {
        //         this.setState({result_table: response.data})
        //     });

        const Qs = require('qs')
        let myAxios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })
        myAxios.get('http://127.0.0.1:8801/api/v1/strains/strainGenesDefSystems/',{params})
            .then((res) => {
                this.setState({result_table: res.data})
            }); // URL : https://path/to/api?foo=5&foo=2


    }
    render() {

        const columns = [
            {dataField: "locus_tag", text: "locus_tag", sort: true},
            {dataField: "defense_system", text: "defense_system ", sort: true},
            {dataField: "anti_crispr", text: "anti_crispr", sort: true},
        ]

        return (
            <div>
                <FadeIn>
                    <div style={{height: "100%", width: "90%",marginLeft:"5%"}}>
                        <BootstrapTable
                            keyField="locus_tag"
                            data={this.state.result_table}
                            columns={columns} //which columns from the data to show as columns
                            pagination={paginationFactory({
                                sizePerPage: 20,
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
                    </div>
                </FadeIn>
            </div>
        )
    }
}
export default DefenseSystemStrain;