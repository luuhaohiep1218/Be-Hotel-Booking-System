import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HotelBookingContext = createContext();

const HotelBookingProvider = ({ children }) => {
  const [account, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accountResponse = await axios.get("http://localhost:9999/accounts");
      setAccounts(accountResponse.data);
    };
    fetchData();
  }, []);

  return (
    <HotelBookingProvider value={{ getAccount }}>
      {children}
    </HotelBookingProvider>
  );
};
