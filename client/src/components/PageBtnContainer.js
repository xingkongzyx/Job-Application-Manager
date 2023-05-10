import { useAppContext } from "../context/appContext";
import {
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
} from "react-icons/hi";

import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useMemo } from "react";

const PageBtnContainer = () => {
    // 首先获取总的页数以及当前页数的数据
    const { numOfPages, page, changePage } = useAppContext();

    let pages = useMemo(() => {
        let pages = new Array(numOfPages);
        for (let i = 0; i < pages.length; i++) {
            pages[i] = i + 1;
        }
        return pages;
    }, [numOfPages]);

    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            newPage = numOfPages;
        }
        changePage(newPage);
    };
    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            newPage = 1;
        }
        changePage(newPage);
    };

    return (
        <Wrapper>
            <button className="prev-btn" onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>

            <div className="btn-container">
                {pages.map((pageNumber) => {
                    return (
                        <button
                            type="button"
                            className={
                                pageNumber === page
                                    ? "pageBtn active"
                                    : "pageBtn"
                            }
                            key={pageNumber}
                            onClick={() => changePage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button className="next-btn" onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
};

export default PageBtnContainer;
