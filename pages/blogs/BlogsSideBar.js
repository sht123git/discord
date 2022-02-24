import React, {memo, useState} from "react"
import axios from "axios"

const Pages = ["Project", "Home", "Calendar", "Connect Wallet", "About C 168", "Pricing"];
const cls = "opacity-100 text-[#1e40af] font-bold"

function BlogsSideBar(props) {
  const [btnPos, setBtnPos]=useState(-1);
  const [isPin, setPin]=useState(-1);

 async function onclick(e, key, page){
    if(!props.userId && page == "Calendar"){
      alert("You can't see Calendar page because you is not logged in user.");
      return;
    }
    setBtnPos(key);
    props.setPageMark(page);
    // props.setSearch("");  document.getElementById("search").value="";
    
    const response = await fetch('/api/pins?user_id='+props.userId);
    const data = await response.json();                                           console.log(data);
    if(data.length){
      const pindate = new Date(data[0].date);
      const crtdate = new Date();
      const diffDay = Math.ceil((pindate.getTime() - crtdate.getTime())/ (1000 * 3600 * 24));
      if(3 >= diffDay && diffDay >= 0)
      setPin(diffDay);
      else
        setPin(-1);
    }else{
      setPin(-1);
    }
  }
  
  return (
    <nav className="w-1/6  fixed">
      <ul className=" mt-10 mx-1 shadow-lg flex flex-col">
        {Pages.map((page, key)=>
          <li key={key}>
            <button
              id={page}      
              className={`${btnPos== key? cls:"opacity-50"} w-full text-[20px] text-left py-3  hover:opacity-100 cursor-pointer hover:text-[#1e40af]  text-center`}
              onClick={(e)=>onclick(e, key, page)}
            > 
              {page}{page=="Calendar" && isPin != -1 &&<small className="text-red-600 font-bold text-[20px] opacity-100"> ({isPin}) </small>}
            </button> 
            <hr/>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default memo(BlogsSideBar);