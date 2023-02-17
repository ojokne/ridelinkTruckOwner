import { useState } from "react";
import Loader from "../components/Loader";
import { useAuthentication } from "../context/StateProvider";
import useAuth from "../utils/useAuth";

const AddTruck = () => {
  useAuth();
  const { auth } = useAuthentication();

  const [loading, setLoading] = useState(false);
  const [regNumber, setregNumber] = useState("");
  const [weight, setWeight] = useState("");
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    class: "",
  });

  const handleAddTruck = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (auth.isAuthenticated) {
      try {
        const res = await fetch(
          `http://localhost:5000/truck_owner/add_truck/${auth.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              regNumber,
              weight,
            }),
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
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
      {alert.alert && (
        <div className="mx-auto" style={{ width: "340px" }}>
          <div className={alert.class} role="alert">
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
      <div className="mx-auto" style={{ width: "340px" }}>
        <p className="text-center text-muted">
          Please give us your details about the truck
        </p>

        <form className="border rounded">
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
              onChange={(e) => setregNumber(e.target.value)}
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
  );
};

export default AddTruck;