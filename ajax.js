const btnSearch = document.querySelector("#btnSearch");
const input = document.querySelector("#txtSearch");

btnSearch.addEventListener("click", function () {
  let txt = input.value;
  getCountry(txt);
});
function getCountry(country) {
  const request = new XMLHttpRequest();
  request.open("GET", "https://restcountries.com/v3.1/name/" + country);
  request.send();

  request.addEventListener("load", function () {
    //   const data = this.responseText;
    // change string to json
    const data = JSON.parse(this.responseText);
    renderCountry(data[0]);
    const countries = data[0].borders.toString();
    //add neightboor
    const req = new XMLHttpRequest();
    req.open("GET", "https://restcountries.com/v3.1/alpha?codes=" + countries);
    req.send();
    req.addEventListener("load", function () {
      const data = JSON.parse(this.responseText);
      renderNeighbors(data);
    });
  });
}
function renderCountry(data) {
  let html = `
  <div class="card-header">Result</div>
  <div class="card-body">
    <div class="row">
      <div class="col-4">
        <img src="${data.flags.png}" alt="CountryImage" />
      </div>
      <div class="col-8">
        <h5 class="card-title">${data.name.common}</h5>
        <hr />
        <div class="row">
          <div class="col-4">Population</div>
          <div class="col-8">${(data.population / 1000000).toFixed(
            1
          )} milyon</div>
        </div>
        <div class="row">
          <div class="col-4">Legal Language</div>
          <div class="col-8">${Object.values(data.languages)}</div>
        </div>
        <div class="row">
          <div class="col-4">Capital:</div>
          <div class="col-8">${data.capital[0]}</div>
        </div>
        <div class="row">
        <div class="col-4">Money:</div>
        <div class="col-8">${Object.values(data.currencies)[0].name} (${
    Object.values(data.currencies)[0].symbol
  })</div>
      </div>
      </div>
    </div>
  </div>
    `;
  document.querySelector("#country-details").innerHTML = html;
  //   for (let country of data) {
  //     const html = `
  //     <div class="card" style="width: 300px;">
  //     <img src="${country.flags.png}" class="card-img-top" alt="image">
  //     <div class="card-body">
  //       <h5 class="card-title">${country.name.common}</h5>
  //       <p class="card-text">Languages: ${Object.values(country.languages)}</p>
  //       <a href="#" class="btn btn-primary">Go somewhere</a>
  //     </div>
  //     </div>`;
  //     document
  //       .querySelector(".container .row")
  //       .insertAdjacentHTML("beforeend", html);
  //   }
}
function renderNeighbors(data) {
  let html = "";
  for (country of data) {
    html += `
    <div class="col-2 mt-2">
        <div class="card">
          <img src="${country.flags.png}" alt="" class="card-img-top" id="nimage" />
          <div class="card-body">
            <h6 class="card-title">${country.name.common}</h6>
          </div>
        </div>
      </div>
    `;
  }
  document.querySelector("#neighbors").innerHTML = html;
}
