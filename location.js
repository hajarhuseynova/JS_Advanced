const btnSearch = document.querySelector("#btnSearch");
const btnLocation = document.querySelector("#btnLocation");
const input = document.querySelector("#txtSearch");
const loading = document.querySelector("#loading");
const errors = document.getElementById("errors");
const details = document.querySelector("#details");
const cdetails = document.querySelector("#country-details");
const neighbors = document.querySelector("#neighbors");

btnSearch.addEventListener("click", function () {
  let txt = input.value;
  details.style.opacity = 0;
  loading.style.display = "block";
  getCountry(txt);
});
btnLocation.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
});
async function onSuccess(position) {
  loading.style.display = "block";

  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  // opencagedata api
  const api_key = "1b4b8d27061a4811b38d65863414486b";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`;

  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  console.log(data);
  const country = data.results[0].components.country;

  input.value = country;
  btnSearch.click();
}
function onError(err) {
  console.log(err);
  loading.style.display = "none";
}
async function getCountry(country) {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/name/" + country
    );
    if (!response.ok) {
      throw new Error("Can not find");
    }
    const data = await response.json();
    renderCountry(data[0]);
    const countries = data[0].borders;
    if (!countries) {
      throw new Error("Can not find neighbors");
    }
    const response2 = await fetch(
      "https://restcountries.com/v3.1/alpha?codes=" + countries.toString()
    );
    const data2 = await response2.json();
    renderNeighbors(data2);
  } catch (err) {
    renderError(err);
  }
}
function renderCountry(data) {
  loading.style.display = "none";

  cdetails.innerHTML = "";
  neighbors.innerHTML = "";
  let html = `

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
 
    `;
  details.style.opacity = 1;
  document.querySelector("#country-details").innerHTML = html;
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

function renderError(err) {
  loading.style.display = "none";

  const html = `
<div class="alert alert-danger">
${err.message}
</div>
`;
  setTimeout(() => {
    errors.innerHTML = "";
  }, 5000);
  errors.innerHTML = html;
}
