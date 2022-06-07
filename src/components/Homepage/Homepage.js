import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Card from "../Card";
import SweetPagination from "sweetpagination";
import { useContext } from "react";
import DarkThemContext from "../../store/dark-theme-context";

const Homepage = () => {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState("");
    const [currentPageData, setCurrentPageData] = useState([]);
    const navigate = useNavigate();
    const [darkModeActivated, setDarkModeActivated] = useState(
        JSON.parse(localStorage.getItem("dark-mode"))
    );

    const themeMode = useContext(DarkThemContext);

    useEffect(() => {
        setDarkModeActivated(JSON.parse(localStorage.getItem("dark-mode")));
    }, [darkModeActivated]);

    const fetchCountries = async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw response.status;
            }

            const countriesData = await response.json();
            let countriesAuXArray = [];

            for (var key in countriesData) {
                countriesAuXArray.push({
                    cca2: countriesData[key].cca2,
                    name: countriesData[key].name.common,
                    population: countriesData[key].population,
                    region: countriesData[key].region,
                    capital: countriesData[key].capital,
                    flag: countriesData[key].flags.svg,
                });
            }
            setCountries(countriesAuXArray);
        } catch (error) {
            setError("Something went wrong, status code: " + error);
        }
    };
    useEffect(() => {
        fetchCountries(`https://restcountries.com/v3.1/all`);
    }, []);

    const fetchByRegionHandler = () => {
        setError("");
        document.getElementById("search").value = ""; //reset search input
        const regionFilterValue =
            document.getElementById("select-region").value;
        if (regionFilterValue != "") {
            fetchCountries(
                `https://restcountries.com/v3.1/region/${regionFilterValue}`
            );
            navigate(`?region=${regionFilterValue}`);
        } else {
            navigate(`/`);
            fetchCountries(`https://restcountries.com/v3.1/all`);
        }
    };

    const serachCountryByName = () => {
        setError("");
        const value = document.getElementById("search").value; //reset select from regions
        document.getElementById("select-region").value = "";
        if (value != "") {
            fetchCountries(`https://restcountries.com/v3.1/name/${value}`);
            navigate(`#openseach`);
        } else {
            navigate(`/`);
            fetchCountries(`https://restcountries.com/v3.1/all`);
        }
    };

    return (
        <div>
            <div className='container'>
                <div className='panel-actions'>
                    <select id='select-region' onChange={fetchByRegionHandler}>
                        <option value=''>Filter by region</option>
                        <option value='Africa'>Africa </option>
                        <option value='America'>America</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                    <input
                        id='search'
                        type='search'
                        placeholder='Search...'
                        required
                        onChange={serachCountryByName}
                    />
                </div>

                <div className='cards-wrapper'>
                    {error && <p className='center error'> {error}</p>}
                    {!error &&
                        currentPageData.map((country) => {
                            return (
                                <Card country={country} key={country.cca2} />
                            );
                        })}
                </div>
                <div>
                    {!error && (
                        <SweetPagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={10}
                            getData={countries}
                            navigation={true}
                            getStyle={"style-1"}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
