
import{Link} from "react-router-dom";
import './Welcome.css';



function Welcome(){
       return(
        <div>
    <p> welcome to you web page</p>

   <h1>click for Login 
    <Link to="/Login">login</Link></h1>
   <br/>
   <h1>click for Registe
     <Link to="/Registe">register</Link></h1>
  
        </div>
       )
}
export default Welcome;