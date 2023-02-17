import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/StateProvider";
import { ACTIONS } from "../context/actions";
import Loader from "../components/Loader";

const Login = () => {
  const showPasswordRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authDispatch } = useAuthentication();

  const handleShowPassword = () => {
    let passwordField = passwordRef.current;
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: 3,
        }),
        credentials: "include",
      });
      const data = await res.json();

      setLoading(false);

      if (data.isAuthenticated) {
        authDispatch({
          type: ACTIONS.AUTHENTICATE,
          isAuthenticated: data.isAuthenticated,
          id: data.id,
        });

        navigate("/add_truck");
        setAlert((prev) => {
          return { ...prev, alert: false, message: "" };
        });
      } else {
        setAlert((prev) => {
          return { ...prev, alert: true, message: data.msg };
        });
      }
    } catch (e) {
      console.log(e);
      setAlert((prev) => {
        return {
          ...prev,
          alert: true,
          message: "An error occurred, Please try again",
        };
      });
    }
  };
  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }

  return (
    <div>
      <div className="mx-auto" style={{ width: "340px" }}>
        <Logo />
        {alert.alert && (
          <div className="mx-auto" style={{ width: "340px" }}>
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
        <p className="text-center text-muted">Welcome Back, please login</p>
        <form className="border rounded">
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              ref={emailRef}
              required
              placeholder="oen@gmail.com"
            />
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="m-3 form-check">
            <input
              ref={showPasswordRef}
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              onChange={() => handleShowPassword()}
            />
            <label className="form-check-label" htmlFor="showPassword">
              show password
            </label>
          </div>
          <button
            type="submit"
            className="m-3 btn ridelink-background text-white  "
            onClick={(e) =>
              handleLogin(e, emailRef.current.value, passwordRef.current.value)
            }
          >
            Login
          </button>
        </form>

        <div className="mt-3">
          <Link to="/signup" className="text-decoration-none ridelink-color">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
