import React from "react";

const Header = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <h1>Food Explorer</h1>
      <input
        type="text"
        placeholder="Search by name or barcode..."
        onChange={handleSearch}
      />
    </header>
  );
};

export default Header;
