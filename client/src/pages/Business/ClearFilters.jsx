import { useDispatch, useSelector } from "react-redux"
import { deactiveCategoryName } from "../../redux/slices/activeCategorySlice";
import { changePaginationPageNumber } from "../../redux/slices/paginationSlice"; 

export const ClearFilters = ({handleFilterChange}) => {
    const { postPerPage } = useSelector(state => state.paginationSlice);

    const dispatch = useDispatch();

    const handleClick = () => {
        handleFilterChange({
            PageNumber: 1, 
            PageSize: postPerPage
        });
        dispatch(changePaginationPageNumber(1));
        dispatch(deactiveCategoryName());
    }

    return (
        <span className="d-flex justify-content-end px-5 cursor-pointer" 
                              style={{ cursor: "pointer" }}
                              onClick={handleClick}>
              Clear Filters
      </span>
    )
}
