import classes from "./Card.module.css";

const Card = (props) => {
    const setCountryHandeler = () => {
        props.detailsForContry(props.country);
        props.openDetails();
    };
    return (
        <div className={classes.card} onClick={setCountryHandeler}>
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
