import React, {Component} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row, Button} from "react-bootstrap";


class CSVorFastaC extends Component {

    state = {
        csv: true,
        prot: true
    };

    changeOptionFileType = () => {
        // setCsv(!csv)
        this.setState({csv: !this.state.csv})
    }

    changeOptionFastaType = () => {
        // setProt(!prot)
        this.setState({prot: !this.state.prot})
    }


    getCsv(){
        return this.state.csv;
    }

    getProt(){
        return this.state.prot;
    }

    render() {
        return (
            <div className="search-form">
                <Form>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Col sm={5}>
                                <Form.Check
                                    type="radio"
                                    label="CSV File"
                                    name="downloadoption"
                                    id="csvfile"
                                    defaultChecked={true}
                                    onChange={this.changeOptionFileType}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Fasta file"
                                    name="downloadoption"
                                    id="fastafile"
                                    onChange={this.changeOptionFileType}
                                />
                                <fieldset>
                                    <Form.Group style={{paddingLeft: '50px'}} as={Row}>
                                            <Form.Check
                                                type="radio"
                                                label="Fasta of Protein"
                                                name="fastoption"
                                                id="prot"
                                                disabled={this.state.csv}
                                                defaultChecked={this.state.csv}
                                                onChange={this.changeOptionFastaType}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Fasta of DNA"
                                                name="fastoption"
                                                id="dna"
                                                disabled={this.state.csv}
                                                onChange={this.changeOptionFastaType}
                                            />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                        </Form.Group>
                    </fieldset>
                </Form>
            </div>
        );
    }
}
export default CSVorFastaC;