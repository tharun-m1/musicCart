import React, { useState } from "react";
import styles from "./form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../redux/loginSlice";
function Form({ formStatus }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const getCaption = () => {
    if (formStatus === "login") {
      return (
        <>
          <div>Sign in.</div> <div>Already a customer</div>
        </>
      );
    }
    if (formStatus === "signup") {
      return (
        <>
          <div>Create Account.</div> <div>Don't have an account?</div>
        </>
      );
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formStatus === "signup") {
        let { name, mobile, email, password } = formData;

        name = name.trim();
        if (name.length === 0) return toast.error("Name is required");
        name = name.replace(/\s+/g, " ");
        let mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
          return toast.error("Invalid Mobile Number");
        }
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return toast.error("Invalid email.");
        }
        if (password.length < 6) {
          return toast.error("Password must be 6 characters or greater ");
        }
        const payload = {
          name,
          mobile,
          email,
          password,
        };
        setLoading(true);
        const response = await register(payload);
        localStorage.setItem("mic_jwToken", response.data.jwToken);
        dispatch(changeStatus(true));
        return navigate("/");
      }
      if (formStatus === "login") {
        const { email, password } = formData;
        const payload = { email, password };
        setLoading(true);
        const response = await login(payload);
        localStorage.setItem("mic_jwToken", response.data.jwToken);
        dispatch(changeStatus(true));
        return navigate("/");
      }
    } catch (err) {
      setLoading(false);
      return toast.error(err.message);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <ToastContainer />
        {loading ? <Loading /> : ""}
        <div className={styles.caption}>{getCaption()}</div>
        <form onSubmit={handleSubmit}>
          {formStatus === "signup" ? (
            <div className={styles.feild}>
              <div>Name</div>
              <div>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="name"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {formStatus === "signup" ? (
            <div className={styles.feild}>
              <div>Mobile</div>
              <div>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="mobile"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={styles.feild}>
            <div>Email Id</div>
            <div>
              <input
                onChange={(e) => handleChange(e)}
                type="email"
                name="email"
              />
            </div>
          </div>
          <div className={styles.feild}>
            <div>Password</div>
            <div>
              <input
                onChange={(e) => handleChange(e)}
                type="password"
                name="password"
              />
            </div>
          </div>
          {formStatus === "signup" ? (
            <div className={styles.info}>
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </div>
          ) : (
            ""
          )}
          <div className={styles.submitBtn}>
            <button type="submit">Continue</button>
          </div>
          <div className={styles.tnc}>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
