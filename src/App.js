import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Fragment, useState } from "react";
import Homepage from "./components/Homepage/Homepage";
import CountryDetails from "./components/CountryDetails";

function App() {
    const [isDetailsPage, setDetailsPage] = useState(false);
    const [contryDetails, setCountryDetails] = useState({});
    const openDetailsContryHandler = () => {
        setDetailsPage(true);
    };

    const exitDetailsCountryHandler = () => {
        setDetailsPage(false);
    };

    return (
        <Fragment>
            <Navigation />
            {!isDetailsPage && (
                <Homepage
                    openDetails={openDetailsContryHandler}
                    detailsForContry={setCountryDetails}
                />
            )}
            {isDetailsPage && (
                <CountryDetails
                    closeDetails={exitDetailsCountryHandler}
                    country={contryDetails}
                />
            )}
        </Fragment>
    );
}

export default App;
