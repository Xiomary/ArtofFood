import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/RegisterPage";
import PrivateUserProfile from "./components/pages/PrivateUserProfilePage";
import RecipeForm from "./components/pages/RecipeForm";
import RecipeList from "./components/pages/RecipeList";
import RecipeDetails from "./components/pages/RecipeDetails";
import getUserInfo from "./utilities/decodeJwt";
import SearchComponent from "./components/pages/SearchComponent";
import StarRating from "./components/pages/StarRatings";
import RecipeEditForm from "./components/pages/RecipeEditForm";
import RecipeCommentForm from "./components/pages/RecipeCommentForm";
import ProfileCreate from "./components/pages/ProfileCreate";
import ProfileDetailsPage from "./components/pages/ProfileDetailspage";
import ProfileUpdate from "./components/pages/ProfileUpdate";
import AdminDelete from "./components/pages/AdminDeleteUsers";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = getUserInfo();
    setUser(userData);
    setIsAdmin(userData?.isAdmin || false); 
  }, []);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="/recipeForm" element={<RecipeForm />} />
        <Route path="/recipeList" element={<RecipeList />} />
        <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
        <Route path="/searchComponent" element={<SearchComponent />} />
        <Route path="/ratingComponent/:id" element={<StarRating />} />
        <Route path="/recipeEdit/:id" element={<RecipeEditForm />} />
        <Route path="/addComment/:id" element={<RecipeCommentForm />} />
        <Route path="/profileCreate" element={<ProfileCreate />} />
        <Route path="/profileDetails/:userId" element={<ProfileDetailsPage />} />
        <Route path="/profileUpdate/:userId" element={<ProfileUpdate />} />
        <Route path="/adminDelete" element={<AdminDelete />} />
      </Routes>
    </>
  );
};

export default App;
