import classes from "./CountryDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const CountryDetails = (props) => {
    console.log("enter");
    // console.log(props.country.languages);
    // for (let lan in props.country.languages) {
    //     console.log(lan);
    // }
    return (
        <div className={classes.wrapper}>
            <button
                className={classes.btnTransparent}
                onClick={props.closeDetails}
            >
                <FontAwesomeIcon icon={faLeftLong} />
                Back
            </button>

            <div className={classes.content}>
                <img src={props.country.flag} alt='' />
                <div className={classes.infoTwoCols}>
                    <p>
                        <b>Name:</b> {props.country.name}
                    </p>
                    <p>Region: {props.country.region}</p>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;
