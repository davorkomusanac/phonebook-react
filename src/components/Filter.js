import React from "react";

const Filter = ({ newSearchTerm, handleSearchTermChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newSearchTerm} onChange={handleSearchTermChange} />
    </div>
  );
};

export default Filter;
