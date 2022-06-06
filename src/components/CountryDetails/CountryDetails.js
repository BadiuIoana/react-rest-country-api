import classes from "./CountryDetails.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import CountryDetailsTemplate from "./CountryDetailsTemplate";

const CountryDetails = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const cca2 = location.state.cca2;
    const [country, setCountry] = useState({});
    const [error, setError] = useState("");

    const fetchCountryHandler = useCallback(async () => {
        try {
            const response = await fetch(
                `https://restcountries.com/v3.1/alpha/${cca2}`
            );

            if (!response.ok) {
                throw response.status;
            }

            const data = await response.json();
            if (data !== undefined) {
                setCountry(data[0]);
            }
        } catch (error) {
            setError("Something went wrong, status code: " + error);
        }
    }, [cca2]);
    useEffect(() => {
        fetchCountryHandler();
    }, [cca2, fetchCountryHandler]);

    let {
        name,
        tld,
        flags,
        capital,
        region,
        subregion,
        population,
        languages,
        currencies,
        borders,
    } = country;
    let native_name;
    let official_name;
    let flag;
    let tld_array;

    if (Object.keys(country).length > 0) {
        native_name = name.nativeName[Object.keys(name.nativeName)[0]].common;
        official_name = name.official;
        flag = flags.png;

        tld_array = tld.map((tld) => <li>{tld}</li>);

        languages = Object.keys(languages).map((key, index) => (
            <li> {languages[key]} </li>
        ));

        currencies = currencies
            ? Object.keys(currencies).map((key, index) => (
                  <li> {currencies[key].name} </li>
              ))
            : "";

        borders = borders
            ? borders.map((neighbor) => (
                  <button
                      className={classes.btnTransparent}
                      onClick={() =>
                          navigate(`/${neighbor}`, {
                              state: { cca2: neighbor },
                          })
                      }
                  >
                      {neighbor}
                  </button>
              ))
            : "";
    }

    return (
        <CountryDetailsTemplate
            error={error}
            native_name={native_name}
            official_name={official_name}
            flag={flag}
            tld_array={tld_array}
            languages={languages}
            currencies={currencies}
            borders={borders}
            region={region}
            capital={capital}
            subregion={subregion}
            population={population}
        />
    );
};

export default CountryDetails;
