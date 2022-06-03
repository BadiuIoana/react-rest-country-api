import { useEffect, useState, useMemo } from "react";
import Pagination from "../Pagination";
import "./Homepage.css";
import Card from "../Card";
import SweetPagination from "sweetpagination";

let PageSize = 20;

const Homepage = (props) => {
    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");
    const [currentPageData, setCurrentPageData] = useState([]);
    console.log(currentPageData);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/all`
                );

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
        fetchCountries();
    }, []);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return countries.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <div className='container'>
            <div className='cards-wrapper'>
                {/* {isLoading && <p className='center'> Loading ...</p>} */}
                {error && <p className='center error'> {error}</p>}
                {!error &&
                    currentPageData.map((country) => {
                        return <Card country={country} key={country.cca2} />;
                    })}
            </div>
            {/* <Pagination
                className='pagination-bar'
                currentPage={currentPageData}
                totalCount={countries.length}
                pageSize={PageSize}
                key={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            /> */}
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
