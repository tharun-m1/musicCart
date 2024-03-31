import React, { useEffect, useState } from "react";
import useScreenSize from "../../customHooks/useScreenSize";
import styles from "./feedback.module.css";
import feedback from "../../assets/feedback.svg";
import { toast } from "react-toastify";
import { sendFeedback } from "../../api/user";
import { useNavigate } from "react-router-dom";
function Feedback({ handleFeedbackError, handleFeedbackSuccess }) {
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState({
    feedbackType: "",
    description: "",
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const handleFeedback = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };
  const clearForm = () => {
    setFeedbackData({ ...feedbackData, feedbackType: "", description: "" });
    return;
  };

  const handleFeedbackSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      console.log("hi");
      const { feedbackType, description } = feedbackData;
      if (feedbackType === "" || feedbackType === null || description === "") {
        return handleFeedbackError("All feilds are required");
      }
      await sendFeedback(feedbackType, description);
      handleFeedbackSuccess("Feedback submitted");
      // setShowFeedback(false);
      return clearForm();
    } catch (err) {
      console.log(err);
      if (err.status >= 500) {
        localStorage.removeItem("mic_jwToken");
        return navigate("/auth");
      }
    }
  };
  useEffect(() => {
    clearForm();
    // eslint-disable-next-line
    return () => toast.dismiss();
    // eslint-disable-next-line
  }, [showFeedback]);

  return (
    <>
      {/* <ToastContainer /> */}
      {screenSize >= 600 ? (
        <div className={styles.feedbackBtn}>
          <img
            onClick={(e) => {
              e.stopPropagation();
              setShowFeedback(!showFeedback);
            }}
            src={feedback}
            alt="feedback"
          />

          {showFeedback ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className={styles.feedbackForm}
            >
              <form>
                <div>Type of Feedback</div>
                <div>
                  <select
                    name="feedbackType"
                    onChange={(e) => {
                      e.stopPropagation();
                      handleFeedback(e);
                    }}
                  >
                    <option disabled selected value={null}>
                      Choose the type
                    </option>
                    <option value="bugs">Bugs</option>
                    <option value="feedback">Feedback</option>
                    <option value="query">Query</option>
                  </select>
                </div>
                <div>Feedback</div>
                <div>
                  <textarea
                    name="description"
                    onChange={(e) => {
                      e.stopPropagation();
                      handleFeedback(e);
                    }}
                    placeholder="Type your feedback"
                    rows={8}
                  ></textarea>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFeedbackSubmit(e);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Feedback;
