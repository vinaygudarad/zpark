import React from "react";
import "./App.scss";
import ReCaptcha from "./ReCaptcha";
import { useNavigate } from "react-router-dom";

const Field = React.forwardRef(({ label, type, id, classes }, ref) => {
  let idf = id || "form__field-" + String(label).split(" ").join("");
  let classesf = "form__field " + (classes || label);
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
  let navigate = useNavigate();
  if (window.localStorage.getItem("username")) {
    navigate("/Home");
  }
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      recaptcha: captchaVal,
    };
    onSubmit(data);
  };
  //instead of alpabet captcha can use math?
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <Field ref={usernameRef} label="Username" type="text" />
      <Field ref={passwordRef} label="Password" type="password" />
      {ReCaptcha(onChange)}
      <div className="auth-btn-wrapper">
        <button className="btn btn-pushable auth-btn" type="submit">
          <span className="btn-front">Sign In!</span>
        </button>
      </div>
    </form>
  );
};
const ReturnAuthPair = (username, password) => {
  let resp;
  const dummyAuthResponse = { username: "ajeya", password: "ajeya" };
  //do axios business here
  //resp=fetch().then();
  resp = dummyAuthResponse;
  if (resp.username === username && resp.password === password) return true;
  return false;
};

const SignInFunc = () => {
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    console.log(data);
    let id_prefix = "form__field-";
    let errFlags = {
      Password: false,
      Username: false,
      Captcha: false,
    };
    let count = 0;
    errFlags.Username = data.username !== "" ? false : true;
    errFlags.Password = data.password !== "" ? false : true;
    errFlags.Captcha = data.recaptcha !== "" ? false : true;
    //if errFlags.Username is not false then it checks AuthPair
    if (errFlags.Username || ReturnAuthPair(data.username, data.password)) {
    } else {
      count++;
    }
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
    if (count === 0) {
      //do axios business here
      window.localStorage.setItem("username", data.username);
      navigate("/Home");
    }
  };
  //if correct
  return (
    <div className="wrapper">
      <Form onSubmit={handleSubmit} />
    </div>
  );
};
export default class SignIn extends React.Component {
  //componentDidMount() {
  //Captcha();
  //document.getElementById('refresh').addEventListener('click',(e)=>{e.preventDefault();Captcha();});
  //document.getElementById('refresh').setAttribute('onClick','Captcha()');
  //}
  render() {
    return <SignInFunc />;
  }
}
