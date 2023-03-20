import { useEffect, useState } from "react";
import { FaTimes, FaTruckMoving } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTrucks } from "../context/StateProvider";

const styles = {
  iconLarge: {
    color: "white",
    backgroundColor: "#32a885",
    opacity: 0.8,
    fontSize: "3em",
    padding: "6px",
    margin: "6px",
    borderRadius: "50%",
  },
};

const Trip = () => {
  const [trip, setTrip] = useState([]);
  const { trucks } = useTrucks();

  useEffect(() => {
    for (let i = 0; i < trucks.trucks.length; i++) {
      let truck = trucks.trucks[i];
      if (!truck.isAvailable) {
        setTrip((prev) => [...prev, truck]);
      }
    }
    return () => {
      setTrip([]);
    };
  }, [trucks]);
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted d-flex justify-content-between align-items-center">
        <span>On Trip</span>
        <span>
          <Link to="/" className="text-decoration-none ridelink-color">
            <FaTimes
              className="icon iconSmall me-3"
              style={{ backgroundColor: "red" }}
            />
          </Link>
        </span>
      </div>

      <div className="d-flex  flex-wrap justify-content-center">
        {trip.map((truck, index) => {
          return (
            <div
              className="d-flex flex-row m-3 p-4 bg-white shadow-sm rounded"
              style={{ width: "367px" }}
              key={index}
            >
              <span>
                <FaTruckMoving style={styles.iconLarge} />
              </span>
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column justify-content-between my-2">
                  <span className="text-danger px-1">{truck.regNumber}</span>
                  <span
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    className="px-1"
                  >
                    Registration Number
                  </span>
                </div>
                <div className="d-flex flex-column my-2">
                  <div className="d-flex flex-column">
                    <div>
                      <span className="text-muted px-1">{truck.weight}</span>
                      <span
                        className="px-1 text-muted"
                        style={{ fontSize: ".6em", fontWeight: "lighter" }}
                      >
                        Tonnes
                      </span>
                    </div>
                    <span
                      className="px-1"
                      style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    >
                      Weight
                    </span>
                  </div>
                </div>
                {/* <div className="d-flex flex-column my-2"> */}
                {/* <span className="px-1 text-muted">{order.date}</span>
                  <span
                    className="px-1"
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                  >
                    Proposed Date
                  </span> */}
                {/* {truck.element} */}
                {/* </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trip;
