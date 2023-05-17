import React from "react";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
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
                    <h3 className="text-center">Forgot Password</h3>
                    <p className="text-center">
                        Please enter your register email to get reset password
                        mail
                    </p>
                    <form action="">
                        <CustomInput
                            type="email"
                            placeholder="Email Address"
                            id="email"
                        />

                        <a
                            href="mailto:vuvanquyen07081999@gmail.com"
                            className="border-0 px-3 py-2 mt-3 text-white w-100 fw-bold"
                            style={{
                                backgroundColor: "#ffd333",
                                textDecoration: "none",
                                textAlign: "center",
                            }}
                            type="submit"
                        >
                            Send Email
                        </a>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
