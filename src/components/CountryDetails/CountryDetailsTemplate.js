import classes from "./CountryDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const CountryDetailsTemplate = (props) => {
    return (
        <div className={classes.wrapper}>
            {props.error == "" && (
                <div className={classes.content}>
                    <img
                        src={props.flag}
                        className={classes.flagImage}
                        alt=''
                    />
                    <div className={classes.textWrapper}>
                        <h1> {props.official_name}</h1>
                        <div className={classes.twoColsContent}>
                            <div>
                                <p>
                                    <b>Native name: </b>
                                    {props.native_name}
                                </p>
                                <div className={classes.flex}>
                                    <p>
                                        <b>TLD: </b>
                                    </p>
                                    <ul className={classes.details}>
                                        {props.tld_array}
                                    </ul>
                                </div>

                                <p>
                                    <b>Capital: </b>
                                    {props.capital}
                                </p>
                                <p>
                                    <b>Region: </b>
                                    {props.region}
                                </p>
                                <p>
                                    <b>Sub Region: </b>
                                    {props.subregion}
                                </p>
                                <p>
                                    <b>Population: </b>
                                    {props.population}
                                </p>
                            </div>
                            <div>
                                <div className={classes.flex}>
                                    <p>
                                        <b>Languages: </b>
                                    </p>
                                    <ul className={classes.details}>
                                        {props.languages}
                                    </ul>
                                </div>
                                {props.currencies && (
                                    <div className={classes.flex}>
                                        <p>
                                            <b>Currencies: </b>
                                        </p>
                                        <ul className={classes.details}>
                                            {props.currencies}
                                        </ul>
                                    </div>
                                )}
                                <div className={classes.flex}>
                                    <div>
                                        {props.borders != "" ? (
                                            <b>Neighbors: </b>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className={classes.buttonsWrapperFlex}>
                                        {props.borders}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <p className={classes.error}>{props.error}</p>
            <button
                className={classes.btnTransparent}
                onClick={props.closeDetails}
            >
                <Link to='/'>
                    <FontAwesomeIcon icon={faLeftLong} />
                </Link>
            </button>
        </div>
    );
};

export default CountryDetailsTemplate;
