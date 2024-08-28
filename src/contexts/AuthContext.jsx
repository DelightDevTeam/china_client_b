import { createContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from "react-router-dom";
import en_data from "../lang/en";
import ch_data from "../lang/ch";

const AuthContext = createContext({
  auth: null,
  user: null,
  updateProfile: () => {},
  updateLanguage: () => {},
  content: null,
});

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const { data: userData, error } = useFetch(BASE_URL + "/user");
  const [profile, setProfile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [content, setContent] = useState(en_data);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setProfile(userData);
    }
  }, [userData]);

  useEffect(() => {
    const lan = localStorage.getItem("lan");
    if (lan) {
      setLanguage(lan);
    } else {
      setLanguage("en");
    }
  }, []);

  const updateProfile = (newProfile) => setProfile(newProfile);
  const updateLanguage = (newLanguage) => {
    if (newLanguage !== language) { // Only update if the new language is different
      let lan = localStorage.setItem("lan", newLanguage);
      // Use the newLanguage directly to determine the content
      setLanguage(newLanguage);
      if (newLanguage === "ch") {
        setContent(ch_data);
      } else {
        setContent(en_data);
      }
    }
  };

  useEffect(() => {
    if (language === "ch") {
      setContent(ch_data);
    } else {
      setContent(en_data);
    }
  }, [language])


  

  const value = useMemo(() => ({
    auth: token,
    user: profile,
    lan: language,
    content: content,
    updateProfile,
    updateLanguage,
  }), [token, profile, language]);



  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };