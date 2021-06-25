import { useContext } from "react";
import { contextApp } from "../../context";

const SpotifyCategories = () => {
  const { categories, setCategoryToken } = useContext(contextApp);

  return (
    <>
      <ul>
        {categories.length !== 0 ? (
          categories.map((elem, index) => (
            <li key={elem.id}>
              <a href="#" onClick={() => setCategoryToken(index)}>{elem.name}</a>
            </li>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </ul>
    </>
  );
};

export default SpotifyCategories;
