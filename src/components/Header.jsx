import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div className="ml-48 flex p-5 items-center">
      <div className="ml-40 relative flex w-1/2 justify-center rounded-lg  border-2">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute rounded-lg p-3 left-0 "
        />
        <input
          type="text"
          placeholder="Search customer details"
          className="my-2 mx-10 w-full border-none fo"
        />
      </div>
    </div>
  );
};

export default Header;
