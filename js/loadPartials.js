// loadPartials.js
function loadHeaderFooter() {
  fetch("partials/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
      applyLanguage();
    });

  fetch("partials/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
      applyLanguage();
    });
}

document.addEventListener("DOMContentLoaded", loadHeaderFooter);
