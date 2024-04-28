import { useEffect, useState } from "react";
import { useGetAllBusinessQuery } from "../../redux/api/businessApi"
import { BusinessCards } from "./BusinessCards";
import { CategoriesMenu } from "./CategoriesMenu";
import { Loader } from "../../helpers/Loader";
import { BusinessPagination } from "./BusinessPagination";
import { useSelector } from "react-redux";
import '../../styles/business.css'

export const Business = () => {
    const [activePage, setActivePage] = useState(1); 

    const { pageNumber, postPerPage } = useSelector(state => state.paginationSlice);

    let [filter, setFilter] = useState({
        PageNumber: activePage,
        PageSize: postPerPage
    });
    
    let { data: { result: businesses, length: allBusinessesLength } = {}, isLoading: businessIsLoading, isError, refetch } = useGetAllBusinessQuery(filter);

    const handleFilterChange = (e) => {
        if (e.PageNumber) {
            setActivePage(e.PageNumber);
        }
        setFilter(e);
    };

    useEffect(() => {
        setFilter(prevFilter => ({
            ...prevFilter,
            PageNumber: activePage,
            PageSize: postPerPage
        }));
    }, [activePage, postPerPage]);

    useEffect(() => {
        refetch(filter); 
    }, [filter]);

    if (businessIsLoading) return <Loader />;
    
    if (isError) return (
        <div className="d-flex justify-content-center">
            <h2 className="text-center mt-4">Something went wrong!</h2>
        </div>
    );

    return (
        <div>
            <CategoriesMenu handleFilterChange={handleFilterChange} filter={filter}/>
            <BusinessCards businesses={businesses} />

            <BusinessPagination activePage={activePage} 
                                setActivePage={setActivePage} 
                                totalBusinessLength={allBusinessesLength} 
                                handleFilterChange={handleFilterChange} />
        </div>
    );
};
