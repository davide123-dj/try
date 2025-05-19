import React, { useState } from "react";
import{Link} from "react-router-dom";


function Login(){
    const[form,setForm]=useState({name:"",password:""});

const handleSubmit=(e)=>{
    e.preventDefault();
}
const handleChange=(e)=>{
    setForm(write=>({
        ...write,
        [e.target.name] : e.target.value
    }))   
}


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username: 
                <input type="text" name="username" placeholder="put you name" onChange={handleChange} value={form.username}/>
                </label><br/>
                <label>
                    password:
                    <input type="password" name="password" placeholder="you password" onChange={handleChange} value={form.password}/>
                </label><br/>
                <button type="submit">Login</button>

            </form>
            <p>do not have acount
                <Link to='/Registe'>Registe</Link></p>
        </div>
    )
}
export default Login;