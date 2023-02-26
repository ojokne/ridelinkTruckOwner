import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCheck, FaClock, FaTruckMoving } from "react-icons/fa";
import { useData } from "../context/StateProvider";

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

const Trucks = () => {
  const { data } = useData();
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (data.hasOwnProperty("data")) {
      if (data.data.length) {
        for (let i = 0; i < data.data.length; i++) {
          let element = null;
          let truck = data.data[i].truck;
          let str = String(truck.regNumber).toUpperCase();
          let first = str.substring(0, 3);
          let second = str.substring(3, 6);
          let third = str.substring(6);
          let regNumber = `${first} - ${second} - ${third}`;
          if (truck.isAvailable) {
            element = (
              <span className="d-flex align-items-center">
                <FaCheck className="iconSmall" />
                <span className="text-muted">Available</span>
              </span>
            );
          } else {
            element = (
              <span>
                <FaClock
                  className="iconSmall"
                  style={{ backgroundColor: "#ffc107" }}
                />
                <span className="text-muted">On trip</span>
              </span>
            );
          }
          let obj = {
            regNumber,
            weight: truck.weight,
            element,
          };
          setTrucks((prev) => [...prev, obj]);
        }
        setDisplay(true);
      }
    }
  }, [data, navigate]);

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Trucks</span>
      </div>
      {display && (
        <div className="d-flex  flex-wrap">
          {trucks.map((truck, index) => {
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
                  <div className="d-flex flex-column my-2">
                    {/* <span className="px-1 text-muted">{order.date}</span>
                  <span
                    className="px-1"
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                  >
                    Proposed Date
                  </span> */}
                    {truck.element}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!display > 0 && (
        <div className="m-3 p-3 bg-white shadow-sm rounded lead text-center">
          <p> No data to display</p>
          <p>
            <Link to="/" className="text-decoration-none">
              Back Home
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Trucks;
