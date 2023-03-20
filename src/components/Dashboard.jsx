import { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { FaCheck } from "react-icons/fa";
import { useTrucks } from "../context/StateProvider";
import { ACTIONS } from "../context/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Dashboard = () => {
  const { trucksDispatch } = useTrucks();
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(0);
  const [trip, setTrip] = useState(0);
  const [data, setData] = useState({});
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(
  //         `${process.env.REACT_APP_API_HOST}/truck_owner/trucks/${id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       const data = await res.json();
  //       setData(data.data);
  //       dataDispatch({ type: ACTIONS.ADD_DATA, data: data.data });
  //       if (data.data) {
  //         setTrucks(data.data.length);
  //         for (let i = 0; i < data.data.length; i++) {
  //           let trips = data.data[i].trips;
  //           setTrips((prev) => prev + trips.length);
  //         }
  //       }
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id, dataDispatch]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       navigate("/login");
  //     }
  //     setLoading(false);
  //   });
  // }, [navigate]);

  useEffect(() => {
    let unsubcribeFromFirestore;
    const unsubcribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const querySnapShot = query(
          collection(db, "eTrucks"),
          "eTrucks",
          where("truckOwnerId", "==", auth.currentUser.uid)
        );
        unsubcribeFromFirestore = onSnapshot(querySnapShot, (snapshot) => {
          if (snapshot.empty) {
            setDisplay(false);
            setLoading(false);
          } else {
            for (let i = 0; i < snapshot.docs.length; i++) {
              let truck = snapshot.docs[i].data();
              if (truck.isAvailable) {
                setAvailable((prev) => prev + 1);
              } else {
                setTrip((prev) => prev + 1);
              }
            }

            let trucksArray = [];
            for (let i = 0; i < snapshot.docs.length; i++) {
              const truck = {
                ...snapshot.docs[i].data(),
                id: snapshot.docs[i].id,
              };
              trucksArray.push(truck);
            }

            trucksDispatch({ type: ACTIONS.ADD_TRUCKS, trucks: trucksArray });

            setLoading(false);
            setDisplay(true);
          }
        });
      } else {
        navigate("/login");
        if (unsubcribeFromFirestore) {
          unsubcribeFromFirestore();
        }
      }
    });
    return () => {
      unsubcribeFromAuth();
      setAvailable(0);
      setTrip(0);
      if (unsubcribeFromFirestore) {
        unsubcribeFromFirestore();
      }
    };
  }, [navigate]);
  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Dashboard</span>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap"></div>
      {display && (
        <div>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Trucks Available
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaCheck className="icon iconSmall" />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {available}
                </span>
              </div>
              <div className="mt-3">
                {available > 0 ? (
                  <Link
                    to="available"
                    className="text-decoration-none ridelink-color"
                  >
                    View available Trucks
                  </Link>
                ) : (
                  <span className="text-muted">No orders delivered</span>
                )}
              </div>
            </div>
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Trucks on Trips
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaCheck
                    className="icon iconSmall"
                    style={{ backgroundColor: "#ffc107" }}
                  />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {trip}
                </span>
              </div>
              <div className="mt-3">
                {trip > 0 ? (
                  <Link
                    to="trip"
                    className="text-decoration-none ridelink-color"
                  >
                    View trucks on trips
                  </Link>
                ) : (
                  <span className="text-muted">No trucks on trips</span>
                )}
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      )}
      {!display && (
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
