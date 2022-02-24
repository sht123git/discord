import React, {memo, useState, useEffect} from "react";
import axios from "axios"

function Home(props) {
  const[announcements, setAnnouncements]=useState(null);
  let pre="", now="";

  useEffect(
    ()=>{
      getdata();
    }, []
  );

  function getdata(){
    if(!props.userId){    
      fetch('api/announcements?id=all')
      .then(response=>response.json())
      .then(data=>{
        const newdata=[], cnts=10, l=data.length-1, pr=[];
        for(let cnt=0; data.length && cnt<cnts; ){
          const p=Math.ceil(Math.random()*l);             //console.log(p)
          if(pr.indexOf(p) == -1){
            pr.push(p);
            newdata.push(data[p]);
            cnt++;
          }
        }
        setAnnouncements(newdata);                         //console.log("newdata", newdata);
      })
      .catch(e=>console.log(e));
    }else{ 
      fetch('/api/announcements',{
        method:"POST", 
        body: props.serverIds
      })
      .then(response=>response.json())
      .then(data=>{
        setAnnouncements(data);                            //console.log("data", data);        
      })
      .catch( e=> {
        setAnnouncements([]);
        console.log(e)
      });
    }
  }

  const onsubmit = (e)=>{
    e.preventDefault();
    if(!e.target.pin_date.value){
      alert("Select date for pin to calendar");
      return false;
    }    
    axios
      .get("/api/pins?user_id="+props.userId)
      .then((res)=>{
        if(res.data.length){
          if(confirm("Your account is Already pinned one message to calendar.\nWould you update with other message?")){
            axios
              .put("/api/pins",{
                user_id:          props.userId,
                announcement_id:  e.target.announcement_id.value,
                pin_date:             e.target.pin_date.value
              }
              )
              .then((res)=>{
                document.getElementById("Home").click();
              })
              .catch((e)=>{
                alert("Pin update to the calendar is failed.");
              })
          }
        }else{
          axios
            .post("/api/pins",{
              user_id:          props.userId,
              announcement_id:  e.target.announcement_id.value,
              pin_date:             e.target.pin_date.value
            })
            .then((res)=>{
              document.getElementById("Home").click();
            })
            .catch((e)=>{
              alert("Pinned to the calendar is failed.");
            })
        }
      })
  }
  return (
    <div className="w-full ">
      {!announcements ?
        <div 
          className="flex items-center h-screen justify-center text-[20px] text-blue-500 mt-[-20px]"
        >Please wait a moment.</div>
       :
       announcements.length ?
        announcements.map((item, key)=>
        <div className="mt-10" key={key} >
          {(now=new Date(item.date).toDateString()) != pre &&
            <>
              <hr className=" mb-5 mx-10"/>
              <div className="mt-[-33px]">
                <div 
                  className={item.other == "saw" ?
                            "w-[150px] bg-white m-auto text-[#7f1d1d]"
                            :
                            "w-[150px] bg-white m-auto text-[#7f1d1d] font-bold"
                          }
                >{now}</div>
              </div>
            </>
          }{!!(pre=new Date(item.date).toDateString())}
          <div className="flex mb-5"> 
            <img className="w-[40px] h-[40px] mx-10" src={item.icon_url}/>
            <div>
              <div className="font-bold mt-3 text-green-600">
                {item.name}
              </div>
              <div className="m-3">
                {item.content}
              </div>
              {props.userId &&
                <form onSubmit={onsubmit}>
                  <small className="m-3 italic font-bold">
                    Discord Link - 
                    <button 
                      id="announcement_id"
                      className="font-bold text-blue-600 px-2 bg-[#fbcfe8] rounded-[20px] hover:text-[#6b21a8] shadow-lg active:shadow-cyan-500/50"
                      type="submit"
                      value={item.id}
                    >Pin to Calendar</button>
                  </small>
                  <input id="pin_date" type="date"/>
                </form>
              }
            </div>
          </div>
        </div>
        )
        :
        <div 
          className="flex items-center h-screen justify-center text-[20px] text-green-500 mt-[-20px]"
        >Please select server name in Project page if you is user logged in.</div>
      }
    </div>
  );
}
export default memo(Home);