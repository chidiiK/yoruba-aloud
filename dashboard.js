let toggle = document.querySelector(".toggle");
let nav = document.querySelector(".nav");
let card = document.querySelector(".cards-container");

toggle.addEventListener("click", function () {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    card.classList.remove("active");
  } else {
    nav.classList.add("active");
    card.classList.add("active");
  }
});

function getDashboardInfo() {
  const pageModal = document.getElementById("pageModal");
  //   pageModal.style.display = "flex";

  const authToken = localStorage.getItem("adminObj");
  const tokenAcquired = JSON.parse(authToken);
  const token = tokenAcquired.token;

  const dashboardInfoHeader = new Headers();

  dashboardInfoHeader.append("Authorization", `Bearer ${token}`);

  const dashboardReq = {
    method: "GET",
    headers: dashboardInfoHeader,
  };

  //   const URL = 'https://jsonplaceholder.typicode.com/users'
  const URL =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

  const resultData = [];

  fetch(URL, dashboardReq)
    .then((res) =>
      // console.log(res)
      res.json()
    )
    .then((result) => {
      const getCategory = document.getElementById("category");
      const getLearningMaterials = document.getElementById("learningMaterials");
      const getSubCategory = document.getElementById("subCategories");
      const getQuiz = document.getElementById("totalQuiz");
      const gettotalStudents = document.getElementById("totalStudents");
      // const topthree = document.getElementById("topThreeStudents");

      getCategory.innerHTML = `${result.total_number_of_categories}`;
      getLearningMaterials.innerHTML = `${result.total_number_of_learningmaterial}`;
      getSubCategory.innerHTML = `${result.total_number_of_subcategories}`;
      getQuiz.innerHTML = `${result.total_number_of_quize}`;
      gettotalStudents.innerHTML = `${result.total_number_of_students}`;

      pageModal.style.display = "none";
    })
    .catch((error) => console.log("error", error));
}

getDashboardInfo();

const topThreeStudent = document.getElementById("topThreeStudents");

topThreeStudent.addEventListener("click", (event) => {
  event.preventDefault();

  const studentModal = document.getElementById("studentModal");

  studentModal.style.display = "block";

  const authToken = localStorage.getItem("adminObj");
  const tokenAcquired = JSON.parse(authToken);
  const token = tokenAcquired.token;

  const headers = new Headers();

  headers.append("Authorization", `Bearer ${token}`);

  const topThreeReq = {
    method: "GET",
    headers: headers,
  };

  const URL =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";

  let resultData = [];

  fetch(URL, topThreeReq)
    .then((res) => res.json())
    .then((result) => {

      if (result.length !== 0 ){
        const table = document.getElementById("table");
        // table.style.display ="none";
      }
      const getBestStudents = document.getElementById("topThreeScores");

      if (result.length === 0) {
        getBestStudents.innerHTML = "No Information Found";
      }

      result.map((item) => {
        resultData.push(`
              <div class="search-card">
                <div class="card">
                  <p>Name:</p>
                  <p>${item.name}</p>
                </div>
                <div class="card">
                  <p>Email:</p>
                  <p>${item.email}</p>
                </div>
                <div class="card">
                  <p>Phone Number:</p>
                  <p>${item.phone_number}</p>
                </div>
                <div class="card">
                  <p>Position:</p>
                  <p>${item.position}</p>
                </div>
                <div class="card">
                  <p>Total Score:</p>
                  <p>${item.total_score}</p>
                </div>
              </div>
            `);
      });

      getBestStudents.innerHTML = resultData.join("");

      studentModal.classList.add("show");
    });
});

function closeStudentModal() {
  const studentModal = document.getElementById("studentModal");
  studentModal.style.display = "none";
}

function fetchAllStudents() {
  const table = document.getElementById("table");
  //   table.style.display = "block";

  const authToken = localStorage.getItem("adminObj");

  const tokenAcquired = JSON.parse(authToken);

  const token = tokenAcquired.token;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const request = {
    method: "GET",
    headers: headers,
  };

  const resultData = [];

  const URL =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";

  fetch(URL, request)
  .then((response) => response.json())


    .then((result) => {
      console.log(result);

      const tableContainer = document.getElementById("allStudents");

      if (result.length === 0) {
        tableContainer.innerHTML = "No Registered Student";
      } else {
        result.map((item) => {
          resultData.push(`
              <tr>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone_number}</td>
                <td>${item.position}</td>
                <td>${item.total_score}</td>
              </tr>
            `);
        });

        tableContainer.innerHTML = resultData.join("");
      }
    })

    .catch((error) => console.log("Error:", error));
}

fetchAllStudents();
