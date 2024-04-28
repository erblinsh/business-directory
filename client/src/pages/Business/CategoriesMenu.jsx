import { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";
import { SelectCategory } from "./SelectCategory";
import { ShownCategories } from "./ShownCategories";
import { Search } from "./Search";
import { Filters } from "./Filters";
import { ClearFilters } from "./ClearFilters";

export const CategoriesMenu = ({ handleFilterChange, filter }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const { data: { result: categoriesData } = {} } = useGetAllCategoriesQuery();

  const numberOfCategories = innerWidth > 768 ? 3 : 2;
  const shownCategories = categoriesData?.slice(0, numberOfCategories);
  const otherCategories = categoriesData?.slice(shownCategories.length, categoriesData.length);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return (
    <div className="container-fluid py-3 category-menu">

      <ClearFilters handleFilterChange={handleFilterChange}/>
      <Search handleFilterChange={handleFilterChange} filter={filter}/>

      <Filters handleFilterChange={handleFilterChange} filter={filter} />

      <div className="d-flex align-items-center justify-content-around py-3 px-1 category-menu-content">
        <ShownCategories shownCategories={shownCategories} handleFilterChange={handleFilterChange} filter={filter}/>
        <SelectCategory otherCategories={otherCategories} handleFilterChange={handleFilterChange} filter={filter}/>
      </div>

    </div>
  );
}
