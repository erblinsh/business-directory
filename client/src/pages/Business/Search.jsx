import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../helpers/useDebounce";
import { IoIosSearch } from "react-icons/io";

export const Search = ({ handleFilterChange, filter }) => {
    const [searchInput, setSearchInput] = useState("");
    const [inputFocus, setInputFocus] = useState(false);

    const inputRef = useRef();
    
    const focus = () => {
        inputRef.current.focus();
    }

    const debounce = useDebounce(searchInput, 300);

    useEffect(() => {
        if (debounce.trim() !== "") {
            handleFilterChange(prev => ({
                ...prev,
                PageNumber: 1,
                Name: debounce
        }));
        } else {
            const { Name, ...rest } = filter;
            handleFilterChange(rest);
        }
    }, [debounce]);
    
    return (
        <div className={`search-business d-flex align-items-center ${inputFocus ? "search-active" : ""}`}>
            <input
                ref={inputRef}
                className="search-business-input" 
                placeholder="Search for business"
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <IoIosSearch onClick={focus} className="search-icon" />
        </div>
    )
}
