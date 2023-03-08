import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import useId from "../utils/useId";
import useToken from "../utils/useToken";
import Loader from "./Loader";

const AddTruck = () => {
  const id = useId();
  const token = useToken();

  const [loading, setLoading] = useState(true);
  const [regNumber, setregNumber] = useState("");
  const [weight, setWeight] = useState("");
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    class: "",
  });
  const navigate = useNavigate();

  const handleAddTruck = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_HOST}/truck_owner/add_truck/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              regNumber,
              weight,
            }),
          }
        );
        const data = await res.json();
        setLoading(false);

        if (data.isCreated) {
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: "Truck was successfully Added",
              class: "alert alert-success alert-dismissible fade show",
            };
          });
          setregNumber("");
          setWeight("");
        } else {
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: data.msg,
              class: "alert alert-warning alert-dismissible fade show",
            };
          });
        }
      } catch (e) {
        console.log(e);
        setAlert((prev) => {
          return {
            ...prev,
            alert: true,
            message: "An error occurred, Please try again",
            class: "alert alert-danger alert-dismissible fade show",
          };
        });
      }
    } else {
      setAlert((prev) => {
        return {
          ...prev,
          alert: true,
          message: "You are not logged in",
          class: "alert alert-warning alert-dismissible fade show",
        };
      });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  if (loading) {
    return (
      <Loader
        loading={loading}
        description="We are adding your truck, please wait"
      />
    );
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Add Truck</span>
      </div>
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="bg-white rounded  shadow-sm m-3 p-3">
          {alert.alert && (
            <div className={alert.class} role="alert">
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div>
            <form>
              <p className="text-center text-muted">Enter the truck details</p>
              <div className="m-3">
                <label htmlFor="regNumber" className="form-label">
                  Registration Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regNumber"
                  placeholder="UBA123X"
                  value={regNumber}
                  required
                  onChange={(e) => setregNumber(e.target.value.toUpperCase())}
                />
              </div>
              <div className="m-3">
                <label htmlFor="weight" className="form-label">
                  Weight (Tonnes)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  value={weight}
                  placeholder="12"
                  required
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="m-3 btn ridelink-background text-white"
                onClick={(e) => handleAddTruck(e)}
              >
                Add my Truck
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTruck;
