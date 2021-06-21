const ImageContainer = ({imageURL = '', keyImage}) => {
    return (
        <>
        <span 
        style={{"--i": keyImage}}>
            <img 
            src={imageURL} 
            alt=""
            />
        </span>
        </>
    )
}
export default ImageContainer;