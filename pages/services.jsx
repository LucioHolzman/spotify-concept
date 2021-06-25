import Navigation from "../components/Navigation";
import SpotifyTrack from "../components/SpotifyTrack";
import { signIn, signOut, useSession } from 'next-auth/client'

const Services = () => {


  const [ session, loading ] = useSession()

  
  return (
    <>
      <h1>Services</h1>
      <Navigation />
      <SpotifyTrack/>
    </>

  );
};

export default Services;
