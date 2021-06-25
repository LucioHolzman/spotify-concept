import { useContext, useEffect } from "react";
import { contextApp } from "../../context";

const SpotifyPlayList = () => {
  const { playList, setPlayListToken } = useContext(contextApp);

  return (
    <>
      <ul>
        {playList.length !== 0 ? (
          playList.map((elem, index) => (
            <li key={elem.id}>
              <a href="#" onClick={() => setPlayListToken(index)}>
                <h2>{elem.name}</h2>
                <img src={elem.images[0].url} alt="" />
              </a>
            </li>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </ul>
    </>
  );
};

export default SpotifyPlayList;
