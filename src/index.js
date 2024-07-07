document.addEventListener("DOMContentLoaded", function () {
  const optionsList = document.querySelector(".options-list");
  const searchInput = document.getElementById("searchInput");
  const filterOptions = document.getElementById("filterOptions");
  const paginationButtons = document.getElementById("paginationButtons");

  const itemsPerPage = 10;
  let currentPage = 1;
  let options = []; // Initialize options array

  function fetchDataAndInitialize() {
    fetch("optionsData.json")
      .then((response) => response.json())
      .then((data) => {
        // Assign data to the outer scoped 'options' array
        options = data.map((item) => ({
          id: item.id,
          name: item.name,
          basedIn: item.basedIn,
        }));

        initialize(options);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function initialize(options) {
    function filterAndSearchOptions() {
      const searchQuery = searchInput.value.trim().toLowerCase();
      const filterValue = filterOptions.value.toLowerCase();

      let filterValues = [];

      // Handle the case where multiple values are selected
      if (filterValue === "all") {
        filterValues = options.map((option) => option.basedIn.toLowerCase());
      } else if (filterValue.includes(",")) {
        filterValues = filterValue.split(",").map((item) => item.trim());
      } else {
        filterValues = [filterValue];
      }

      const searchedOptions = options.filter((option) => {
        const nameMatch = option.name.toLowerCase().includes(searchQuery);
        const basedInNormalized = option.basedIn.toLowerCase();

        // Check if basedInNormalized includes any of the filterValues
        const basedInMatch = filterValues.some((value) => {
          // Handle the case where "USA" should match "United States"
          if (value === "usa") {
            return (
              basedInNormalized.includes("usa") ||
              basedInNormalized.includes("united states")
            );
          } else {
            return basedInNormalized.includes(value);
          }
        });

        return nameMatch && basedInMatch;
      });

      currentPage = 1; // Reset current page when filter changes
      displayOptions(currentPage, searchedOptions, itemsPerPage, optionsList);
      createPaginationButtons(
        searchedOptions,
        itemsPerPage,
        displayOptions,
        optionsList,
        paginationButtons
      );
    }

    function createPaginationButtons(
      options,
      itemsPerPage,
      displayOptions,
      optionsList,
      paginationButtons
    ) {
      const totalPages = Math.ceil(options.length / itemsPerPage);
      paginationButtons.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", function () {
          currentPage = i;
          displayOptions(currentPage, options, itemsPerPage, optionsList);
          updatePaginationButtons(currentPage);
        });
        paginationButtons.appendChild(button);
      }

      updatePaginationButtons(currentPage);
    }

    function updatePaginationButtons(currentPage) {
      const buttons = paginationButtons.getElementsByTagName("button");
      for (let button of buttons) {
        if (parseInt(button.textContent) === currentPage) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      }
    }

    function displayOptions(page, options, itemsPerPage, optionsList) {
      optionsList.innerHTML = "";

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedOptions = options.slice(startIndex, endIndex);

      paginatedOptions.forEach((option, index) => {
        const row = document.createElement("tr");
        row.classList.add("option");
        row.style.cursor = "pointer"; // Make the row look clickable

        const cellNo = document.createElement("td");
        cellNo.textContent = startIndex + index + 1;
        row.appendChild(cellNo);

        const cellName = document.createElement("td");
        cellName.textContent = option.name;
        row.appendChild(cellName);

        const cellAction = document.createElement("td");
        cellAction.classList.add("columnOption");
        cellAction.textContent = "View"; // Display 'View' text directly in the cell
        row.appendChild(cellAction);

        // Make entire row clickable
        row.addEventListener("click", function () {
          console.log(`Opened option: ${option.name}`);
          window.location.href = `setupOverview.html?id=${option.id}`;
        });

        optionsList.appendChild(row);
      });
    }

    // Initial display
    displayOptions(currentPage, options, itemsPerPage, optionsList);
    createPaginationButtons(
      options,
      itemsPerPage,
      displayOptions,
      optionsList,
      paginationButtons
    );

    // Event listeners
    searchInput.addEventListener("input", filterAndSearchOptions);
    filterOptions.addEventListener("change", filterAndSearchOptions);
  }

  // Fetch data and initialize
  fetchDataAndInitialize();
});
