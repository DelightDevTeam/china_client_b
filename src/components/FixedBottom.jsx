import React, { useContext } from "react";
import { CiGrid31, CiHome } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { LuList, LuWallet2 } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const FixedBottom = () => {
  const { content } = useContext(AuthContext);
  const location = useLocation();
  const language = localStorage.getItem("lan");
  const items = [
    { id: 1, icon: <CiHome size={25} />, name: content?.home, link: "/" },
    {
      id: 2,
      icon: <LuWallet2 size={25} />,
      name: content?.wallet,
      link: "/exchange",
    },
    {
      id: 3,
      icon: <CiGrid31 size={25} />,
      name: content?.game_record,
      link: "/win-loss-report",
    },
    {
      id: 4,
      icon: <LuList size={25} />,
      name: content?.transaction_record,
      link: "/history",
    },
    {
      id: 5,
      icon: <FaUserCircle size={25} />,
      name: content?.profile,
      link: "/profile",
    },
  ];
  return (
    <div className="fixedBottom py-2 shadow-md px-2 px-sm-4 d-flex align-items-center justify-content-between">
      {items.map((item) => {
        return (
          <Link className="text-center" to={item.link} key={item.id}>
            <span className="mb-1 d-block">{item.icon}</span>

            <p className="fixedBottomTitle">{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default FixedBottom;
