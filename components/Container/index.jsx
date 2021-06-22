import Image from '../Image';
import styles from '../../styles/Home.module.css'

const ImageContainer = ({imageURL, index}) => {
    return (
        <>
        <span className={styles.card}
        style={{"--i": index}}>
            <Image
            imageURL={imageURL}
            />
        <div className={styles.containerText}>
            <div style={{fontSize: "12px"}} className={styles.textCard}>
                <h3>Titulo de Card</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, reiciendis.</p>
            </div>
        </div>
        </span>
        </>
    )
}
export default ImageContainer;