import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Fragment, useState } from "react";
import Homepage from "./components/Homepage/Homepage";
import CountryDetails from "./components/CountryDetails";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
    const [isDetailsPage, setDetailsPage] = useState(false);
    const [contryDetails, setCountryDetails] = useState({});
    //    <Link to='/details'>About</Link>
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
