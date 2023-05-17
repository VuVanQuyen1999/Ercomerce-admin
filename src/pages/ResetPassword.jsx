import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const ResetPassword = () => {
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
                    <h3 className="text-center">Reset Password</h3>
                    <p className="text-center">
                        Please enter your new password
                    </p>
                    <form action="">
                        <CustomInput
                            type="password"
                            placeholder="Password"
                            id="password"
                        />

                        <CustomInput
                            type="password"
                            placeholder="Confirm Password"
                            id="conf-password"
                        />
                        <Link
                            to="/login"
                            className="border-0 px-3 py-2 mt-3 text-white w-100 fw-bold"
                            style={{
                                backgroundColor: "#ffd333",
                                textDecoration: "none",
                                textAlign: "center",
                            }}
                            type="submit"
                        >
                            Confirm
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
