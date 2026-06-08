import React from "react";
import { Search } from "lucide-react";
import useAdminForm from "../../../hooks/useAdminForm";

const SearchAndFilter = ({
  searchTerm,
  onSearch,
  pageSize,
  onPageSizeChange,
}) => {
  const { form } = useAdminForm();

  return (
    <div className="d-flex flex-wrap mb-3">
      <div
        className="input-group input-group-sm admin-search-group mb-2 mb-md-0"
        style={{ maxWidth: "300px" }}
      >
        <span className="input-group-text bg-white">
          <Search size={16} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={form.search_ph}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <select
        className="form-select form-select-sm mb-2 mb-md-0"
        value={pageSize}
        onChange={(e) => onPageSizeChange(e.target.value)}
        style={{ width: "auto" }}
      >
        <option value="5">{form.per_page_5}</option>
        <option value="10">{form.per_page_10}</option>
        <option value="25">{form.per_page_25}</option>
        <option value="50">{form.per_page_50}</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
