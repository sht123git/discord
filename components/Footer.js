import Link from "next/link";
import React, {memo} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter,  faDiscord} from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <div className=" bg-gray-50 text-center text-[#000B33] text-sm py-7 flex justify-center items-center">
    <ul className="">
      <li className="w-4 ml-3 inline-block">
        <Link href="/">
          <a className="hover:text-[#FD4C5C]">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </Link>
      </li>Logo(Twitter)

      <li className="w-4 mx-3 inline-block">
        <Link href="/">
          <a className="hover:text-[#FD4C5C]">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </Link>
      </li>Logo(Discord)      
    </ul>
    Terms and Conditions Copyright @ [project name] 2021 All Rights Reserved
  </div>
);

export default memo(Footer);
