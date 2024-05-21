import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/button";
import {Link, useNavigate} from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const projectId = 'f104bi07c490';

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'projectId': projectId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    appType: 'music'
                })
            });
            const result = await response.json();
            console.log(result)
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(result));
                alert('Sign up successful');
                navigate('/login');
            } else {
                alert(result.message || 'Sign up failed');
            }
        } catch (error) {
            alert('Error signing up');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex-col text-center bg-gray-300  p-8 rounded-2xl w-[40vw] gap-10">
                <h3 className="text-center font-bold text-xl mb-4">Create an Account</h3>
                <Input
                    isRequired
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="max-w-xl my-5 "
                    size={"lg"}


                />
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="max-w-xl my-5"
                    size={"lg"}
                />
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
                    className="max-w-xl my-5"
                    size={"lg"}
                />
                <div className={"flex-col justify-center items-center"}>
                    <Button className="my-5 w-36 bg-slate-700 text-md text-center text-orange-500 py-6" variant="shadow" onClick={handleSubmit}>Sign Up
                    </Button>
                    <p>Already have an account? <Link to="/login" className="text-blue-600">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}