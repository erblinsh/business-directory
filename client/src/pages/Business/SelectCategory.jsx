import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deactiveCategoryName } from "../../redux/slices/activeCategorySlice";
import { changePaginationPageNumber } from "../../redux/slices/paginationSlice";

export const SelectCategory = ({otherCategories, handleFilterChange, filter}) => {
    const dispatch = useDispatch();

    const onSelectOption = (e) => {
        const selectedCategory = e.target.value;
        
        if(selectedCategory === "Other") { 
            const { CategoryName, ...rest } = filter;
            handleFilterChange(rest);
        } else {
            handleFilterChange({
                ...filter,
                PageNumber: 1,
                CategoryName: selectedCategory
            });
        }
        
        dispatch(deactiveCategoryName());
        dispatch(changePaginationPageNumber(1)); 
    }

    return (
        <Form.Select className="select-category" onChange={onSelectOption}>
            <option>Other</option>
            {otherCategories?.map((category, key) => (
                <option key={key} value={category.name}>
                    {category.name}
                </option>
            ))}
        </Form.Select>
    )
}
