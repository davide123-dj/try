import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Reg() {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/userregister', {
      username,
      email,
      password
    });
    console.log('Data transmitted successfully:', response.data);
  } catch (err) {
    console.error('Error in POST:', err);
  }
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" placeholder="username" name="username" onChange={handleChange} value={username}
          />
        </label><br />

        <label>
          Email:
          <input  type="email" placeholder="your email" name="email" onChange={handleChange} value={email}
          />
        </label><br />

        <label>
          Password:
          <input type="password" placeholder="your password" name="password" onChange={handleChange} value={password} />
        </label><br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to='/Login'>Login</Link>
      </p>
    </div>
  );
}

export default Reg;
