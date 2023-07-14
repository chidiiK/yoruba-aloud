// 1. get the button using its ID and assign to variable "login"
const login = document.getElementById("login");

// login.innerHTML = "Login";

// 2. adding event listener to button

login.addEventListener("submit", (event) => {
  event.preventDefault();

  // 3. getting the id for input and assigning to variable "username" && "password"

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  login.innerHTML = "signing in";
  login.classList.add("pulse");

  // 4. conditional statement to check for empty strings in input

  if (email === " " || password === " ") {
    swal.fire({
      icon: "info",
      text: "all fields are required",
      confirmButtonText: "ok",
    });

    login.innerHTML = "Login";
    login.classList.remove("pulse");
  }

  // 5.  creating a new object and appending key value pairs "username & password"
  else {
    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);

    // 6. creating an API post request object, using "method" and "body" properties, and takes them to the backend to fetch the data

    const loginReq = {
      method: "POST",
      body: loginData,
    };

    // 7. creating a url variable and assigning it a path for api endpoint

    const URL = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

    // 8. Making a request to fetch data from the backend of the specified url, also uses promises to link request and result

    fetch(URL, loginReq)
      .then((response) => response.json())
      .then((result) => {
        console.log("result----->", result);

        // 9. sending and storing data in the localStorage

        localStorage.setItem("adminObj", JSON.stringify(result));

        const getAdminObj = localStorage.getItem("adminObj");
        const adminObj = JSON.parse(getAdminObj);

        // 10. conditional statement to check if "adminobj" has username property stored

        if (adminObj.hasOwnProperty("email")) {
          // 11. if this returns true the user would be directed to the dashboard.html href link

          location.href = "dashboard.html";
        }

        // 12. if false it shows an error message to user
        else {
          swal.fire({
            icon: "warning",
            tittle: "Login unsuccesful",
            text: "wrong username or password",
          });
        }

        login.textContent = "Sign In";
        login.classList.remove("pulse");
      });
  }
});
