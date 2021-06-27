import { useContext } from "react";
import { contextApp } from "../../context";

import styles from "../../styles/SpotifyComponents.module.css"


export const SpotifyCategoriesList = () => {
  const { categories, setCategoryToken } = useContext(contextApp);

  return (
    <>
      <ul className={styles.ulSpotifyCategories}>
        {categories.length !== 0 ? (
          categories.map((elem, index) => (
            <li className={styles.liSpotifyCategories} key={elem.id}>
              <a className={styles.aSpotifyCategories} href="#" onClick={() => setCategoryToken(index)}>
                <img className={styles.imgSpotifyCategories} src={elem.icons[0].url} alt="" />
                <p className={styles.pSpotifyCategories}>{elem.name}</p>
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

export const SpotifyCategorySelected = () => {
  const { categories, setCategoryToken, categoryToken } = useContext(contextApp);
  return (
    <>
      <ul>
            <li className={styles.liSpotifyCategories} key={categories.id}>
              <a className={styles.aSpotifyCategories} href="#" >
                <h4>Category</h4>
                <img className={styles.imgSpotifyCategories} src={categories[categoryToken].icons[0].url} alt="" />
                <p className={styles.pSpotifyCategories}>{categories[categoryToken].name}</p>
              </a>
            </li>
      </ul>
    </>
  );
};

