import React, {Component} from "react";
import '../styles/SearchPage.css';
import {Form, Col, Row} from "react-bootstrap";
import AutocompleteC from "./AutocompleteC";
import Switch from "react-switch";
import BrowsePage from "../pages/BrowsePage";

//apiUrl - For the autocomplete: the url of the requested HTML call to the backend (i.e: http://127.0.0.1:8801/api/v1/strains). The backend need to return list of dictionaries in the format: [{name: "a", key: "0"},...]
//multipleChoice - For the autocomplete: determines the multiselect option, 'true' means multiselect enabled, 'false' otherwise.
//parentHandleTextBox - For the autocomplete: the callback that will be called in the parent which holds this component when the user chooses an option from the autocomplete component.
//parentFileChangeCallback -  the callback that will be called in the parent which holds this component when the user chooses a file. The file should contain the options with \n separating between them.
//label - the description of the component for the user

// export default function TextOrFileUpload({ apiUrl, parentFileChangeCallback, parentHandleTextBox,updateTextbox=null, multipleChoice, label, limit_length=0, parentCallbackLegnth=null}) {
//
//     const [textbox, setTextbox] = React.useState(true);
//     const [textOrFile, setTextOrFile] = React.useState('Text Box' );
//     const [autoCompleteC, clearAutoCompleteC] = React.useState(0);
//
//
//     const renderTextBox = () => {
//         if (textbox == true) {
//             return <AutocompleteC ref={autoCompleteC} multipleChoice={true} apiUrl={apiUrl}
//                                    parentCallback={(selected) => parentHandleTextBox(selected)} multipleChoice={multipleChoice} parentCallbackLegnth={parentCallbackLegnth} limit_length={limit_length}/>
//         } else {
//             return <Form.Group>
//                 <Form.File onChange={(e) => parentFileChangeCallback(e)} id="exampleFormControlFile1"
//                            label={label}/>
//             </Form.Group>;
//         }
//     }
//
//     function clearAutoComplete() {
//         clearAutoCompleteC();
//     }
//
//
//         React.useEffect(() => {
//             TextOrFileUpload.exposedFunction = ()=>{
//                 clearAutoComplete()
//             }
//             // or expose in the window object
//             // window.MyReactComponent = MyReactComponent
//         }, [])
//
//
//     /*
// update the state of the file upload/strain selection on change
//  */
//     const setSwitchTextBox = () => {
//         if (textbox == true) {
//             // this.setState({textbox: false}
//             setTextbox(false)
//             // this.setState({textOrFile: 'File Upload'});
//             setTextOrFile('File Upload')
//
//         } else {
//             // this.setState({textbox: true});
//             setTextbox(true)
//             // this.setState({textOrFile: 'Text Box'});
//             setTextOrFile('Text Box')
//         }
//     }
//
//     React.useEffect(() =>{
//         if (updateTextbox !=null) {
//             updateTextbox(textbox)
//         }
//     },[textbox])
//
//
//
//     return (
//
//         <div className="search-form">
//             <div className="textBox">
//                 <div className='rowC'>
//                     <Switch onChange={setSwitchTextBox} checked={textbox}/> <span
//                     className="switch">{textOrFile}</span>
//                 </div>
//                 <Form>
//                     {renderTextBox()}
//                 </Form>
//             </div>
//         </div>
//     );
// }
//

class TextOrFileUpload extends Component{



    constructor(props) {
        super(props)
        this.autoCompleteC = React.createRef()
        this.state = {
            textbox: true,
            textOrFile: "Text Box",
            ffKey: true
        }
        this.parentCallback = this.props.parentHandleTextBox.bind(this)
        this.parentCallbackLegnth = this.props.parentFileChangeCallback.bind(this);
    }

    clearAutoComplete() {
        if(this.autoCompleteC.current) {
            this.autoCompleteC.current.clearInput();
        }
        this.setState({ffKey: !this.state.ffKey})
    }



    render() {

        const renderTextBox = () => {
        if (this.state.textbox == true) {
            return <AutocompleteC disableCloseOnSelect = {true} ref={this.autoCompleteC} multipleChoice={true} apiUrl={this.props.apiUrl}
                                   parentCallback={(selected) => this.props.parentHandleTextBox(selected)} multipleChoice={this.props.multipleChoice} parentCallbackLegnth={this.props.parentCallbackLegnth} limit_length={this.props.limit_length}/>
        } else {
            return <Form.Group>
                <Form.File key={this.state.ffKey}onChange={this.props.parentFileChangeCallback} id="exampleFormControlFile1"
                           label={this.props.label}/>
            </Form.Group>;
        }
    }


            const setSwitchTextBox = () => {
        if (this.state.textbox == true) {
            // this.setState({textbox: false}
            // setTextbox(false)
            this.setState({textbox: false})
            // this.setState({textOrFile: 'File Upload'});
            // setTextOrFile('File Upload')
            this.setState({textOrFile: false})

        } else {
            // this.setState({textbox: true});
            this.setState({textbox: true})
            // this.setState({textOrFile: 'Text Box'});
            this.setState({textOrFile: 'Text Box'})
        }
    }


        return (<div className="search-form">
                         <div className="textBox">
                             <div className='rowC'>
                                <Switch onChange={setSwitchTextBox} checked={this.state.textbox}/> <span
                                className="switch">{this.state.textOrFile}</span>
                            </div>
                            <Form>
                                {renderTextBox()}
                            </Form>
                        </div>
                    </div>)
    }
}
export default TextOrFileUpload;


