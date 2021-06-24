import { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Container from "../components/Container";

import { storage } from "../firebase";

export default function Home() {
  const [images, setImages] = useState([]);

  const [imageUp, setImageUp] = useState(null);

  const [progress, setProgress] = useState(0);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImageUp(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${imageUp.name}`).put(imageUp);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        progress === 100 &&
          setInterval(() => {
            setProgress(0);
          }, 2500);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const url = await storage
          .ref("images")
          .child(imageUp.name)
          .getDownloadURL();
        setImages([...images, url]);
      }
    );
  };

  const fetchAllImages = useCallback(async () => {
    try {
      const listRef = storage.ref("images");
      const { items } = await listRef.listAll();
      const arrayImages = [];
      for (let item = 0; item < items.length; item++) {
        const element = items[item];
        const url = await element.getDownloadURL();
        arrayImages.push(url);
      }
      setImages(arrayImages);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllImages();
  }, []);

  //------------Total---------------
  const total = useMemo(() => images.length, [images]);

  //------------Width---------------
  const [width, setWidth] = useState(400);

  //------------Height--------------
  const [height, setHeight] = useState(200);

  return (
    <div>
      <Head>
        <title>Galeria 3D</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.position}>
        <div className={styles.containerDimensions}>
          <div className={styles.dropZone}>
            <progress
              className={styles.progress}
              value={progress}
              max="100"
            ></progress>
            <input
              className={styles.inputFile}
              type="file"
              onChange={handleChangeImage}
            />
            <div className={styles.containerButton}>
              <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
          <div className={styles.containerInput}>
            <label className={styles.label} htmlFor="">
              Width
            </label>
            <input
              className={styles.numberInput}
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className={styles.containerInput}>
            <label className={styles.label} htmlFor="">
              Height
            </label>
            <input
              className={styles.numberInput}
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
        {images.length === 0 ? (
          <div className={styles.spinner}></div>
        ) : (
          <div className={styles.container}>
            <div
              className={styles.main}
              style={{
                "--total": total,
                "--width-general": `${width}px`,
                "--height-general": `${height}px`,
              }}
            >
              <div className={styles.textContent}>
                <h2>Lucio Holzman</h2>
              </div>
              {images.map((image, index) => (
                <Container
                  key={index}
                  index={index}
                  imageURL={image}
                  widthGeneral="250px"
                  heightGeneral="150px"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
