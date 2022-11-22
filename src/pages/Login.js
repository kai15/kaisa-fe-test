import React from "react";
import "./JobsStyle.css"
import "./LoginStyle.css"
import GoogleLogin from 'react-google-login';
import FacebookLogin from "react-facebook-login";

export default function Login() {
    const responseFacebook = response => {
        console.log(response);
        window.location.assign("#/jobs")
    }

    const responseGoogle = response => {
        console.log(response);
        if (!response?.error) window.location.assign("#/jobs")
    }


    return (
        <>
            <div className={"content-login"}>
                <div className={"login"}>
                    <h3 className={"margin-5px-0px text-dark-blue"}>Sign In</h3>
                    <div className={"padding-5px"}>
                        <GoogleLogin
                            // clientId="491004959702-3bgqo54pt777f77dgl7cqd6s7e7rii81.apps.googleusercontent.com"
                            clientId="797228037598-8nsltg7vqlrmpvl8nii2ke5ihs1r5e26.apps.googleusercontent.com"
                            // clientId="797228037598-fimn0s2msvcu3276qletufkbbktd6a5a.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            className="GOOGLE"
                        />
                    </div>
                    <div className={"padding-5px"}>
                        <FacebookLogin
                            btnContent="Facebook"
                            appId="2700309526765713"
                            fields="name,email,picture"
                            icon="fa-facebook"
                            callback={responseFacebook}
                            onSuccess={responseFacebook}
                            onFailure={responseFacebook}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
