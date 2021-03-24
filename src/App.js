import NavBarC from "./components/NavBarC";
import './App.css';
import title from './assets/images/title.png';
import {BrowserRouter as Router} from "react-router-dom";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img className="title" src={title}/>
                <div className="mainDiv">
                    <Router>
                        <NavBarC />
                    </Router>
                </div>
            </header>
        </div>
    );
}
export default App;
