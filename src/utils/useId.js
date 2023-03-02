const useId = () => {
  return sessionStorage.getItem("truckOwnerId") ?? false;
};

export default useId;
