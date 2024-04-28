import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactiveCategoryName } from '../../redux/slices/activeCategorySlice';
import { changePaginationPageNumber } from '../../redux/slices/paginationSlice'; 

export const ShownCategories = React.memo(({ shownCategories, handleFilterChange, filter }) => {
  const isCategoryActive = useSelector(state => state.activeCategory.activeCategoryName);
  const dispatch = useDispatch();

  const handleClick = (category) => {    
    if(category === null) { 
        const { CategoryName, ...rest } = filter;
        handleFilterChange(rest);

      } else {
        handleFilterChange({
            ...filter,
            PageNumber: 1,
            CategoryName: category.name
        });
    }
    
    dispatch(deactiveCategoryName());
    dispatch(changePaginationPageNumber(1)); 
}

  return (
    <>
      {shownCategories?.map((category, key) => (
        <span key={key} onClick={() => handleClick(category)} className={`category-name-on-menu ${isCategoryActive === category.name ? "active-category" : ""}`}>
          {category.name}
        </span>
      ))}
    </>
  );
});
