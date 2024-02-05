import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import viewCommentsPage from './components/pages/viewCommentsPage';

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
 
import HomePage from "./components/pages/homePage";
import LoginPage from "./components/pages/loginPage";
import AddCommentPage2 from "./components/pages/addCommentPage2";

import RecipeForm from "./components/pages/recipeForm";

import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";

import RecipeList from "./components/pages/recipeList";


import ViewCommentsPage from "./components/pages/viewCommentsPage"
//import landingpage

import { createContext, useState, useEffect } from "react";

import getUserInfo from "./utilities/decodeJwt";
 
export const UserContext = createContext();
 
const App = () => {
  const [user, setUser] = useState();
 
  useEffect(() => {
    setUser(getUserInfo());
  }, []);
    //Providing necessary components for navigation
  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
        <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/homePage" element={<HomePage />} />
          <Route exact path="/loginPage" element={<LoginPage />} />
          <Route exact path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/recipeForm" element={<RecipeForm />} />
          <Route exact path="/recipeList" element={<RecipeList />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
