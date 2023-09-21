import prevPageIcon from "assets/img/fa-icons/angle-left-solid.svg"
import firstPageIcon from "assets/img/fa-icons/angles-left-solid.svg"
import nextPageIcon from "assets/img/fa-icons/angle-right-solid.svg"
import lastPageIcon from "assets/img/fa-icons/angles-right-solid.svg"

type PaginateDataType = {
    from: number
    to: number
    total: number
    first_page: number
    current_page: number
    last_page: number
}

type PaginateType = {
    data : PaginateDataType
    isFirstPage: boolean
    isLastPage: boolean
    handleSearch: (id: number) => void;
}

export default function Paginate({ data, isFirstPage, isLastPage, handleSearch }: PaginateType) {
    return (
        <>
            <div className="paginate text-right font-bold mb-4">
                <div className="text mb-4">{data?.from}-{data?.to} of {data?.total}</div>
                <div className="btns">
                    <button
                        className="btn"
                        onClick={() => { handleSearch(data?.first_page); }}
                        title="First Page"
                        disabled={isFirstPage}
                    >
                        <img src={firstPageIcon} alt="First Page Icon" />
                    </button>
                    <button
                        className="btn"
                        onClick={() => { handleSearch(data?.current_page - 1); }}
                        title="Prev Page"
                        disabled={isFirstPage}
                    >
                        <img src={prevPageIcon} alt="Prev Page Icon" />
                    </button>


                    <button
                        className="btn"
                        onClick={() => { handleSearch(data?.current_page + 1); }}
                        title="Next Page"
                        disabled={isLastPage}
                    >
                        <img src={nextPageIcon} alt="Next Page Icon" />
                    </button>
                    <button
                        className="btn"
                        onClick={() => { handleSearch(data?.last_page); }}
                        title="Last Page"
                        disabled={isLastPage}
                    >
                        <img src={lastPageIcon} alt="Last Page Icon" />
                    </button>
                </div>
            </div>
        </>
    )
}