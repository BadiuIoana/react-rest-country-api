import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import DarkThemContext from "../../store/dark-theme-context";
const Navigation = () => {
    const themeMode = useContext(DarkThemContext);
    return (
        <div
            className={
                themeMode.darkModeActivated ? "navigation dark" : "navigation"
            }
        >
            <div className='wrapper'>
                <h1>Where in the world?</h1>
                <button onClick={themeMode.switchTheme}>
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
