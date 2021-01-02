import NavBarC from "./components/NavBarC";
import './App.css';
import title from './assets/images/title.png';
import {BrowserRouter as Router} from "react-router-dom";


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img className="title" src={title}/>
                <div >
                    <Router>
                        <NavBarC />
                    </Router>
                </div>
            </header>
        </div>
    );
}
export default App;
