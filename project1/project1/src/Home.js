import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <p>welcome to you system</p>
         <h1>you are recod you product in <Link to='/productin'> product in</Link></h1>
         <h1>you are record you product out <Link to='/productout'> product out</Link></h1>
        </div>
    )
}
export default Home;