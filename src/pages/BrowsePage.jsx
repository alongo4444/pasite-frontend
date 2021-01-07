import React, {Component} from "react";
import FadeIn from "react-fade-in";
import '../styles/ResultsPage.css'
import axios from "axios";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import IconButton from '@material-ui/core/IconButton';
import {ArrowsFullscreen, ZoomIn, ZoomOut} from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner'
import {Navigation} from 'react-minimal-side-navigation';
import Icon from "awesome-react-icons";


class ResultsPage extends Component {
    state = {
        source: [],
        loaded: false
    };

    componentDidMount() {
        axios
            .get(
                "http://127.0.0.1:8801/api/v1/strains/phyloTree",
                {responseType: 'arraybuffer'},
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({source: "data:;base64," + base64});
                this.setState({loaded: true})
            });
    }


    render() {

        return (
            <div>
                <FadeIn>
                    <div style={{overflow: "hidden"}}>
                        <>
                            <Navigation
                                // you can use your own router's api to get pathname
                                activeItemId="/management/members"
                                onSelect={({itemId}) => {
                                    // maybe push to the route
                                }}
                                items={[
                                    {
                                        title: 'Dashboard',
                                        itemId: '/dashboard',
                                        // you can use your own custom Icon component as well
                                        // icon is optional
                                        elemBefore: () => <Icon name="inbox"/>,
                                    },
                                    {
                                        title: 'Management',
                                        itemId: '/management',
                                        elemBefore: () => <Icon name="users"/>,
                                        subNav: [
                                            {
                                                title: 'Projects',
                                                itemId: '/management/projects',
                                            },
                                            {
                                                title: 'Members',
                                                itemId: '/management/members',
                                            },
                                        ],
                                    },
                                    {
                                        title: 'Another Item',
                                        itemId: '/another',
                                        subNav: [
                                            {
                                                title: 'Teams',
                                                itemId: '/management/teams',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </>
                        <TransformWrapper
                            defaultScale={1}
                            defaultPositionX={200}
                            defaultPositionY={100}
                        >
                            {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                                <React.Fragment>
                                    <div style={{marginLeft: "60%"}} className="tools">
                                        <IconButton onClick={zoomIn} color="primary" aria-label="upload picture"
                                                    component="span">
                                            <ZoomIn/>
                                        </IconButton>
                                        <IconButton onClick={zoomOut} color="primary" aria-label="upload picture"
                                                    component="span">
                                            <ZoomOut/>
                                        </IconButton>
                                        <IconButton onClick={resetTransform} color="primary" aria-label="upload picture"
                                                    component="span">
                                            <ArrowsFullscreen/>
                                        </IconButton>
                                    </div>
                                    {!this.state.loaded && (
                                        <div style={{marginLeft: "50%"}}><Spinner animation="border" variant="primary"/>
                                        </div>)}
                                    <TransformComponent>


                                        <img style={{height: "65%", width: "65%", marginLeft: "30%"}}
                                             src={this.state.source}/>
                                    </TransformComponent>
                                </React.Fragment>
                            )}
                        </TransformWrapper>
                    </div>
                </FadeIn>
            </div>
        )
    }

}

export default ResultsPage;