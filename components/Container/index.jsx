import Image from '../Image';
const ImageContainer = ({imageURL, index}) => {
    return (
        <>
        <span 
        style={{"--i": index}}>
            <Image
            imageURL={imageURL}
            />
        </span>
        </>
    )
}
export default ImageContainer;