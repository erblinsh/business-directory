import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { changePaginationPageNumber } from "../../redux/slices/paginationSlice";

export const BusinessPagination = ({activePage, setActivePage,totalBusinessLength, handleFilterChange}) => {
  const [items, setItems] = useState([]);

  const { pageNumber, postPerPage } = useSelector(state => state.paginationSlice);
  const dispatch = useDispatch();
  
  const pages = Math.ceil(totalBusinessLength / postPerPage);
  
  useEffect(() => {
      const newItems = [];
      for (let number = 1; number <= pages; number++) {
          newItems.push(
              <Pagination.Item key={number} active={number === activePage} onClick={() => changePageNumber(number)}>
                  {number}
              </Pagination.Item>
          );
      }
      setItems(newItems);
  }, [pages, activePage]);
  
  const changePageNumber = (number) => {
      setActivePage(number);
      handleFilterChange(prevFilter => ({ 
        ...prevFilter,
        PageNumber: number
    }));
      dispatch(changePaginationPageNumber(number));
  };

    return (
        <Pagination className="business-pagination">
            {
                activePage >= 2 &&
            <>
                <Pagination.Prev onClick={() => setActivePage(activePage -1)}/>
                <Pagination.Item onClick={() => changePageNumber(1)}>1</Pagination.Item>
            </>
            }
            {activePage > 2 && <Pagination.Ellipsis />}

            <Pagination.Item active>{activePage}</Pagination.Item>

            {activePage < (pages -1) && <Pagination.Ellipsis />}
            {activePage < pages && 
            <>
                <Pagination.Item onClick={() => changePageNumber(pages)}>{pages}</Pagination.Item>
                <Pagination.Next onClick={() => setActivePage(activePage +1)}/>
            </>
            }
        </Pagination>
    )
}