import Navigation from "../components/Navigation";
import { useContext } from "react";
import { contextApp } from "../context";
const Services = () => {

  const { tracks, user, categories } = useContext(contextApp)
  return (
    <>
      <h1>Services</h1>
      <Navigation />
      <div className="container">

        
      </div>
      <div className="container-user">
      {/* {
        Object.keys(user).map(elem => {
        !user[elem] ? <p>No hay usuario</p>
      :<div className="content">
      <p>{user[elem].name}</p>
      <img src={user[elem].profileImg} alt=""/>
      <p>{user[elem].followers}</p>
      <p>No existe un usuario</p>
      </div>
      })
    }
       */}
      </div>
    </>

  );
};

export default Services;
