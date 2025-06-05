// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) newErrors.email = "이메일을 입력해주세요.";
    if (!password.trim()) newErrors.password = "비밀번호를 입력해주세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element =
        document.getElementById(firstErrorField) ||
        document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/userinfos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text();

        localStorage.setItem("token", token);

        import("axios").then((axios) => {
          axios.default.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        });

        alert("로그인이 성공적으로 완료되었습니다!");
        navigate("/maindisplay");
      } else {
        const errorText = await response.text();
        alert(`로그인 실패: ${errorText || "이메일 또는 비밀번호가 올바르지 않습니다."}`);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/muck-logo.png" alt="MUCK 로고" />
      </div>

      <div className={styles.loginForm}>
        <h2 className={styles.formTitle}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles["input-group"]}>
            <label htmlFor="email" className={styles.formLabel}>이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="이메일을 입력하세요"
              className={`${styles["input-field"]} ${errors.email ? styles.inputError : ""}`}
              required
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles["input-group"]}>
            <label htmlFor="password" className={styles.formLabel}>비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="비밀번호를 입력하세요"
              className={`${styles["input-field"]} ${errors.password ? styles.inputError : ""}`}
              required
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>

          <div className={styles["button-group"]}>
            <button type="button" className={styles["signup-btn"]} onClick={() => navigate("/signup")}>
              회원가입
            </button>
            <button type="submit" className={styles["login-btn"]}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}