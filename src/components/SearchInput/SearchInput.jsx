import { Close, Search } from "@mui/icons-material";
import { debounce } from "@mui/material";
import { useCallback, useState } from "react";

const SearchInput = ({ onChange }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    onDebounceSearch(value);
    setKeyword(value);
  };

  const onDebounceSearch = useCallback(
    debounce(async (searchVal) => {
      try {
        onChange(searchVal);
      } catch (error) {
        console.log(error);
      }
    }, 800)
  );

  const deleteKeyword = () => {
    setKeyword("");
    onChange("");
  };
  return (
    <div className="w-full bg-[#f1f3f4] text-[#6f6f70] py-2.5 px-[18px] rounded-[8px]">
      <div className="flex justify-between items-center">
        <div className="flex space-x-[18px] items-center">
          <Search style={{ color: "#6f6f70" }} />
          <input
            type="text"
            placeholder="Search.."
            onChange={handleSearch}
            value={keyword}
            className="bg-transparent"
          />
        </div>
        {keyword && (
          <button onClick={deleteKeyword}>
            <Close style={{ color: "#6f6f70" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
