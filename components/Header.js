import React, {memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

const Header = (props) => {
  const [isActive, setActive] = useState(false);
  
  return (
    <nav className="flex bg-gray-50 py-3 items-center w-full shadow-lg">   
      <div className="mx-10 flex ">
        <div className="w-10 mx-3 p-1 text-white bg-blue-600 rounded-[14px]">
          <FontAwesomeIcon icon={faDiscord}/>
        </div>
        <div>David@outlook.com</div>
      </div>
      <div className="border-[1px] border-solid rounded-[20px] flex items-center p-1 w-2/3 m-auto">
        <div className="" aria-hidden="false" aria-describedby="searchResults" aria-labelledby="searchResults">
        </div>
        <span className="px-[7px]">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="rgba(8, 8, 8, 1)">
            <path d="M20.07 18.93l-4.16-4.15a6 6 0 1 0-.88.88l4.15 4.16a.62.62 0 1 0 .89-.89zM6.5 11a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0z"></path>
          </svg>
        </span>
        <input 
          id="search"
          type="text" 
          className="w-full mx-[5px] bg-transparent" 
          placeholder="Search"
          onChange={(e)=>props.setSearch(e.target.value)}
        />
      </div> 
      <div className="">  </div>
    </nav>
  );
};

export default memo(Header);
