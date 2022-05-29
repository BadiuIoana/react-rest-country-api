import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { usePagination, DOTS } from "../hooks/use-pagination";
import "./Pagination.css";
const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    // const addedActiveClass = (pageNr) => {
    //     var pageNumbers = document.getElementsByClassName("pagination-item");
    //     for (var i = 0; i <= pageNumbers.length - 1; i++) {
    //         pageNumbers[i].classList.remove("active");
    //         pageNumbers[pageNr].classList.add("active");
    //         console.log(pageNr);
    //     }
    // };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className='pagination-container'>
            <li className='pagination-item ' onClick={onPrevious}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </li>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return <li className='pagination-item dots'>&#8230;</li>;
                }

                return (
                    <li
                        className='pagination-item active'
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li className='pagination-item' onClick={onNext}>
                <FontAwesomeIcon icon={faAngleRight} />
            </li>
        </ul>
    );
};

export default Pagination;
