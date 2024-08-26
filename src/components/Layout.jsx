import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import FixedBottom from "./FixedBottom";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import en_data from "../lang/en";
import ch_data from "../lang/ch";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const {data: ads} = useFetch(BASE_URL + '/popup-ads-banner');

  const auth = localStorage.getItem("token");

  // const lan = localStorage.getItem('lan');



  // const [language, setLanguage] = useState("english");
  // useEffect(() => {
  //   setLanguage(lan);
  // }, [lan]);

  const navigate = useNavigate();

  // if(!auth){
  //   useEffect(() => {
  //     navigate('/login');
  //   }, [navigate, auth]);
  // }
  
  return (
    <AuthContextProvider>
    <div>
      {location.pathname === "/" && (
        <Header />
      )}
      <Modal
        className="adsModal"
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
      >
        <Modal.Header>
          <Modal.Title
            style={{ width: "100%" }}
            className="  d-flex justify-content-end"
          >
            <div
              onClick={() => setIsModalOpen(false)}
              className="modalCloseBtn cursor-pointer"
            >
              <CgClose color="black" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={ads?.img_url}
            className="popUpImg"
          />
        </Modal.Body>
      </Modal>
      <Navbar />
      <Outlet />
      <FixedBottom />
    </div>
    </AuthContextProvider>
  );
};

export default Layout;
