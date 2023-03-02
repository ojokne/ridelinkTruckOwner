import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { FaTruckMoving } from "react-icons/fa";
import { useData } from "../context/StateProvider";
import { ACTIONS } from "../context/actions";
import useId from "../utils/useId";
import useToken from "../utils/useToken";

const Dashboard = () => {
  const id = useId();
  const token = useToken();
  const { dataDispatch } = useData();
  const [loading, setLoading] = useState(false);
  const [trucks, setTrucks] = useState(0);
  const [trips, setTrips] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_HOST}/truck_owner/trucks/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        setData(data.data);
        dataDispatch({ type: ACTIONS.ADD_DATA, data: data.data });
        if (data.data) {
          setTrucks(data.data.length);
          for (let i = 0; i < data.data.length; i++) {
            let trips = data.data[i].trips;
            setTrips((prev) => prev + trips.length);
          }
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dataDispatch]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Dashboard</span>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap"></div>
      {data.length > 0 && (
        <div>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Trucks
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaTruckMoving className="icon iconMenu me-3" />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {trucks}
                </span>
              </div>
            </div>
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Trips
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaTruckMoving className="icon iconMenu me-3" />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {trips}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!data.length > 0 && (
        <div className="m-3 p-3 bg-white shadow-sm rounded lead text-center">
          <p> You have not added any trucks</p>
          <p>
            <Link to="add_truck" className="text-decoration-none">
              Add Truck
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
