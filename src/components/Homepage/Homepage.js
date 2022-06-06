import { useEffect, useState, useRef } from "react";
import "./Homepage.css";
import Card from "../Card";
import SweetPagination from "sweetpagination";

const Homepage = () => {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState("");
    const [currentPageData, setCurrentPageData] = useState([]);
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
        const regionFilterValue =
            document.getElementById("select-region").value;
        if (regionFilterValue != "") {
            fetchCountries(
                `https://restcountries.com/v3.1/region/${regionFilterValue}`
            );
        }
    };

    const serachCountryByName = () => {
        const value = document.getElementById("search").value;
        if (value != "") {
            fetchCountries(`https://restcountries.com/v3.1/name/${value}`);
        }
    };

    return (
        <div className='container'>
            <select id='select-region' onChange={fetchByRegionHandler}>
                <option value=''>Filter by region</option>
                <option value='Africa'>Africa </option>
                <option value='America'>America</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
            </select>
            <form onSubmit={serachCountryByName} role='search'>
                {/* <label for='search'>Search for stuff</label> */}
                <input
                    id='search'
                    type='search'
                    placeholder='Search...'
                    required
                    onChange={serachCountryByName}
                />
                <button type='submit'>Go</button>
            </form>
            <div className='cards-wrapper'>
                {error && <p className='center error'> {error}</p>}
                {!error &&
                    currentPageData.map((country) => {
                        return <Card country={country} key={country.cca2} />;
                    })}
            </div>
            <div>
                <SweetPagination
                    currentPageData={setCurrentPageData}
                    dataPerPage={10}
                    getData={countries}
                    navigation={true}
                    getStyle={"style-1"}
                />
            </div>
        </div>
    );
};

export default Homepage;
