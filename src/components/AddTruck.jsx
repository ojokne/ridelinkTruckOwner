import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import Loader from "./Loader";

const AddTruck = () => {
  const [loading, setLoading] = useState(true);
  const [regNumber, setRegNumber] = useState("");
  const [weight, setWeight] = useState(0);

  const [regNumberError, setRegNumberError] = useState("");
  const [weightError, setWeightError] = useState();
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });
  const navigate = useNavigate();

  const handleAddTruck = async (e) => {
    e.preventDefault();

    if (!regNumber.length) {
      setRegNumberError("Registration Number is required");
      return;
    }
    if (weight < 1) {
      setWeightError("Weight should be atleast 1 tonne");
      return;
    }
    setLoading(true);

    addDoc(collection(db, "eTrucks"), {
      regNumber,
      weight,
      isAvailable: true,
      trips: 0,
      truckOwnerId: auth.currentUser.uid,
    })
      .then((res) => {
        navigate("/");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setAlert((prev) => {
          return { ...prev, alert: true, message: "Could not add truck" };
        });
        setLoading(false);
      });
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
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Add Truck</span>
      </div>
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="bg-white rounded  shadow-sm m-3 p-3">
          {alert.alert && (
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
                  onChange={(e) => {
                    setRegNumber(e.target.value.toUpperCase());
                    setRegNumberError("");
                  }}
                />
                {regNumberError && (
                  <div
                    className="text-danger small my-2"
                    style={{ fontSize: ".6em" }}
                  >
                    <span>{regNumberError}</span>
                  </div>
                )}
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
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setWeightError("");
                  }}
                />
                {weightError && (
                  <div
                    className="text-danger small my-2"
                    style={{ fontSize: ".6em" }}
                  >
                    <span>{weightError}</span>
                  </div>
                )}
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
