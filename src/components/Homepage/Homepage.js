import { useEffect, useState, useMemo } from "react";
import useHttp from "../../hooks/use-http";
import Pagination from "../Pagination";
import "./Homepage.css";
import Card from "../Card";
let PageSize = 20;

const Homepage = (props) => {
    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading, error, sendRequest: fetchCountries } = useHttp();

    useEffect(() => {
        const transformCountriesData = (countriesData) => {
            countriesData.map((country) => {
                setCountries((prevState) => {
                    return [
                        ...prevState,
                        {
                            name: country.name.common,
                            nativeName: country.name.nativeName, // Obiect cu Obiecte
                            population: country.population,
                            region: country.region,
                            subregion: country.subregion,
                            capital: country.capital,
                            flag: country.flags.svg,
                            tld: country.tld, //array de string-uri
                            languages: country.languages, // Obiect, poate avea mai multe instante
                        },
                    ];
                });
            });
        };

        fetchCountries(
            {
                url: "https://restcountries.com/v3.1/all",
                headers: {
                    "Content-Type": "application/json",
                },
            },
            transformCountriesData
        );
    }, [fetchCountries]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return countries.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, countries]);

    return (
        <div className='container'>
            <div className='cards-wrapper'>
                {isLoading && <p className='center'> Loading ...</p>}
                {error && <p className='center error'> {error}</p>}
                {!isLoading &&
                    !error &&
                    currentTableData.map((country) => {
                        return (
                            <Card
                                country={country}
                                openDetails={props.openDetails}
                                closeDetails={props.closeDetails}
                                detailsForContry={props.detailsForContry}
                            />
                        );
                    })}
            </div>
            <Pagination
                className='pagination-bar'
                currentPage={currentPage}
                totalCount={countries.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Homepage;
