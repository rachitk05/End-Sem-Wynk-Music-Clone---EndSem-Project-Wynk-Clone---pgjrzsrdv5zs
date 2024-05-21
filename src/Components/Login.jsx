import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/button";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import { useAuth } from './AuthContext'; // Import the custom hook

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useAuth(); // Use the custom hook to get the setAuth function
    const projectId = 'f104bi07c490';

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'projectId': projectId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    appType: 'music'
                })
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(result)); // Save user data to local storage
                setAuth(result.token); // Set the token in the context
                alert('Sign in successful');
                navigate('/'); // Navigate to the home page
            } else {
                alert(result.message || 'Sign in failed');
            }
        } catch (error) {
            alert('Error signing in');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex-col text-center  bg-gray-300 p-8 rounded-2xl w-[40vw] gap-10">
                <h3 className="text-center font-bold text-xl mb-4">Sign In</h3>
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="max-w-xl my-5 "
                    size={"lg"}
                />
                <br/>
                <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-600 pointer-events-none"/>
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-900 pointer-events-none"/>
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="max-w-xl my-3 "
                    size={"lg"}
                />
                <br/>
                <div className={"flex-col justify-center items-center"}>
                    <Button className="my-5 w-36 bg-slate-700 text-md text-center text-orange-500 py-6" variant="shadow"
                            onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <h5>Don't have an account? <Link to="/signup" className="text-blue-600">Register Here</Link></h5>
                </div>
            </div>
        </div>
    );
}
