import React, {memo, useState, useEffect} from "react";
import axios from "axios"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function PinCalendar(props) {
  const[announcements, setAnnouncements]=useState(null);
  const [date, onDate] = useState(new Date());
  const [pinDate, setPinDate]=useState(null);

  useEffect(
    ()=>{
        document.getElementsByClassName("react-calendar")[0].style.width="100%";
        getdata(date);
    },[]
  );

  async function getdata(dt){
    const response = await fetch('/api/pins?user_id='+props.userId);
    const data = await response.json();                                           //console.log(data);
    if(data.length){
      const pindate = new Date(data[0].date);
      const crtdate = new Date(dt);
      setPinDate(pindate);
      if(pindate.getDate()==crtdate.getDate()){
        const res = await fetch('/api/announcements?id='+data[0].announcement_id);
        const ann = await res.json();                                                 //console.log(ann);
        setAnnouncements(ann);
      }else{
        setAnnouncements([]);
      }
    }else setAnnouncements(null)
  }
  
  const onsubmit = (e)=>{
    e.preventDefault(); 
    if(confirm("Would you off pinned to calendar?"))
      axios
        .delete("/api/pins?user_id="+props.userId)
        .then((res)=>{
          setAnnouncements(null);          
          document.getElementById("Calendar").click();
        })
        .catch((e)=>{
          alert("Switch off  is failed.");
        })
  }

  function onchange(dt, e){ 
    getdata(dt)   
    onDate(dt);
  }
  return (
    <>
    <div className="w-full flex flex-col justify-center">
      <div className="m-10">
        <Calendar
            calendarType="US"
            onChange={onchange}
            value={date}
        />
      </div>
      <div className="mt-5">
        {!announcements ?
          <div 
            className="flex justify-center text-[20px] text-red-500"
          >There is not pinned to Calendar.</div>
          :
          announcements.length ?
            announcements.map((item, key)=>
              <div className="flex mb-5" key={key}> 
                <img className="w-[40px] h-[40px] mx-10" src={item.icon_url}/>
                <div>
                  <div className="font-bold mt-3 text-green-600">
                    {item.name}-
                    <small className="text-black">
                      {new Date(item.date).toDateString()}
                    </small>
                  </div>
                  <div className="m-3">
                    {item.content}
                  </div>
                  <form onSubmit={onsubmit}>
                    <small className="m-3 italic font-bold">
                      Discord Link - 
                      <button 
                        id="announcement_id"
                        className="font-bold text-blue-600 px-2 bg-[#fbcfe8] rounded-[20px] hover:text-[#6b21a8] shadow-lg active:shadow-cyan-500/50"
                        type="submit"
                        value={item.id}
                      >Switch Off Notifications</button>
                    </small>
                  </form>
                </div>
              </div>
            )
            :
            <>
              <div 
                className="flex justify-center text-[20px] text-green-500"
              >There is not the message pinned to date selected on Calendar.</div>
              <div 
                className="flex justify-center text-[20px]"
              >{`But a message is pinned to ${pinDate.toDateString()}.`}</div>
            </>
        }
      </div>
    </div>
    </>
  );
}
export default memo(PinCalendar);