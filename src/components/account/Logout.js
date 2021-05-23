function Logout() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    localStorage.removeItem("userData");
  } else {
    return false;
  }
}
export default Logout;
