import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
    const { content, lan } = useContext(AuthContext);
    
    
    
  return (
    <>
      <div className="welcomeText   text-center py-2 text-white">
        {content?.greeting}
      </div>
    </>
  );
}
