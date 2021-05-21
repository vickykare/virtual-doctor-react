function IsLoggedIn() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    return true;
  } else {
    return false;
  }
}
export default IsLoggedIn;
