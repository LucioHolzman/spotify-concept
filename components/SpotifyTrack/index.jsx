

const SpotifyTrack = () => {
    
    return(
        <>
        <div className={styles.containerSpotifyTrack}>
            
            {tracks.map(elem => (
                <iframe
                key={elem.track.id}
                src={`https://open.spotify.com/embed/track/${elem.track.id}`}
                width="100%"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                ></iframe>
            ))} 
            <h2>SpotifyTrack</h2>
        </div>
        </>
    )
}

export default SpotifyTrack