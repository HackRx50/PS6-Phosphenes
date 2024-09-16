
// src/components/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { cn } from "./lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
} from "@tabler/icons-react";
import Section from "./Section";
import { Gradient } from "./design/Services";
import Button from "./Button";
import { GradientLight } from "./design/Features";
import { auth, provider, githubProvider } from "./firebaseConfig";
import { signInWithPopup, signOut } from 'firebase/auth';
import Confetti from 'react-confetti';

export default function Login() {
    const [activeTab, setActiveTab] = useState("signIn");
    const [user, setUser] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Trigger confetti effect
                setShowConfetti(true);
                // Navigate to home with a query parameter to indicate confetti
                navigate("/?showConfetti=true");
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = async (provider) => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error signing in: ', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate('/?showConfetti=false');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await auth.signInWithEmailAndPassword(auth, email, password);
            // Trigger confetti effect
            setShowConfetti(true);
            navigate("/?showConfetti=true");  // Navigate with query parameter
        } catch (error) {
            console.error("Error signing in with email/password:", error);
        }
    };

    return (
        <Section className="lg:flex relative lg:!py-0 justify-center items-center m-10">
            {showConfetti && <Confetti />}
            <div className="lg:w-[50%] lg:flex lg:justify-center lg:items-center ">
                <Gradient />
                <div className="max-w-md w-full mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-n-9/40 backdrop-blur border border-n-1/10 ">
                    <div className="flex justify-around mb-2 gap-0 rounded-l-lg">
                        <button
                            className={cn(
                                "relative px-2 py-1 h2 font-bold lg:h4 mt-4 lg:mt-2 w-full bg-conic-gradient rounded-l-lg  bg-n-9/40 backdrop-blur border border-n-1/10 flex justify-center items-center",
                                activeTab === "signIn" ? "font-bold text-white" : "text-n-3"
                            )}
                            onClick={() => setActiveTab("signIn")}
                        >
                            <span className="relative z-10 h6 lg:h6 rounded-l-lg ">LOGIN</span>
                        </button>
                        <button
                            className={cn(
                                "relative px-2 py-1 h2 font-bold lg:h4 mt-4 lg:mt-2 w-full bg-conic-gradient rounded-r-lg l  bg-n-9/40 backdrop-blur border border-n-1/10 flex justify-center items-center",
                                activeTab === "signUp" ? "font-bold text-white" : "text-n-3"
                            )}
                            onClick={() => setActiveTab("signUp")}
                        >
                            <span className="relative z-10 h6 lg:h6 rounded-r-lg">SIGN UP</span>
                        </button>
                    </div>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
                    {activeTab === "signIn" && (
                        <form className="mb-8 mt-6" onSubmit={handleSubmit}>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="••••••••" type="password" />
                            </LabelInputContainer>
                            <Button
                                className="relative rounded-md h-10 w-full"
                                type="submit"
                                white
                            >
                                Login &rarr;
                            </Button>
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
                            <div className="flex flex-col space-y-4">
                                <Button
                                    className="relative flex space-x-2 items-center w-full"
                                    type="button"
                                    white
                                    onClick={() => handleLogin(githubProvider)}
                                >
                                    <span className="flex gap-1"><IconBrandGithub className="h-4 w-4 text-n-8" />
                                        Github</span>
                                </Button>
                                <Button
                                    className="relative flex space-x-2 items-center w-full"
                                    type="button"
                                    white
                                    onClick={() => handleLogin(provider)}
                                >
                                    <span className="flex gap-1"><IconBrandGoogle className="h-4 w-4 text-n-8" />
                                        Google</span>
                                </Button>
                            </div>
                        </form>
                    )}
                    {activeTab === "signUp" && (
                        <form className="mb-8 mt-6" onSubmit={handleSubmit}>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Tyler" type="text" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="••••••••" type="password" />
                            </LabelInputContainer>
                            <Button
                                className="relative rounded-md h-10 w-full"
                                type="submit"
                                white
                            >
                                Sign Up &rarr;
                            </Button>
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
                            <div className="flex flex-col space-y-4">
                                <Button
                                    className="relative flex space-x-2 items-center w-full"
                                    type="button"
                                    white
                                    onClick={() => handleLogin(githubProvider)}
                                >
                                    <span className="flex gap-1"><IconBrandGithub className="h-4 w-4 text-n-8" />
                                        Github</span>
                                </Button>
                                <Button
                                    className="relative flex space-x-2 items-center w-full"
                                    type="button"
                                    white
                                    onClick={() => handleLogin(provider)}
                                >
                                    <span className="flex gap-1"><IconBrandGoogle className="h-4 w-4 text-n-8" />
                                        Google</span>
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Section>
    );
}

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
}
