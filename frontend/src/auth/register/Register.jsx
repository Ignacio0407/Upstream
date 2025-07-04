import "../../static/css/auth/authButton.css";
import "../../static/css/auth/authPage.css";
import tokenService from "../../services/token.service";
import FormGenerator from "../../components/formGenerator/formGenerator";
import { registerFormOwnerInputs } from "./form/registerFormOwnerInputs";
import { registerFormClinicOwnerInputs } from "./form/registerFormClinicOwnerInputs";
import { useRef, useState } from "react";
import BotonLink from "../../util/BotonLink";

export default function Register() {
  let [type, setType] = useState(null);
  let [authority, setAuthority] = useState(null);

  const registerFormRef = useRef();

  function handleButtonClick(event) {
    const target = event.target;
    let value = target.value;
    if (value === "Back") value = null;
    else setAuthority(value);
    console.log(value);
    setType(value);
  }

  function handleSubmit({ values }) {

    if(!registerFormRef.current.validate()) return;

    const request = values;
    request["authority"] = authority;
    let state = "";

    fetch("/api/v1/auth/signup", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(request),
    })
      .then(function (response) {
        if (response.status === 200) {
          const loginRequest = {
            username: request.username,
            password: request.password,
          };

          fetch("/api/v1/auth/signin", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(loginRequest),
          })
            .then(function (response) {
              if (response.status === 200) {
                state = "200";
                return response.json();
              } else {
                state = "";
                return response.json();
              }
            })
            .then(function (data) {
              if (state !== "200") alert(data.message);
              else {
                tokenService.setUser(data);
                tokenService.updateLocalAccessToken(data.token);
                window.location.href = "/dashboard";
              }
            })
            .catch((message) => {
              alert(message);
            });
        }
      })
      .catch((message) => {
        alert(message);
      });
  }  

  if (type) {
    return (
      <div className="auth-page-container">
        <h1>Register</h1>
        <div className="auth-form-container">
          <FormGenerator
            ref={registerFormRef}
            inputs={
              type === "Player" ? registerFormOwnerInputs               
              : registerFormClinicOwnerInputs
            }
            onSubmit={handleSubmit}
            numberOfColumns={1}
            listenEnterKey
            buttonText="Save"
            buttonClassName="auth-button"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="auth-page-container">
        <div className="auth-form-container">
          <h1>Register</h1>
          <h2 className="text-center text-md">
            What type of user will you be?
          </h2>
          <div className="options-row">
            <button
              className="auth-button"
              value="Owner"
              onClick={handleButtonClick}
            >
              Player
            </button>
            <button
              className="auth-button"
              value="Vet"
              onClick={handleButtonClick}
            >
              Admin
            </button>            
          </div>
        </div>
        <div className="hero-div">
              <h4>¿Ya tienes cuenta?</h4>                
              <BotonLink color={"success"} direction={"/login"} text={"Inicia Sesión"}/>
            </div>
      </div>
    );
  }
}
