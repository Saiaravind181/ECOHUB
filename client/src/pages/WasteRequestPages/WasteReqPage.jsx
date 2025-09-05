import { useEffect, useState } from "react";
import { WasteRequestType } from "@abhiram2k03/punarnavah-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../utils/config";
import SearchBar from "../../components/SearchBar";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import { LoadingComp } from "../../components/LoadingComp";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";

export const WasteReqPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debug backend URL
  console.log("Backend URL:", backendUrl);
  console.log("Full API URL:", `${backendUrl}/api/v1/waste-req/unsatisfied`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Making request to:", `${backendUrl}/api/v1/waste-req/unsatisfied`);
        
        // First, test basic connectivity
        try {
          const testResponse = await axios.get(`${backendUrl}/api/v1/waste-req`, { timeout: 5000 });
          console.log("Basic connectivity test successful:", testResponse.status);
        } catch (testError) {
          console.error("Basic connectivity test failed:", testError.message);
        }
        
        const response = await axios.get(`${backendUrl}/api/v1/waste-req/unsatisfied`, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log("Full response:", response.data);
        console.log("Waste request data:", response.data.unsatisfiedRequests);
        console.log("First item structure:", response.data.unsatisfiedRequests[0]);
        console.log("Data length:", response.data.unsatisfiedRequests.length);
        
        if (response.data.unsatisfiedRequests && Array.isArray(response.data.unsatisfiedRequests)) {
          setData(response.data.unsatisfiedRequests);
        } else {
          console.error("Invalid data structure:", response.data);
          setData([]);
        }
      } catch (error) {
        console.error("Fetch error details:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: error.config
        });
        
        if (error.response?.status === 500) {
          setError("Server error occurred. Please try again later.");
        } else if (error.code === 'ECONNABORTED') {
          setError("Request timeout. Please check your connection.");
        } else {
          setError("An error occurred. Cannot fetch data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Debug useEffect to monitor data changes
  useEffect(() => {
    console.log("Data state changed:", data);
    console.log("Data type:", typeof data);
    console.log("Is array:", Array.isArray(data));
  }, [data]);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/waste-req-overview/${id}`);
  };

  // Temporarily disable search to debug rendering issue
  const filteredData = data; // data.filter((data) =>
    // data.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-2 sm:px-4 max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <LoadingComp/>
          </div>
        ) : error ? (
          <ErrorMsgComp error={error} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
            {console.log("Rendering with data:", data)}
            {console.log("Filtered data:", filteredData)}
            {console.log("Search query:", searchQuery)}
            {console.log("Data length:", data.length)}
            {console.log("Filtered data length:", filteredData.length)}
            
            {/* Always show data if available, regardless of search */}
            {data && data.length > 0 ? (
              data.map((item, index) => {
                console.log("Rendering item:", item);
                console.log("Item props:", {
                  id: item._id || item.id,
                  name: item.name,
                  description: item.description,
                  image: item.image
                });
                return (
                  <div key={index} className="flex justify-center">
                    <Card
                      id={item._id || item.id}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      linkText="View More"
                      handleCardClick={() => handleCardClick(item._id || item.id)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-center col-span-full">No waste requests available</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}; 