// golbal variables
var color_taken = localStorage.getItem("color");
let base_url = "https://api.themoviedb.org/3/";

var pageIndex = 1;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWEyODFjZjBkNzgwYmE2MTJlOGU1YmE5NTU3NmJiMSIsIm5iZiI6MTcyMDg2NTU4My45MjQ1NzksInN1YiI6IjY2OTI1MTI3NjIyZDc4ODU5NTVlOGJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx2D2RyELpwPD-xsNK-Ky3t56WneQ8Rcb5O-UwIo_XM",
  },
};
const ApiQuery = Object.freeze({
  1: "trending",
  2: "searching",
  3: "nowPlaying",
  4: "topRated",
  5: "upcoming",
  6: "popular",
  7: "favorite",
});

const titleMap = {
  topRated: "Top Rated",
  nowPlaying: "Now Playing",
  trending: "Trending",
  upcoming: "Upcoming",
  popular: "Popular",
  favorite: "Favorite",
};

const menuItems = [
  "nowPlaying",
  "popular",
  "topRated",
  "favorite",
  "upcoming",
  "favorite",
];

ApiCall("trending");
async function ApiCall(requestTitle, serchinput = "") {
  switch (requestTitle) {
    case ApiQuery[1]:
      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          loadData(data);
        })
        .catch((err) => console.error(err));
      break;
    case ApiQuery[2]:
      const request = `https://api.themoviedb.org/3/search/movie?query=${serchinput}&include_adult=false&language=en-US&page=1`;
      fetch(request, options)
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          loadData(data);
        });
      break;
    case ApiQuery[3]:
      fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          loadData(data);
        });
      break;
    case ApiQuery[4]:
      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          loadData(data);
        });
      break;
    case ApiQuery[5]:
      fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          loadData(data);
        });
      break;
    case ApiQuery[6]:
      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          loadData(data);
        });
      break;
    case ApiQuery[7]:
      fetch(
        "https://api.themoviedb.org/3/account/21380109/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
        options
      )
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          loadData(data);
        });
      break;
  }
}

// Searching part //

async function searchQuery() {
  var input = document.querySelector("#search-input").value;
  if (input.length >= 3) {
    let backButton = document.querySelector("#back-button");
    backButton.classList.replace("d-none", "d-felx");
    input;
    backButton.onclick = () => {
      backButton.classList.replace("d-felx", "d-none");
      let input = document.querySelector("#search-input");
      input.value = "";
      ApiCall(ApiQuery[1]);
    };
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWEyODFjZjBkNzgwYmE2MTJlOGU1YmE5NTU3NmJiMSIsIm5iZiI6MTcyMDg2NTU4My45MjQ1NzksInN1YiI6IjY2OTI1MTI3NjIyZDc4ODU5NTVlOGJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx2D2RyELpwPD-xsNK-Ky3t56WneQ8Rcb5O-UwIo_XM",
      },
    };
    input = input.replace(/ /g, "%20");
    ApiCall(ApiQuery[2], (searchinput = input));
  }
}

var button = document.querySelector("#search-button");
button.onclick = searchQuery;
var searchInput = document.querySelector("#search-input");
searchInput.type = button;

searchInput.onkeydown = async (event) => {
  if (event.keyCode === 13) {
    searchQuery();
  }
};
document.querySelector("#search-form").onsubmit = (event) => {
  event.preventDefault();
};

