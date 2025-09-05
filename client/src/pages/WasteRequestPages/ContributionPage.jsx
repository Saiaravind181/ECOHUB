import { UploadContributionType } from "@abhiram2k03/punarnavah-common";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputBox } from "../../components/InputBox";
import { Button } from "../../components/Button";
import axios from "axios";
import { backendUrl } from "../../utils/config";
import Lottie from "lottie-react";
import animationData from '../../assets/lottie/contribute.json';
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { LoadingComp } from "../../components/LoadingComp";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";

export const ContributionPage = () => {
  const [data, setData] = useState({
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 0,
    wasteRequestId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id: wasteRequestId = "" } = useParams();
  
  // Debug ID parameter
  console.log("ContributionPage - wasteRequestId:", wasteRequestId);
  console.log("ContributionPage - useParams result:", useParams());

  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to make a contribution");
      navigate("/signin");
      return;
    }

    // Validate wasteRequestId when component mounts
    if (!wasteRequestId || wasteRequestId === "undefined") {
      toast.error("Invalid waste request ID. Redirecting to waste requests page.");
      setTimeout(() => {
        navigate("/waste-req");
      }, 2000);
      return;
    }

    setData((prevData) => ({
      ...prevData,
      wasteRequestId,
    }));
  }, [wasteRequestId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: name === "quantity" ? Number(value) : value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Validate wasteRequestId
    if (!wasteRequestId || wasteRequestId === "undefined") {
      toast.error("Invalid waste request ID. Please go back and try again.");
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting contribution with data:", data);
      console.log("Waste request ID:", wasteRequestId);
      console.log("API URL:", `${backendUrl}/api/v1/contributions/${wasteRequestId}`);
      
      // Get authentication token
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to make a contribution");
        navigate("/signin");
        setLoading(false);
        return;
      }
      
      const response = await axios.post(
        `${backendUrl}/api/v1/contributions/${wasteRequestId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        toast.success("Contributed Successfully");
        navigate(`/waste-req-overview/${wasteRequestId}`);
      }
      else {
        console.error("Error occurred", response.data.error[0].message);
        toast.error(response.data.error[0].message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please login to continue.");
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        const errorMessage =
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred";
        toast.error(errorMessage);
      }
      console.error("Error occurred", error);
      setError("Request creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
            <LoadingComp/>
          </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Left Section */}
        <div className="lg:w-1/2 p-4 md:p-8  flex flex-col justify-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              JOIN THE CIRCULAR ECONOMY TODAY
            </h2>
            <p className="text-gray-600 mb-6">
              Your Contribution helps artisans to create beautiful products from waste materials.
              You can earn rewards for your contribution.
            </p>
            <div className="w-full max-w-md mx-auto">
              <Lottie animationData={animationData} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 p-4 md:p-8 flex items-center">
          <div className="w-full max-w-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Be a Contributor
            </h1>

            <div className="space-y-4">
              <InputBox
                label="Phone number"
                type="number"
                placeholder="Phone number"
                name="mobile"
                onChange={handleChange}
              />

              <InputBox
                label="Address"
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputBox
                  label="City"
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                />
                <InputBox
                  label="State"
                  type="text"
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                />
                <InputBox
                  label="Pincode"
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  onChange={handleChange}
                />
              </div>

              <InputBox
                label="Quantity"
                type="number"
                placeholder="Quantity"
                name="quantity"
                onChange={handleChange}
              />

              <div className="flex justify-center mt-6">
                <Button
                  text="Submit Contribution"
                  onClick={handleSubmit}
                />
              </div>

              <ErrorMsgComp error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 