import React, { useEffect, useState } from "react";

const DarkThemContext = React.createContext({
    darkModeActivated: false,
    switchTheme: () => {},
});

export const DarkThemeContextProvider = (props) => {
    const [darkModeActivated, setDarkModeActivated] = useState(false);
    const switchDarkMode = () => {
        setDarkModeActivated((prevState) => !prevState);
    };

    useEffect(() => {
        localStorage.setItem("dark-mode", JSON.stringify(darkModeActivated));
        if (darkModeActivated) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkModeActivated]);

    return (
        <DarkThemContext.Provider
            value={{
                darkModeActivated: darkModeActivated,
                switchTheme: switchDarkMode,
            }}
        >
            {props.children}
        </DarkThemContext.Provider>
    );
};

export default DarkThemContext;
