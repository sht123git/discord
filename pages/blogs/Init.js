import React, {memo, useState, useEffect} from "react"
import web3 from "web3"
import axios from "axios";

function Init(props) {
  const [msg, setMSG]=useState("You are not the user that logged in via wallet.");
  const [ethmsg, setEthmsg]=useState("");
  const [isCheck, setIsCheck]=useState(0);
  let pay="none", address="";

  useEffect(
    ()=>{
      init();
    },[]
  );

  function init(){
    if(typeof ethereum !== 'undefined'){
      if((address = ethereum.selectedAddress)){                     //alert(address)
        axios
              .post("/api/users",{
                address:  address
              })
              .then(function(res){                                    //alert("insert:"+ res.data.insertId)
                props.setUserId(res.data.insertId);
                setMSG("You are the user that logged in via wallet");
              })
              .catch(function(error){
                axios
                      .get("/api/users?address="+address)
                      .then(function(res){
                        if(res.data.length){                            //alert("select:"+ res.data[0].id)
                          props.setUserId(res.data[0].id);
                          setMSG("You are the user that logged in via wallet");
                        }else{
                          setEthmsg("In database can't find user");
                        }
                      })
                      .catch(function(e){
                        setEthmsg("Site can't connect to MySQL.");  
                      });
              });
      }else{
        setEthmsg("Your wallet is not connected.");
      }
    }else{
      setEthmsg("MetaMask extension is not installed.");
    }
  }; 
  
  return (
    <div className="w-full ml-5">
      <div className="flex flex-col items-center justify-center h-screen bg-green-100" style={{ backgroundImage: "url('/herobg.png')" }}>
       <div className="text-[50px] text-blue-600 italic ">Welcome !</div>
       <div className="text-[20px]">{msg}</div>      
       <div className="text-[12px] text-red-600">{ethmsg}</div> 
      </div>
    </div>
  );
}
export default memo(Init);