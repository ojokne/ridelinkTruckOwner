import { createContext, useContext, useReducer } from "react";
import { truckReducer } from "./truckReducer";

const TruckContext = createContext();

export const StateProvider = ({ children }) => {
  const [trucks, trucksDispatch] = useReducer(truckReducer, {});
  return (
    <TruckContext.Provider value={{ trucks, trucksDispatch }}>
      {children}
    </TruckContext.Provider>
  );
};

export const useTrucks = () => {
  return useContext(TruckContext);
};