function chaningingImgs(index) {
  fetch(
    `https://api.themoviedb.org/3/movie/${index}/images?include_image_language=en&language=english`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .then((data) => {
      let i = Math.floor(Math.random() * data.backdrops.length);
      console.log(
        `https://media.themoviedb.org/t/p/w220_and_h330_face${data.backdrops[i].file_path}`
      );
      let maxindex = data.backdrops.length;
      let img = document.getElementById(index);
      img.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${data.backdrops[i].file_path}`;
    })
    .catch((err) => console.error(err));
}

function loadImgDescrption(data, index) {
  let description = document.createElement("div");
  description.className = "description overflow-hidden";

  let img = document.createElement("img");
  img.src = `https://media.themoviedb.org/t/p/w220_and_h330_face/${data.results[index].backdrop_path}`;
  img.className = "description-bg";

  let darkLayer = document.createElement("div");
  darkLayer.className = "dark-layer";

  description.appendChild(img);
  description.appendChild(darkLayer);

  let descriptionContent = document.createElement("div");
  descriptionContent.className = "description-content";

  let title = document.createElement("p");
  title.className = "title";
  title.innerHTML = data.results[index].title;
  descriptionContent.appendChild(title);

  let dateContainer = document.createElement("div");
  dateContainer.className = "date-container";

  let rate = document.createElement("p");
  rate.className = "rate";
  rate.innerHTML = data.results[index].vote_average;
  dateContainer.appendChild(rate);

  let descriptionData = document.createElement("p");
  descriptionData.className = "data";
  descriptionData.innerHTML = data.results[index].release_date;
  dateContainer.appendChild(descriptionData);

  descriptionContent.appendChild(dateContainer);

  let descriptionText = document.createElement("p");
  descriptionText.className = "description-text";
  descriptionText.innerHTML = data.results[index].overview;

  descriptionContent.appendChild(descriptionText);

  description.appendChild(descriptionContent);

  return description;
}

function loadData(data) {
  let doc = document.querySelector("#notFound");
  let moviesContainer = document.querySelector("#movies-container");
  moviesContainer.className = "container w-100";
  moviesContainer.innerHTML = "";
  let moviesPageContainer = document.createElement("div");
  moviesPageContainer.className = "row bg-light gap-4 justify-content-center ";
  moviesPageContainer.innerHTML = "";
  // moviesPageContainer.id = `page#${pageIndex}`;
  if (data.results.length != 0) {
    doc.classList.replace("d-flex", "d-none");
    // console.log(data.results[0].poster_path);

    for (let i = 0; i < data.results.length; i++) {
      let movieItem = document.createElement("div");
      movieItem.className =
        "card col-12  col-md-3  text-center shadow bg-body-tertiary rounded object-fit-cover p-0";
      let movieImgContainer = document.createElement("div");
      movieImgContainer.className = "card-img-container";
      // movieImgContainer.onmouseover = () => chaningingImgs(data.results[i].id);
      let movieImg = document.createElement("img");
      movieImg.id = data.results[i].id;
      movieImg.className = "card-img-top";
      //  let request = `https://api.themoviedb.org/3/movie/${data.results[i].id}/images?include_image_language=en&language=english`;
      //  let imgPath = await ApiCall(request, optionsGet);
      movieImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${data.results[i].poster_path}`;
      movieImgContainer.appendChild(movieImg);
      movieItem.appendChild(movieImgContainer);

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";
      let cardTitle = document.createElement("p");
      cardTitle.className = "card-text fw-bold title m-1 p-0";
      cardTitle.innerHTML = data.results[i].title;
      cardBody.appendChild(cardTitle);

      let cardReleaseDate = document.createElement("p");
      cardReleaseDate.className = "card-text date m-1 p-0";
      //    let releaseDateRequest = `https://api.themoviedb.org/3/movie/${data.results[i].id}/release_dates`;
      //    let releaseDate = await ApiCall(releaseDateRequest, optionsGet);
      cardReleaseDate.innerHTML = data.results[i].release_date;
      cardBody.appendChild(cardReleaseDate);
      movieItem.appendChild(cardBody);
      movieItem.appendChild(loadImgDescrption(data, i));
      moviesPageContainer.appendChild(movieItem);
    }
    moviesContainer.appendChild(moviesPageContainer);
  } else {
    doc.classList.replace("d-none", "d-flex");
  }
}

// setting icon and color changing part //

const settingsIcon = document.querySelector("#settings-icon");
const colorsContainer = document.querySelector(".setting");
document.documentElement.style.setProperty("--second-color", color_taken);
settingsIcon.onclick = function () {
  colorsContainer.classList.toggle("visible");
};
document.querySelectorAll(".color").forEach((item) => {
  item.addEventListener("click", (event) => {
    const color = event.target.getAttribute("data-color");
    document.documentElement.style.setProperty("--second-color", color);
    localStorage.setItem("color", color);
  });
});

// input validation part //

let alertContent = [
  {
    type: "text",
    valid: false,
    required: true,
    id: "userName",
    class: "form-control",
    placeholder: "Enter your Name",
  },
  {
    type: "email",
    valid: false,
    required: true,
    id: "userEmail",
    class: "form-control",
    placeholder: "Enter your email",
  },
  {
    type: "number",
    valid: false,
    required: true,
    id: "userPhone",
    class: "form-control",
    placeholder: "Enter your Phone",
  },
  {
    type: "userAge",
    valid: false,
    required: true,
    id: "userAge",
    class: "form-control",
    placeholder: "Enter your Age",
  },

  {
    type: "password",
    valid: false,
    required: true,
    id: "userPassword",
    class: "form-control",
    placeholder: "Enter your Password",
  },
  {
    type: "password",
    valid: false,
    required: true,
    id: "userValidationPassword",
    class: "form-control",
    placeholder: "Enter your ValidationPassword",
  },
];

function creatingAlertContainer() {
  let container = document.querySelector("#conatct-us");
  let contactUs = document.createElement("div");
  contactUs.className = "conatctUs";
  let header = document.createElement("div");
  header.className = "header";
  let inputTitel = document.createElement("p");
  inputTitel.innerHTML = "Contact Us";
  inputTitel.id = "input-title";
  header.appendChild(inputTitel);
  contactUs.appendChild(header);
  let inputs = document.createElement("div");
  inputs.className = "inputs";
  for (let i = 0; i < alertContent.length; i++) {
    let inputcontainer = document.createElement("div");
    inputcontainer.className = "input";
    let input = document.createElement("input");
    input.className = alertContent[i].class;
    input.id = alertContent[i].id;
    input.type = alertContent[i].type;
    input.placeholder = alertContent[i].placeholder;
    inputcontainer.appendChild(input);

    let inputAlert = document.createElement("div");
    inputAlert.className = "input-alert d-none";
    inputAlert.id = `${alertContent[i].id}-alter-container`;
    let inputAlertText = document.createElement("p");
    inputAlertText.innerHTML = alertContent[i].text;
    inputAlertText.id = `${alertContent[i].id}-alert-message`;
    inputAlert.appendChild(inputAlertText);
    inputcontainer.appendChild(inputAlert);
    inputs.appendChild(inputcontainer);
  }
  contactUs.appendChild(inputs);
  container.appendChild(contactUs);
}
creatingAlertContainer();

let inputName = document.querySelector("#userName");
inputName.onfocus = () => {
  let userValidationName = document.querySelector("#userName").value;
  let alertContainer = document.querySelector("#userName-alter-container");
  let userValidationNameAlert = document.querySelector(
    "#userName-alert-message"
  );
  if (userValidationName.length < 4) {
    // console.log(userValidationNameAlert);
    userValidationNameAlert.innerHTML =
      "Name must be at least 4 characters long";
    alertContainer.classList.replace("d-none", "d-flex");
  } else {
    alertContainer.classList.replace("d-flex", "d-none");
  }
};
inputName.onblur = () => {
  let alertContainer = document.querySelector("#userName-alter-container");
  alertContainer.classList.replace("d-flex", "d-none");
};

async function fetchValidationData() {
  try {
    const response = await fetch("./APIs/validations.json");
    const data = await response.json();
    validation(data);
  } catch (error) {
    console.error("Error fetching validation data:", error);
  }
}
fetchValidationData();
function validation(data) {
  data.forEach((inputData) => {
    const inputItem = document.querySelector(inputData.itemID);

    inputItem.onblur = inputItem.onchange = () => {
      const inputValue = inputItem.value;
      const alertContainer = document.querySelector(inputData.alertContainerId);
      const alertMessage = document.querySelector(inputData.alertMessageId);

      let isValid = true;

      if (inputData.itemID === "#userValidationPassword") {
        const originalPassword = document.querySelector("#userPassword").value;
        if (inputValue !== originalPassword) {
          alertMessage.innerHTML = "Passwords do not match.";
          alertContainer.classList.replace("d-none", "d-flex");
          isValid = false;
        }
      } else {
        for (const validation of inputData.validations) {
          const regex = new RegExp(validation.pattern);
          if (!regex.test(inputValue)) {
            console.log(inputValue);
            console.log(regex);
            alertMessage.innerHTML = validation.message;
            alertContainer.classList.replace("d-none", "d-flex");
            isValid = false;
            break;
          }
        }
      }
      if (isValid) {
        alertContainer.classList.replace("d-flex", "d-none");
      }
    };

    inputItem.onfocus = () => {
      const alertContainer = document.querySelector(inputData.alertContainerId);
      alertContainer.classList.replace("d-flex", "d-none");
    };
  });
}

//navbar part//
let navbutton = document.querySelector("#nav-button");
navbutton.onclick = () => {
  let nav = document.querySelector(".navbar");
  console.log(nav);
  nav.classList.toggle("nav-visible");
};

menuItems.forEach((item) => {
  let doc = document.querySelector(`#${item}`);
  doc.onclick = () => {
    let moviesTitle = document.querySelector("#title");
    moviesTitle.innerHTML = titleMap[item];
    ApiCall(item);
    let searchSection = document.querySelector("#search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
    let nav = document.querySelector(".navbar");
    console.log(nav);
    nav.classList.toggle("nav-visible");
  };
});
