import React from 'react'
import { Link } from 'react-router-dom';
import BASE_URL from '../hooks/baseURL';

export default function HotGames({hotGames}) {

    // console.log(hotGames);
    const launchGame = (p_code, t_code, g_code) => (e) => {
        e.preventDefault();

        let gameData = {
          "productId" : p_code,
          "gameType" : t_code,
          "gameId": g_code
        }
        // console.log(gameData)
        // return

        fetch(BASE_URL + "/game/Seamless/LaunchGame", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(gameData)
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Launch Game failed");
              }
              console.log("Launch Game success");
              return response.json();
          })
          .then((data) => {
              window.open(data.Url, '_blank');
          })
          .catch((error) => {
              console.error("Launch Game error:", error);
          });
    }

  return (
    <>
        <div className="row px-2">
            {hotGames &&
              hotGames.map((item, index) => {
                return (
                  <Link
                    key={index}
                    style={{ position: "relative" }}
                    className=" cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 p-0 p-sm-1 m-0"
                    onClick={launchGame(item.product_code, item.game_type_id === 4 ? 8 : item.game_type_id, item.code)}
                  >
                    <img
                      src={item.image_url}
                      className="img-fluid gameImg rounded-3"
                    />
                    <div className="gameImgTitle text-center py-1 px-1 px-sm-2">
                      {item.name}
                    </div>
                  </Link>
                );
              })}
          </div>
    </>
  )
}
