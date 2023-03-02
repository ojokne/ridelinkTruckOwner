const useToken = () => {
  return sessionStorage.getItem("truckOwnerToken") ?? false;
};

export default useToken;
