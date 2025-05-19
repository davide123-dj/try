import { useState } from "react";
import { useNavigate } from "react-router-dom";

function All() {
    const [signup, setSignup] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [responseMessage, setResponseMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Kubika ubutumwa bw'ikosa
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(""); // Kuraho ikosa igihe umukoresha atangiye kuzuza
    };

    const isFormValid = () => {
        return formData.email.trim() !== "" && formData.password.trim() !== "" && (signup ? formData.name.trim() !== "" : true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        const url = signup ? "http://localhost:5000/signup" : "http://localhost:5000/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setResponseMessage(data.message || "Success!");

            if (response.ok) {
                navigate("/Home");
            }
        } catch (error) {
            setResponseMessage("Error: Something went wrong.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {signup && (
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                    </label>
                )}
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                </label>
                <button type="submit">{signup ? "Sign Up" : "Log In"}</button>
            </form>
            <button onClick={() => setSignup(!signup)}>
                {signup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </button>

            {/* Kwerekana ubutumwa bw'ikosa */}
            {errorMessage && (
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid red", borderRadius: "5px", backgroundColor: "#ffdddd" }}>
                    <p>{errorMessage}</p>
                </div>
            )}

            {/* Kwerekana ubutumwa busanzwe */}
            {responseMessage && (
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f8f8f8" }}>
                    <p>{responseMessage}</p>
                </div>
            )}
        </>
    );
}

export default All;
