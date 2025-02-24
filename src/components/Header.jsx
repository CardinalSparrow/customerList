import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div className="ml-48 flex items-center p-5">
      <div className="relative flex w-1/2 justify-center rounded-lg items-center border-2">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute rounded-lg p-3 left-0 items-center"
        />
        <input type="text" placeholder="Search" className="my-2 mx-6 " />
      </div>
    </div>
  );
};

export default Header;
