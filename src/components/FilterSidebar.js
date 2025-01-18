import React from "react";

const FilterSidebar = ({ categories, onFilter }) => {
  return (
    <aside className="filter-sidebar">
      <h3>Filter by Category</h3>
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </aside>
  );
};

export default FilterSidebar;
