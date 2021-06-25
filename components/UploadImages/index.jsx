import styles from '../../styles/Home.module.css'

const UploadImages = () => {
    return (
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
    )
}
