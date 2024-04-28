import { Form } from "react-bootstrap";

export const Filters = ({handleFilterChange, filter}) => {
    const onSelectOption = (e) => {
        const selectedCategory = e.target.value;
        
        if(selectedCategory === "Filters") {
            const { SortBy, ...rest } = filter;
            handleFilterChange(rest);
        } else {
            handleFilterChange(prevFilter => ({ 
                ...prevFilter,
                SortBy: selectedCategory
             }))
        }
    }

    return (
        <div className="filters">
            <Form.Select className="form-select filter-form-select" onChange={onSelectOption}>
                <option>Filters</option>
                <option value="name">Order By Name</option>
            </Form.Select>
        </div>
    )
}