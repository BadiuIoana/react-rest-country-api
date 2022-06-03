import classes from "./CountryDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

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
    let tld_array;
    let flag;

    if (Object.keys(country).length > 0) {
        // const {
        //     name: {
        //         nativeName: {
        //             [Object.keys(name.nativeName)[0]]: {
        //                 official: native_name,
        //             },
        //         },
        //         official: official_name,
        //     },
        // } = country;

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
        <div className={classes.wrapper}>
            <p className={classes.error}>{error}</p>
            <button
                className={classes.btnTransparent}
                onClick={props.closeDetails}
            >
                <FontAwesomeIcon icon={faLeftLong} />
                <Link to='/'>ALL</Link>
            </button>
            {error == "" && (
                <div className={classes.content}>
                    <img src={flag} className={classes.flagImage} alt='' />
                    <div className={classes.textWrapper}>
                        <h1> {official_name}</h1>
                        <div className={classes.twoColsContent}>
                            <div>
                                <p>
                                    <b>Native name: </b>
                                    {native_name}
                                </p>
                                <div className={classes.flex}>
                                    <p>
                                        <b>TLD: </b>
                                    </p>
                                    <ul className={classes.details}>
                                        {tld_array}
                                    </ul>
                                </div>

                                <p>
                                    <b>Capital: </b>
                                    {capital}
                                </p>
                                <p>
                                    <b>Region: </b>
                                    {region}
                                </p>
                                <p>
                                    <b>Sub Region: </b>
                                    {subregion}
                                </p>
                                <p>
                                    <b>Population: </b>
                                    {population}
                                </p>
                            </div>
                            <div>
                                <div className={classes.flex}>
                                    <p>
                                        <b>Languages: </b>
                                    </p>
                                    <ul className={classes.details}>
                                        {languages}
                                    </ul>
                                </div>
                                {currencies && (
                                    <div className={classes.flex}>
                                        <p>
                                            <b>Currencies: </b>
                                        </p>
                                        <ul className={classes.details}>
                                            {currencies}
                                        </ul>
                                    </div>
                                )}
                                <div className={classes.flex}>
                                    <div>
                                        {borders != "" ? (
                                            <b>Neighbors: </b>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className={classes.buttonsWrapperFlex}>
                                        {borders}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryDetails;
