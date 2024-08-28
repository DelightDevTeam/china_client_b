import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import BASE_URL from "../../hooks/baseURL";
import en_data from "../../lang/en";
import ch_data from "../../lang/ch";

export default function Register() {
  const [content, setContent] = useState(en_data);
  const language = localStorage.getItem("lan");
  useEffect(() => {
    if (language === "en") {
      setContent(en_data);
    } else if (language === "ch") {
      setContent(ch_data);
    }
  }, [language]);
  const [eye, setEye] = useState(false);
  const [cEye, setCEye] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const auth = localStorage.getItem("token");

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const register = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="p-3 pt-4 bg-transparent rounded-4 border border-1">
            <div className="text-center mb-4">
              <img
                src={logo}
                width={100}
                className="rounded-3 shadow border border-warning"
                alt=""
              />
            </div>

            <h4 className="text-center">
              {content?.register}
            </h4>
            <form onSubmit={register}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  {content.name}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={content?.enter_name}
                />
                {error && error.user_name && (
                  <p className="text-danger">{error.user_name}</p>
                )}
                {errMsg && <p className="text-danger">{errMsg}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  {content?.phone}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={content?.enter_phone}
                />
                {error && error.phone && (
                  <p className="text-danger">{error.phone}</p>
                )}
                {errMsg && <p className="text-danger">{errMsg}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  {content?.password}
                </label>
                <div className="password">
                  <input
                    type={`${eye ? "text" : "password"}`}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={content?.enter_password}
                  />
                  <i
                    className={`fas fa-${
                      eye ? "eye-slash" : "eye"
                    } cursor-pointer eye`}
                    onClick={() => setEye(!eye)}
                  ></i>
                </div>

                {error && error.password && (
                  <p className="text-danger">{error.password}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  {content?.confirm_password}
                </label>
                <div className="password">
                  <input
                    type={`${cEye ? "text" : "password"}`}
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={content?.confirm_password}
                  />
                  <i
                    className={`fas fa-${
                      cEye ? "eye-slash" : "eye"
                    } cursor-pointer eye`}
                    onClick={() => setCEye(!cEye)}
                  ></i>
                </div>

                {error && error.confirmPassword && (
                  <p className="text-danger">{error.confirmPassword}</p>
                )}
              </div>
              <div className="mt-2 mb-3">
                {loading ? (
                  <Spinner />
                ) : (
                  <button type="submit" className="btn btn-outline-light w-100">
                    {content?.register}
                  </button>
                )}
              </div>
              <div className="text-center">
                <Link className="underline" to={"/login"}>
                  {content?.login}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
