import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const API_BASE_URL = "/hiring_test";

const Map = () => {
  const [employees, setEmployees] = useState([]);
  const [activationCode, setActivationCode] = useState("");

  useEffect(() => {
    getActivationCode();
  }, []);

  const getActivationCode = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_activation_code`);
      setActivationCode(response.data.activationCode);
      fetchEmployees(response.data.activationCode);
    } catch (error) {
      console.error("Error getting activation code:", error);
    }
  };

  const fetchEmployees = async (activationCode) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_all_employee`, {
        activationCode,
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const mapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = {
    lat: 51.4545,
    lng: -2.5879,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAq_p-qa9mTOCaLeA4JuBMvfUClgHGjU8s">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
        {employees.map((employee, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(employee.latitude),
              lng: parseFloat(employee.longitude),
            }}
            label={employee.firstName}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
