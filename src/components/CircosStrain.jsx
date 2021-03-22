import React, {Component, useEffect, useState} from "react";
import axios from "axios";

class CircosStrain extends Component {
    state = {
        file: null,
        loaded: false,
        scriptTxt: ""
    };


    componentDidMount() {
        axios
            .get(
                "http://127.0.0.1:8801/api/v1/strains/strainCircos/" + this.props.svnn,
            )
            .then(response => {
                this.setState({file: response.data});
                // this.setState({file: response.data});

                this.setState({loaded: true})

                let extractscript = /<script(.+)<\/script>/gi.exec(this.state.file);
                this.setState({file: this.state.file.replace(extractscript[0], "")});
                this.setState({scriptTxt: JSON.stringify(extractscript[1])})
                window.eval(extractscript[1]);

                console.log('a')

            });

        // const script = document.getElementById('circost').innerHTML;
        // window.eval(script);


    }

    render() {
        return (<iframe dangerouslySetInnerHTML={{ __html: this.state.file}}/>);

        return (
            <div>
                {/*{renderHTML(htmlString)}*/}
                {/*<div dangerouslySetInnerHTML={{__html: /'<iframe src=`${this.}'/>*/}
                {/*<script data-for="htmlwidget-7224326d117abd6ef328" className='structured-data-list'*/}
                {/*        type="application/json" dangerouslySetInnerHTML={ { __html: this.state.scriptTxt}} />*/}
                {/*//   <InnerHTML html={this.state.file} />*/}
            </div>
        )

    }

}

export default CircosStrain;

// export default function CircosStrain({svnn}) {
//     const [file, setFile] = useState(0);
//     const [loaded, setLoaded] = useState(false);
//     // Similar to componentDidMount and componentDidUpdate:
//     useEffect(() => {
//         // Update the document title using the browser API
//         axios
//             .get(
//                 "http://127.0.0.1:8801/api/v1/strains/strainCircos/" + svnn,
//             )
//             .then(response => {
//                 // this.setState({file: response.data});
//                 // this.setState({loaded: true})
//                 setFile(response.data)
//                 setLoaded(true)
//             });
//     });
//
//     return(
//         <div>
//             <InnerHTML html={file} />
//         </div>
//     )
// }

// export default class CircosStrain extends React.Component {
//
//         state = {
//         file: null,
//         loaded: false
//     };
//
//     constructor(props) {
//         super(props);
//     }
//
//     componentDidMount() {
//
//                 axios
//             .get(
//                 "http://127.0.0.1:8801/api/v1/strains/strainCircos/" + this.props.svnn,
//             )
//             .then(response => {
//                 this.setState({file: response.data});
//                 this.setState({loaded: true})
//             });
//
//
//         const s = document.createElement('script');
//         s.type = 'text/javascript';
//         s.async = true;
//         s.innerHTML = "document.write(alert('test'))";
//         this.instance.appendChild(s);
//     }
//
//     render() {
//         return (
//             <div>
//                 <div ref={el => (this.instance = el)} />
//             </div>
//         );
//     }
// }