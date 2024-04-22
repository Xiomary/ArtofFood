import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  // Redirect to the login page as soon as the component mounts
  useEffect(() => {
    navigate('/loginPage');
  }, [navigate]);


  return null;
};

export default Landingpage;
