import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
    const navigate = useNavigate();
    const url = `/${props.country.cca2}`;
    return (
        <div
            className={classes.card}
            onClick={() =>
                navigate(url, {
                    state: { cca2: props.country.cca2 },
                    // Here, it must be state: {}, and in the given object we specify the values that we want to pass to the
                    // component which has this route in the App( or main class component)
                })
            }
        >
            <img src={props.country.flag} alt='' />
            <div className={classes.info}>
                <p>
                    <b>Title</b>: {props.country.name}
                </p>
                <p>
                    <b>Population</b>: {props.country.population}
                </p>
                <p>
                    <b>Region</b>: {props.country.region}
                </p>
                <p>
                    <b>Capital</b>: {props.country.capital}
                </p>
            </div>
        </div>
    );
};

export default Card;
