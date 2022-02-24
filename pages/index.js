import { useState, useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router"
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BlogsSideBar from "./blogs/BlogsSideBar"
import Init from "./blogs/Init"
import Project from "./blogs/Project"
import Home from "./blogs/Home"
import PinCalendar from "./blogs/Calendar"
import Wallet from "./blogs/Wallet"
import About from "./blogs/About"
import Pricing from "./blogs/Pricing"
import settings from "../settings";

export default function Main() {
  const [isLoad, setIsLoad]=useState(true);
  const [pageMark, setPageMark]=useState("Init");
  const [search, setSearch]=useState("");
  const [serverIds, setServerIds]=useState([]);
  const [userId, setUserId]=useState(null);
  return (
    <>  
    {isLoad && 
      <div>  
        <Head>
          <title>Discord Announcement</title>
          <link rel="icon" href="/logo.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Header setSearch={setSearch}/>
        <div className="flex  flex-row ">
          <div className="w-1/6">
            <BlogsSideBar  userId={userId} setPageMark={setPageMark}  setSearch={setSearch}/>
          </div>
          <div className="w-5/6 min-h-screen">
            {pageMark === "Init" && <Init setUserId={setUserId}/>}
            {pageMark === "Project" && <Project userId={userId} serverIds={serverIds} search={search}/>}
            {pageMark === "Home" && <Home userId={userId} serverIds={serverIds}/>}
            {pageMark === "Calendar" && <PinCalendar userId={userId}/>}
            {pageMark === "Connect Wallet" && <Wallet/>}
            {pageMark === "About C 168" && <About/>}
            {pageMark === "Pricing" && <Pricing/>}
          </div>
        </div>
        
        <Footer />
      </div>
    }
    </>
  );
}

// export async function getServerSideProps(context) {
//   console.log("context => ", context);
//   const faqResponse = await fetch(`${settings.APIURL}/faqs`);
//   const faqData = await faqResponse.json();

//   return {
//     props: {
//       FAQ: faqData,
//       blogs: blogsData,
//     },
//   };
// }