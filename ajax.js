function displayCountry(country) {
  const request = new XMLHttpRequest();
  request.open("GET", "https://restcountries.com/v3.1/name/" + country);
  request.send();

  request.addEventListener("load", function () {
    //   const data = this.responseText;
    // change string to json
    const data = JSON.parse(this.responseText);
    setCountry(data[0]);
    console.log(data[0]);
  });
}
function setCountry(data) {
  const html = `
<div class="card" style="width: 300px;">
<img src="${data.flags.png}" class="card-img-top" alt="image">
<div class="card-body">
  <h5 class="card-title">${data.name.common}</h5>
  <p class="card-text">Languages: ${Object.values(data.languages)}</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>`;
  document
    .querySelector(".container .row")
    .insertAdjacentHTML("beforeend", html);
}
displayCountry("italy");
