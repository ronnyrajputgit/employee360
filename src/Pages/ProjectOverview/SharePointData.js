import { fetchSkillInventoryData } from "apis/sharepointApi";
import { listAllListsFromSite } from "apis/sharepointApi";
import { fetchCertificationTracker } from "apis/sharepointApi";
import React, { useState } from "react";

const SharePointData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");

    try {
      // const result = await listAllListsFromSite();
      const result2 = await fetchSkillInventoryData();
      // console.log(result);
      console.log(result2);
      setData(result2);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch SharePoint data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Certification Tracker</h2>
      <button onClick={handleFetch}>Fetch Data</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.fields?.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SharePointData;
