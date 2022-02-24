import React, {memo, useState, useEffect} from "react"
import axios from "axios"

function Project(props) {
  const[servers, setServers]=useState([]);
  useEffect(
    ()=>{
      getdata();
    }, []
  );

  async function getdata(){
    const response = await fetch('/api/servers');
    const data = await response.json();                                         console.log(data);
    setServers(data);
  }

  const onchange = (e)=>{
    const v = e.target.value*1;
    if(e.target.checked){
      if(props.userId && props.serverIds.length>=5){
        e.target.checked=false;
        alert("You can't select more than 6 servers.");
      }else{
        props.serverIds.push(v);
      }
    }else{
      props.serverIds.splice(props.serverIds.indexOf(v),1);
    }
    //console.log(props.serverIds)
  }

  return (
    <>
    {servers.length ?
      <div className="w-full m-10">
        <div className="w-full mb-5 text-center text-[24px]">
          Server Name List
        </div>
        <div className="w-full flex flex-wrap">
          {[1,2].map((cnt, ckey)=>
            <ul className="w-full md:w-1/2 " key={ckey}>
              {servers.map((server, key)=> 
                ckey*servers.length/2<=key && key<(ckey+1)*servers.length/2 &&             
                <li className="flex items-center my-2" key={key}>
                  {props.userId &&
                    <input 
                      type="checkbox"
                      className="mx-3 w-[20px] h-[20px]"
                      value = {server.id}
                      defaultChecked = {props.serverIds.indexOf(server.id)!=-1?true:false}
                      onClick={onchange}
                    />
                  }
                  <img className="w-[30px] h-[30px] mx-3" src={server.icon_url}/>
                  <div className={`${server.name}`.startsWith(props.search) && props.search!="" ?
                    "w-5/6 text-[16px] text-lest  text-red-600"
                    :
                    "w-5/6 text-[16px] text-lest "}>
                    {server.name}
                  </div>
                </li>
              )}
            </ul>
          )}

        </div>
      </div>
      :
      <></>
    }
    </>
  );
}
export default memo(Project);