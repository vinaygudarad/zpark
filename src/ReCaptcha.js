import ReCaptchaV2 from "react-google-recaptcha";
import "./App.scss";
const SITEKEY = "6LfgTG8dAAAAAJA8Sz5q8c7Ppf242Oz7XQ0gA7s8";
function ReCaptcha(onChangeFunction, theme = "dark") {
  return (
    <div className="captcha-wrapper">
      <div id="g-recaptcha">
        <ReCaptchaV2
          sitekey={SITEKEY}
          onChange={onChangeFunction}
          theme={theme}
        />
      </div>
    </div>
  );
}
export default ReCaptcha;
