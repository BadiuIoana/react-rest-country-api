import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
const Navigation = () => {
    return (
        <div className='navigation'>
            <div className='wrapper'>
                <h1>Where in the world?</h1>
                <button>
                    <span>
                        <FontAwesomeIcon icon={faMoon} />
                    </span>
                    Dark Mode
                </button>
            </div>
        </div>
    );
};

export default Navigation;
