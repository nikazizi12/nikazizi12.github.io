// loadHeaderFooter.js
function loadHeaderFooter() {
    fetch("partials/header.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("header-placeholder").innerHTML = data;
      });
  
    fetch("partials/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer-placeholder").innerHTML = data;
      });
  }
  
  document.addEventListener("DOMContentLoaded", loadHeaderFooter);
  