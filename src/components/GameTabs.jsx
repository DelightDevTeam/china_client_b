import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { Link, useNavigate } from "react-router-dom";
import HotGames from "./HotGames";
import { AuthContext } from "../contexts/AuthContext";

const GameTabs = () => {
  const { content, auth } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("All Games");
  const navigate = useNavigate();
  const tabs = [
    {
      name: content?.all_games,
      value: "All Games"
    },
    {
      name: content?.hot_games,
      value: "Hot Games"
    },
    {
      name: content?.slot,
      value: "Slot"
    },
    {
      name: content?.casino,
      value: "Live Casino"
    },
    {
      name: content?.sports,
      value: "Sport Book"
    },
    {
      name: content?.fishing,
      value: "Fishing"
    },
  ];

  const { data: slotGame } = useFetch(BASE_URL + "/gameTypeProducts/1");
  const { data: casinoGame } = useFetch(BASE_URL + "/gameTypeProducts/2");
  const { data: sportGame } = useFetch(BASE_URL + "/gameTypeProducts/3");
  const { data: fishGame } = useFetch(BASE_URL + "/gameTypeProducts/4");
  const { data: hotGames } = useFetch(BASE_URL + "/hotgamelist");
  // console.log(hotGames);

  const slot_lists = slotGame && slotGame.game_type?.products;
  
  const slot_lobby = slotGame && slotGame.game_lobby?.products;
  const casinos_lists = casinoGame && casinoGame.game_type?.products;
  const casinos_lobby = casinoGame && casinoGame.game_lobby?.products;
  const sports_lists = sportGame && sportGame.game_type?.products;
  const sports_lobby = sportGame && sportGame.game_lobby?.products;
  const fish_lists = fishGame && fishGame.game_type?.products;
  const fish_lobby = fishGame && fishGame.game_lobby?.products;
  // console.log(fishGame?.game_type?.code);

  const launchGame = (t_code, p_code) => (e) => {
    e.preventDefault();
    if(!auth){
      navigate('/login');
      return;
    }
    let gameData = {
      productId: p_code,
      gameType: t_code,
    };
    fetch(BASE_URL + "/direct/Seamless/LaunchGame", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Launch Game failed");
        }
        console.log("Launch Game success");
        return response.json();
      })
      .then((data) => {
        window.open(data.Url, "_blank");
      })
      .catch((error) => {
        console.error("Launch Game error:", error);
      });
  };

  return (
    <div className="cursor-pointer mb-5 ">
      <div className="gameTitleContainer mt-4 mb-3 d-flex align-items-center gap-3 gap-sm-4">
        {tabs.map((tab, index) => {
          return (
            <p
              onClick={() => setSelectedTab(tab.value)}
              className={`${
                selectedTab === tab.value ? "activeGameTab" : ""
              } gameTitle fw-semibold`}
              key={index}
            >
              {tab.name}
            </p>
          );
        })}
      </div>
      {tabs.map((tab, index) => {
        <h5 className="fw-bold" key={index}>{selectedTab === tab.value ? tab.name : ""}</h5>
      })
      }
      
      {selectedTab === "All Games" && (
        <>
          <h5 className="fw-bold mb-2 "> {content?.slot}</h5>
          <div className="row px-2">
            {slot_lists &&
              slot_lists.map((item, index) => {
                return (
                  <Link
                    to={"/games/" + item.id + "/" +  slotGame?.game_type?.code}
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            {slot_lobby &&
              slot_lobby.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                    onClick={launchGame(slotGame.game_lobby?.code, item.id)}
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </div>
                );
              })}
          </div>
          <h5 className="fw-bold mb-2 mt-4"> {content?.casino}</h5>
          <div className="row px-2">
            {casinos_lists &&
              casinos_lists.map((item, index) => {
                return (
                  <Link
                    to={"/games/" + item.id + "/" + casinoGame?.game_type?.code}
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            {casinos_lobby &&
              casinos_lobby.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                    onClick={launchGame(casinoGame.game_lobby?.code, item.id)}
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </div>
                );
              })}
          </div>
          <h5 className="fw-bold mb-2  mt-4">{content?.sports}</h5>
          <div className="row px-2">
            {sports_lists &&
              sports_lists.map((item, index) => {
                return (
                  <Link
                    to={"/games/" + item.id + "/" + sportGame?.game_type?.code}
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            {sports_lobby &&
              sports_lobby.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                    onClick={launchGame(sportGame.game_lobby?.code, item.id)}
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </div>
                );
              })}
          </div>
          <h5 className="fw-bold mb-2  mt-4">{content?.fishing}</h5>
          <div className="row px-2">
            {fish_lists &&
              fish_lists.map((item, index) => {
                return (
                  <Link
                    to={"/games/" + item.id + "/" + fishGame?.game_type?.code}
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            {fish_lobby &&
              fish_lobby.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                    onClick={launchGame(fishGame.game_lobby?.code, item.id)}
                  >
                    <img
                      src={item.imgUrl}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
       {selectedTab === "Hot Games" && (
        <HotGames hotGames={hotGames} />
        )}
      {selectedTab === "Slot" && (
        <div className="row px-2">
          {slot_lists &&
            slot_lists.map((item, index) => {
              return (
                <Link
                  to={"/games/" + item.id + "/" + slotGame?.game_type?.code}
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </Link>
              );
            })}
          {slot_lobby &&
            slot_lobby.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  onClick={launchGame(slotGame.game_lobby?.code, item.id)}
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {selectedTab === "Live Casino" && (
        <div className="row px-2">
          {casinos_lists &&
            casinos_lists.map((item, index) => {
              return (
                <Link
                  to={"/games/" + item.id + "/" + casinoGame?.game_type?.code}
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </Link>
              );
            })}
          {casinos_lobby &&
            casinos_lobby.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  onClick={launchGame(casinoGame.game_lobby?.code, item.id)}
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {selectedTab === "Sport Book" && (
        <div className="row px-2">
          {sports_lists &&
            sports_lists.map((item, index) => {
              return (
                <Link
                  to={"/games/" + item.id + "/" + sportGame?.game_type?.code}
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </Link>
              );
            })}
          {sports_lobby &&
            sports_lobby.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  onClick={launchGame(sportGame.game_lobby?.code, item.id)}
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {selectedTab === "Fishing" && (
        <div className="row px-2">
          {fish_lists &&
            fish_lists.map((item, index) => {
              return (
                <Link
                  to={"/games/" + item.id + "/" + fishGame?.game_type?.code}
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </Link>
              );
            })}
          {fish_lobby &&
            fish_lobby.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ position: "relative" }}
                  className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                  onClick={launchGame(fishGame.game_lobby?.code, item.id)}
                >
                  <img
                    src={item.imgUrl}
                    className="img-fluid gameImg rounded-3"
                  />
                  <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                    {item.name}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default GameTabs;
