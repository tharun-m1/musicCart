import React from "react";
import styles from "./auth.module.css";
import logo from "../../assets/logo.svg";
import Form from "../../components/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { changeFormStatus } from "../../redux/formStatus";

function Auth() {
  const formStatus = useSelector((state) => state.formStatus.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>Musicart</div>
        </div>
        <div className={styles.caption}>Welcome</div>
        <div className={styles.formContainer}>
          <Form key={formStatus} formStatus={formStatus} />
        </div>
        {formStatus === "signup" ? (
          <div className={styles.nav}>
            Already have an account?{" "}
            <span onClick={() => dispatch(changeFormStatus("login"))}>
              Sign in
            </span>
          </div>
        ) : (
          ""
        )}
        {formStatus === "login" ? (
          <div className={styles.linesContainer}>
            <div></div>
            <div>New to Musicart?</div>
            <div></div>
          </div>
        ) : (
          ""
        )}
        {formStatus === "login" ? (
          <div className={styles.btnContainer}>
            <button onClick={() => dispatch(changeFormStatus("signup"))}>
              Create your Musicart account
            </button>
          </div>
        ) : (
          ""
        )}
        <div className={styles.footer}>Musicart | All rights reserved</div>
      </div>
    </>
  );
}

export default Auth;
