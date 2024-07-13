// golbal variables
var pageIndex = 1;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWEyODFjZjBkNzgwYmE2MTJlOGU1YmE5NTU3NmJiMSIsIm5iZiI6MTcyMDg2NTU4My45MjQ1NzksInN1YiI6IjY2OTI1MTI3NjIyZDc4ODU5NTVlOGJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx2D2RyELpwPD-xsNK-Ky3t56WneQ8Rcb5O-UwIo_XM",
  },
};
async function ApiCall(request, options) {
  const response = fetch(request, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
  return response;
}

var button = document.querySelector("#search-button");
button.onclick = async () => {
    let backButton = document.querySelector("#back-button");
    backButton.classList.replace("d-none","d-felx");
    input
    backButton.onclick = ()=>{
        backButton.classList.replace("d-felx", "d-none");
          let input = document.querySelector("#search-input");
          input.value = "";
        loadTrendingData();
    }
  var input = document.querySelector("#search-input").value;
  if (input.length >= 3) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWEyODFjZjBkNzgwYmE2MTJlOGU1YmE5NTU3NmJiMSIsIm5iZiI6MTcyMDg2NTU4My45MjQ1NzksInN1YiI6IjY2OTI1MTI3NjIyZDc4ODU5NTVlOGJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx2D2RyELpwPD-xsNK-Ky3t56WneQ8Rcb5O-UwIo_XM",
      },
    };
    input = input.replace(/ /g, "%20");
    const request = `https://api.themoviedb.org/3/search/keyword?query=${input}&page=1`;
    fetch(request, options)
      .then((response) => response.json())
      .then((response) => response)
      .then((data) => {
        console.log(data);
        let moviesContainer = document.querySelector("#movies-container");
        moviesContainer.className = "container w-100";
        moviesContainer.innerHTML = "";
        let moviesPageContainer = document.createElement("div");
        moviesPageContainer.className =
          "row bg-light gap-2 justify-content-center";
        moviesPageContainer.innerHTML = "";
        // moviesPageContainer.id = `page#${pageIndex}`;
        console.log(data.results[0].poster_path);
        for (let i = 0; i < data.results.length; i++) {
          console.log("here");
          let movieItem = document.createElement("div");
          movieItem.className =
            "card col-12 col-sm-6 col-md-3 col-lg-2 text-center shadow bg-body-tertiary rounded object-fit-cover p-0";
          let movieImgContainer = document.createElement("div");
          movieImgContainer.className = "card-img-container";
          let movieImg = document.createElement("img");
          movieImg.id = "card-img";
          movieImg.className = "card-img-top";
          //  let imgPath = await ApiCall(request, optionsGet);
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWEyODFjZjBkNzgwYmE2MTJlOGU1YmE5NTU3NmJiMSIsIm5iZiI6MTcyMDg2NTU4My45MjQ1NzksInN1YiI6IjY2OTI1MTI3NjIyZDc4ODU5NTVlOGJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx2D2RyELpwPD-xsNK-Ky3t56WneQ8Rcb5O-UwIo_XM",
            },
          };

          fetch(
            `https://api.themoviedb.org/3/movie/${data.results[i].id}/images?include_image_language=en&language=english`,
            options
          )
            .then((response) => response.json())
            .then((response) => response)
            .then((data) => {
              movieImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${data.backdrops[0].file_path}`;
              movieImgContainer.appendChild(movieImg);
              movieItem.appendChild(movieImgContainer);
            });

          let cardBody = document.createElement("div");
          cardBody.className = "card-body";
          let cardTitle = document.createElement("p");
          cardTitle.className = "card-text fw-bold title m-1 p-0";
          cardTitle.innerHTML = data.results[i].name;
          cardBody.appendChild(cardTitle);

          //   let cardReleaseDate = document.createElement("p");
          //   cardReleaseDate.className = "card-text date m-1 p-0";
          //   //    let releaseDateRequest = `https://api.themoviedb.org/3/movie/${data.results[i].id}/release_dates`;
          //   //    let releaseDate = await ApiCall(releaseDateRequest, optionsGet);
          //   cardReleaseDate.innerHTML = data.results[i].release_date;
          //   cardBody.appendChild(cardReleaseDate);
          movieItem.appendChild(cardBody);
          moviesPageContainer.appendChild(movieItem);
        }
        moviesContainer.appendChild(moviesPageContainer);
      });
    //console.log(data.results)
  }
};

var lastestButton = document.querySelector("#latest-movies");
lastestButton.onclick = () => {
  fetch("https://api.themoviedb.org/3/movie/latest", options)
    .then((response) => response.json())
    .then((response) => response)
    .then((data) => {
      console.log(data);
      let moviesContainer = document.querySelector("#movies-container");
      moviesContainer.className = "container w-100";
      moviesContainer.innerHTML = "";
      let moviesPageContainer = document.createElement("div");
      moviesPageContainer.className =
        "row bg-light gap-2 justify-content-center";
      moviesPageContainer.innerHTML = "";
      // moviesPageContainer.id = `page#${pageIndex}`;
      console.log(data.results[0].poster_path);
      for (let i = 0; i < data.results.length; i++) {
        console.log("here");
        let movieItem = document.createElement("div");
        movieItem.className =
          "card col-12 col-sm-6 col-md-3 col-lg-2 text-center shadow bg-body-tertiary rounded object-fit-cover p-0";
        let movieImgContainer = document.createElement("div");
        movieImgContainer.className = "card-img-container";
        let movieImg = document.createElement("img");
        movieImg.id = "card-img";
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
        moviesPageContainer.appendChild(movieItem);
      }
      moviesContainer.appendChild(moviesPageContainer);
    })
    .catch((err) => console.error(err));
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

let data = [];


function loadTrendingData(){
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => response)
  .then((data) => {
    let moviesContainer = document.querySelector("#movies-container");
    moviesContainer.className = "container w-100";
    moviesContainer.innerHTML = "";
    let moviesPageContainer = document.createElement("div");
    moviesPageContainer.className = "row bg-light gap-2 justify-content-center";
    moviesPageContainer.innerHTML = "";
    // moviesPageContainer.id = `page#${pageIndex}`;
    console.log(data.results[0].poster_path);
    for (let i = 0; i < data.results.length; i++) {
      console.log("here");
      let movieItem = document.createElement("div");
      movieItem.className =
        "card col-12 col-sm-6 col-md-3 col-lg-2 text-center shadow bg-body-tertiary rounded object-fit-cover p-0";
      let movieImgContainer = document.createElement("div");
      movieImgContainer.className = "card-img-container";
      movieImgContainer.onmouseover = () => chaningingImgs(data.results[i].id);
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
      moviesPageContainer.appendChild(movieItem);
    }
    moviesContainer.appendChild(moviesPageContainer);
  })
  .catch((err) => console.error(err));

}
loadTrendingData();