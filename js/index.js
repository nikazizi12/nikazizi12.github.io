document.addEventListener("DOMContentLoaded", function () {
  const optionsList = document.querySelector(".options-list");
  const setupList = document.getElementById('setupList');
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementsByClassName('close')[0];

  // let options = [];
  let setups = [];

  function fetchDataAndInitialize() {
    fetch("assets/optionsData.json")
      .then((response) => response.json())
      .then((data) => {
        // options = data.map((item) => ({
        //   id: item.id,
        //   name: item.name,
        //   basedIn: item.basedIn,
        //   imagePath: item.imagePath,
        //   description: item.description,
        //   sourceLink: item.sourceLink,
        // }));

        setups = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          imagePath: item.imagePath,
          sourceLink: item.sourceLink,
        }));

        // initialize(options);
        displaySetups(setups);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // function initialize(options) {
  //   function displayOptions(page, options, itemsPerPage, optionsList) {
  //     optionsList.innerHTML = "";

  //     const startIndex = (page - 1) * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;
  //     const paginatedOptions = options.slice(startIndex, endIndex);

  //     paginatedOptions.forEach((option, index) => {
  //       const row = document.createElement("tr");
  //       row.classList.add("option");
  //       row.style.cursor = "pointer"; // Make the row look clickable

  //       const cellNo = document.createElement("td");
  //       cellNo.textContent = startIndex + index + 1;
  //       row.appendChild(cellNo);

  //       const cellName = document.createElement("td");
  //       cellName.textContent = option.name;
  //       row.appendChild(cellName);

  //       const cellAction = document.createElement("td");
  //       cellAction.classList.add("columnOption");
  //       cellAction.textContent = "View"; // Display 'View' text directly in the cell
  //       row.appendChild(cellAction);

  //       // Make entire row clickable
  //       row.addEventListener("click", function () {
  //         console.log(`Opened option: ${option.name}`);
  //         window.location.href = `setupOverview.html?id=${option.id}`;
  //       });

  //       optionsList.appendChild(row);
  //     });
  //   }

  //   // Initial display
  //   displayOptions(1, options, 10, optionsList);
  // }

  // Display setups
  function displaySetups(setups) {
    setupList.innerHTML = '';
    setups.forEach(setup => {
        const setupDiv = document.createElement('div');
        setupDiv.classList.add('setup');
        
        const setupImg = document.createElement('img');
        setupImg.src = setup.imagePath;
        setupImg.alt = setup.name;
        setupImg.addEventListener('click', () => openModal(setup.imagePath));
        
        const setupCont = document.createElement('div');
        setupCont.onclick = () => window.open(`setupOverview.html?id=${setup.id}`, '_blank');
        const setupName = document.createElement('h3');
        setupName.textContent = setup.name;
        
        const setupDesc = document.createElement('p');
        setupDesc.textContent = setup.description;
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('affiliate-buttons');

        const viewSetupButton = document.createElement('button');
        viewSetupButton.textContent = 'View Setup Details';
        viewSetupButton.classList.add('affiliate-button');
        viewSetupButton.onclick = () => window.open(`setupOverview.html?id=${setup.id}`, '_blank');

        const viewComponentsButton = document.createElement('button');
        viewComponentsButton.textContent = 'View Owner Video';
        viewComponentsButton.classList.add('affiliate-button');
        viewComponentsButton.onclick = () => window.open(setup.sourceLink, '_blank');

        buttonsDiv.appendChild(viewSetupButton);
        buttonsDiv.appendChild(viewComponentsButton);

        setupDiv.appendChild(setupImg);
        setupCont.appendChild(setupName);
        setupCont.appendChild(setupDesc);
        setupDiv.appendChild(setupCont);
        setupDiv.appendChild(buttonsDiv);
        
        setupList.appendChild(setupDiv);
    });
  }

  // Open modal
  function openModal(image) {
      modalImg.src = image;
      imageModal.style.display = 'block';
  }

  // Close modal
  closeModal.onclick = () => {
      imageModal.style.display = 'none';
  }

  // Close modal when clicking outside of the image
  window.onclick = (e) => {
      if (e.target === imageModal) {
          imageModal.style.display = 'none';
      }
  }

  // Fetch data and initialize
  fetchDataAndInitialize();
});
