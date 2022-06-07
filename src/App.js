import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Fragment } from "react";
import Homepage from "./components/Homepage/Homepage";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
    return (
        <Fragment>
            <Navigation />
            <Router>
                <Routes>
                    <Route path='/:id' element={<CountryDetails />} />
                    <Route path='/' element={<Homepage />} />
                </Routes>
            </Router>
        </Fragment>
    );
}

export default App;
