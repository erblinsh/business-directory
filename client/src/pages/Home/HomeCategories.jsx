import { useState } from "react";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";
import { HomeCategoriesCard } from "./HomeCategoriesCard";

export const HomeCategories = () => {
    const [filters, setFilters] = useState({
        PageSize: 4
    });
    const {data: { result: categories } = {} } = useGetAllCategoriesQuery(filters)

    return (
        <div className="home-category">
            <h2 className="text-center my-5">Categories</h2>
            <HomeCategoriesCard categories={categories} />
        </div>
    )
}