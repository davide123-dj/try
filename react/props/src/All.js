import { useState } from "react";

function All(props) {
  return (
    <>
      <label>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
      <br />
    </>
  );
}

function Signup() {

  return (
    <>
      <All type="text" placeholder="name" label="USER NAME: " />
      <All type="email" placeholder="email" label="USER EMAIL: " />
      <All type="password" placeholder="password" label="USER PASSWORD: " />
      <button >Signup</button>
    </>
  );
}

function Login() {
  return (
    <>
      <All type="email" placeholder="email" label="USER EMAIL: " />
      <All type="password" placeholder="password" label="USER PASSWORD: " />
      <button>Login</button>
    </>
  );
}

function Rell() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <>
      {isSignup ? <Signup /> : <Login />}
      <h1>
        {isSignup ? "Do you have an account?" : "Don't have an account?"}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login now" : "Signup now"}
        </button>
      </h1>
    </>
  );
}

export default Rell;
