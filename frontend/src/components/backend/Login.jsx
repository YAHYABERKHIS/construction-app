import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";
const Login = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();

      if (result && result.success) {
        const userInfo = {
          id: result.id,
          token: result.token,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        login(userInfo);
        toast.success(t("admin.login_success"));
        navigate("/admin/dashboard");
      } else {
        toast.error(result?.error || t("admin.login_failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.message || t("admin.login_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="container my-5 d-flex justify-content-center">
        <div className="login-form my-5 w-100" style={{ maxWidth: "450px" }}>
          <div className="card border-0 shadow">
            <div className="card-body py-4 px-4">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="text-center mb-4">
                  <h4>{t("admin.login_title")}</h4>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    {t("admin.email")}
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-light">
                      <Mail size={18} />
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder={t("admin.email_ph")}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: t("admin.email_required"),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t("admin.email_invalid"),
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    {t("admin.password")}
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-light">
                      <Lock size={18} />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("admin.password_ph")}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      {...register("password", {
                        required: t("admin.password_required"),
                      })}
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />
                      {t("admin.login_loading")}
                    </>
                  ) : (
                    t("admin.login_btn")
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
