import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div
                className="py-5"
                style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}
            >
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="my-5 w-25 bg-white rounded-3 m-auto p-3">
                    <h3 className="text-center">Login</h3>
                    <p className="text-center">
                        Login to your account to continue.
                    </p>
                    <form action="">
                        <CustomInput
                            type="email"
                            placeholder="Email Address"
                            id="email"
                        />
                        <CustomInput
                            type="password"
                            placeholder="Password"
                            id="password"
                        />
                        <Link
                            className=""
                            to="/forgot-password"
                            style={{
                                textDecoration: "none",
                                color: "#777",
                            }}
                        >
                            Forgot my password!
                        </Link>
                        <Link
                            to="/admin"
                            className="border-0 px-3 py-2 mt-3 text-white w-100 fw-bold"
                            style={{
                                backgroundColor: "#ffd333",
                                textDecoration: "none",
                                textAlign: "center",
                            }}
                            type="submit"
                        >
                            Login
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
