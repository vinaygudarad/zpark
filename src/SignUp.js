import React from "react";
import { useNavigate } from "react-router";
import ReCaptcha from "./ReCaptcha";
import "./App.scss";
const pStyle = {
  textAlign: "right",
  fontSize: "12px",
  color: "#9b9b9b",
};
const Field = React.forwardRef(({ label, type, id, classes }, ref) => {
  let idf = id || "form__field-" + String(label).split(" ").join("");
  let classesf = "form__field " + (classes || label);
  console.log(idf);
  return (
    <div className="form__group field">
      <input
        name={label}
        ref={ref}
        type={type}
        className={classesf}
        id={idf}
        placeholder={label}
      />
      <label htmlFor={label} className="form__label">
        {label}:
      </label>
    </div>
  );
});

const Form = ({ onSubmit }) => {
  let [captchaVal, setCaptcha] = React.useState("");
  function onChange(value) {
    setCaptcha(value);
    console.log("Captcha value:", value);
  }
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  //const confirmpasswordRef = React.useRef();
  const emailRef = React.useRef();
  const vehicleNumberRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      recaptcha: captchaVal,
      vehicleNumber: vehicleNumberRef.current.value,
    };
    onSubmit(data);
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <Field ref={usernameRef} label="Username" type="text" />
      <p style={pStyle} id="err-user" className="err"></p>
      <Field ref={emailRef} label="Email" type="email" />
      <p style={pStyle} id="err-email" className="err"></p>
      <Field ref={passwordRef} label="Password" type="password" />
      <p style={pStyle} id="err-pass" className="err"></p>
      {/*<Field ref={confirmpasswordRef} label="ConfirmPass" type="password" />
      <p style ={pStyle} id="err-check" className="err"></p>*/}
      <Field ref={vehicleNumberRef} label="Vehicle Number" type="text" />
      <p style={pStyle} id="err-vehicle" className="err"></p>
      {ReCaptcha(onChange)}
      <div className="auth-btn-wrapper">
        <button className="btn btn-pushable auth-btn" type="submit">
          <span className="btn-front">Sign Up!</span>
        </button>
      </div>
    </form>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    let id_prefix = "form__field-";
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    function validateVN(vn) {
      const re = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
      //not turning th input to lower case since all the letters are already in uppercase
      return re.test(String(vn));
    }
    let chngRed = Array.from(document.getElementsByClassName("form__field"));
    chngRed.forEach((data1) => {
      if (data1.value === "") data1.style.borderBottom = "2px solid red";
      else data1.style.borderBottom = "2px solid #9b9b9b";
    });
    let p = data.password,
      errFlags = {
        Password: false,
        Username: false,
        Email: false,
        VehicleNumber: false,
        Captcha: false,
      };
    if (data.Email === "") {
      document.getElementById("err-email").innerHTML = "Email empty";
      errFlags.Email = true;
    } else {
      if (!validateEmail(data.email)) {
        document.getElementById("err-email").innerHTML = "Email invalid";
        errFlags.Email = true;
      } else {
        document.getElementById("err-email").innerHTML = "";
        errFlags.Email = false;
      }
    }
    if (data.username === "") {
      document.getElementById("err-user").innerHTML = "Username empty";
      errFlags.Username = true;
    } else {
      errFlags.Username = false;
      //check validity
      //if(!valid){
      //errors.push("Choose another username.")
    }
    if (p.length < 8 || p.search(/[a-z]/i) < 0 || p.search(/[0-9]/) < 0) {
      document.getElementById("err-pass").innerHTML =
        "Your password must be at least 8 characters";
      errFlags.Password = true;
    }
    if (!data.vehicleNumber || !validateVN(data.vehicleNumber)) {
      document.getElementById("err-vehicle").innerHTML =
        "Invalid Vechicle Number.";
      errFlags.VehicleNumber = true;
    }
    errFlags.Captcha = data.recaptcha !== "" ? false : true;
    let count = 0;
    for (let [key, value] of Object.entries(errFlags)) {
      if (key !== "Captcha") {
        let domElement = document.getElementById(id_prefix + key);
        if (value === true) {
          count++;
          //console.log(id_prefix+key)
          domElement.style.borderBottom = "2px solid red";
        } else {
          domElement.style.borderBottom = "2px solid #9b9b9b";
        }
      } else {
        if (value === true) count++;
      }
    }
    if (count !== 0) {
      //to database
      //do axios business here
      navigate("/SignIn");
    }
  };
  return (
    <div className="wrapper">
      <Form onSubmit={handleSubmit} />
    </div>
  );
};
export default SignUp;
