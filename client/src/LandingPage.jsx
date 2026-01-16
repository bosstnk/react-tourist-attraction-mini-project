import axios from "axios";
import { useState, useEffect } from "react";
import LocationCard from "./components/LocationCard";

function LandingPage() {
  const [locations, setLocations] = useState([]);
  const [searchText,setSearchText] = useState("");
  const [tags, setTags] = useState([]);

  function handleTags(tag) {
    setTags((prev) =>
      prev.includes(tag)
      ? prev.filter((t) => t !== tag) 
      : [...prev, tag]
    );
  }
  
  async function getLocation() {
    try {
      const response = await axios.get(`http://localhost:4001/trips?keywords=${searchText}`);
      console.log(response.data.data);
      setLocations(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
  useEffect(() => {
    setSearchText(tags.join(" "));
  }, [tags]);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      getLocation();
    }else {
      getLocation();
    };
  }, [searchText]);

  return (
    <>
      <div className="px-[120px] pt-20">
        <h1 className="text-[#76b0d6] text-4xl font-bold text-center">
          เที่ยวไหนดี
        </h1>
        <div className="mt-5">
          <p>คนหาที่เที่ยว</p>
          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full text-lg text-center border-b border-b-gray-400 focus:outline-none focus:border-b focus:border-gray-700 focus:placeholder-transparent"
          />
        </div>
      </div>
      <div className="flex flex-col gap-12 pl-10 pr-20 py-10 max-w-7xl mx-auto">
        {locations.map((location) => (
          <LocationCard key={location.eid} location={location} selectedTags={tags} onTagClick={handleTags}/>
        ))}
      </div>
    </>
  );
}

export default LandingPage;
