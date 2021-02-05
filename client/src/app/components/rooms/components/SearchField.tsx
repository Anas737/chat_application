import React from "react";

const SearchField = () => {
  return (
    <fieldset className="search-field">
      <div className="search-field__icon">
        <i className="fas fa-search"></i>
      </div>

      <input className="search-field__input" type="search" />
    </fieldset>
  );
};

export default SearchField;
