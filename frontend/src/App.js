import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/RegisterPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import RecipeForm from "./components/pages/RecipeForm";
import RecipeList from "./components/pages/RecipeList";
import RecipeDetails from "./components/pages/RecipeDetails";
import { createContext } from "react";
import getUserInfo from "./utilities/decodeJwt";
import SearchComponent from "./components/pages/SearchComponent";
//import star rating
import StarRating from "./components/pages/StarRatings";
import UserRecipes from "./components/pages/UserRecipes";
//import recipe edit form
import RecipeEditForm from "./components/pages/RecipeEditForm";
import RecipeCommentForm from "./components/pages/RecipeCommentForm";
export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/homePage" element={<HomePage />} />
        <Route exact path="/loginPage" element={<Login />} />
        <Route exact path="/privateUserProfile" element={<PrivateUserProfile />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/recipeForm" element={<RecipeForm />} />
        <Route exact path="/recipeList" element={<RecipeList />} />
        <Route exact path="/recipeDetails/:id" element={<RecipeDetails />} />
        <Route exact path="/searchComponent" element={<SearchComponent />} />
        <Route exact path="/ratingComponent/:id" element={<StarRating />} />
        <Route exact path="/recipeEdit/:id" element={<RecipeEditForm />} />
        <Route path="/addComment/:id" element={<RecipeCommentForm />} />

        
      </Routes>
    </>
  );
};

export default App;
