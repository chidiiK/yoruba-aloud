const signUp = document.getElementById("signUp");

signUp.innerText = "Sign up";

signUp.addEventListener("click", (event) => {
  event.preventDefault();

  //get inputs using getelementbyid method
  const name = document.getElementById("name").value;
//   const userName = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  signUp.innerText = "Loading....";

  // conditional statement to check for empty strings from user
  if (
    name === "" ||
    // userName === "" ||
    password === "" ||
    confirmPassword === "" ||
    email === ""
  ) {
    swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonText: "ok",
    });
    signUp.innerText = "Sign Up";
  } else if (password !== confirmPassword) {
    swal.fire({
      icon: "info",
      text: "Passwords do not match",
      confirmButtonText: "ok",
    });
    signUp.innerText = "Sign Up";
  } else {
    const signUpData = new FormData();
    signUpData.append("name", name);
    // signUpData.append("username", userName);
    signUpData.append("email", email);
    signUpData.append("password", password);
    signUpData.append("password_confirmation", confirmPassword);

    const signReq = {
      method: "POST",
      body: signUpData,
    };

    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

    fetch(URL, signReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.status);
        if (result.status === "success") {
          swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonText: "ok",
          });

          setTimeout(() => {
            location.href = "login.html";
          }, 5000);
        } else {
          // Error message
          let errorMessage = "Registration Unsuccessful!"; // Default error message
          if (result.message) {
            // Extract the first error message from the result
            const keys = Object.keys(result.message);
            const firstErrorKey = keys[0];
            if (result.message[firstErrorKey].length > 0) {
              errorMessage = result.message[firstErrorKey][0];
            }
          }
          swal.fire({
            icon: "error",
            text: errorMessage,
            confirmButtonText: "OK",
          });
          signUp.innerText = "Sign Up";
        }
      })
      .catch((error) => console.log(error));
  }
});

