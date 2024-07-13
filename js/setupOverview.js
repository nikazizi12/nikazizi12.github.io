document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.getElementById("tooltip");
  const mainImage = document.getElementById("mainImage");
  const productsList = document.getElementById('productsList');
  const galleryImages = document.getElementById('galleryImages');
  // const productSearch = document.getElementById('productSearch');
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementsByClassName('close')[0];
  const defaultImage = 'assets/img/placeholder.png'; // Path to your default placeholder image
  // const productMap = document.getElementById("productmap");
  const sourceButton = document.getElementById("sourceButton");
  const productTableContainer = document.getElementById(
    "productTableContainer"
  );
  const toggleButton = document.getElementById("toggleOwnerDetails");

  // Get query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  let ownerInfo = {};

  if (!id) {
      // Redirect to the specified URL if id parameter doesn't exist
      window.location.href = "setupOverview.html?id=user0";
  }
  
  // Fetch options data from optionsData.json
  fetch("assets/optionsData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Find the owner data with matching id
      ownerInfo = data.find((owner) => owner.id === id);
      if (!ownerInfo) {
        throw new Error("Owner data not found.");
      }

      // Populate owner details
      const ownerName = document.getElementById("ownerName");
      const basedIn = document.getElementById("basedIn");
      const website = document.getElementById("website");
      const category = document.getElementById("category");
      const description = document.getElementById("description");
      const followers = document.getElementById("followers");
      const popularContent = document.getElementById("popularContent");
      // const contact = document.getElementById('contact');

      ownerName.textContent = ownerInfo.name;
      basedIn.textContent = ownerInfo.basedIn;
      website.innerHTML = `<a href="${ownerInfo.website}" target="_blank">${ownerInfo.website}</a>`;
      category.textContent = ownerInfo.category;
      // description.textContent = ownerInfo.description;
      followers.textContent = ownerInfo.followers;
      // popularContent.innerHTML = ownerInfo.popularContent;
      // contact.textContent = ownerInfo.contact;

      // Update the image source
      mainImage.src = ownerInfo.imagePath;

      // Dynamically generate areas based on products
      // ownerInfo.products.forEach((product, index) => {
      //   const area = document.createElement("area");
      //   area.setAttribute("shape", product.shape);
      //   area.setAttribute("coords", product.coords);
      //   area.setAttribute("alt", product.alt);
      //   area.setAttribute("href", product.href);
      //   area.setAttribute("data-info", product.dataInfo);
      //   productMap.appendChild(area);

      //   // Add custom attribute to relate area to table row index
      //   area.setAttribute("data-row-index", index);
      // });

      // const tableBody = document.getElementById("productTableBody");

      // // Populate the table with dynamic content based on products
      // ownerInfo.products.forEach((product, index) => {
      //   const row = document.createElement("tr");
      //   row.classList.add("option");
      //   row.dataset.rowIndex = index;
      //   row.innerHTML = `
      //               <td>${index + 1}</td>
      //               <td>${product.alt}</td>
      //               <td>${product.dataInfo}</td>
      //               <td>
      //                   <a href="${product.link1}" target="_blank">Shopee</a>
      //               </td>
      //           `;
      //   tableBody.appendChild(row);
      // });

      // Event listeners for tooltip and interactive map areas
      const areas = document.querySelectorAll("area");
      const tableRows = document.querySelectorAll(
        "#productTableContainer tbody tr"
      );

      areas.forEach((area) => {
        area.addEventListener("mouseenter", function (event) {
          const info = event.target.getAttribute("data-info");
          tooltip.innerText = info;
          tooltip.style.display = "block";
        });

        area.addEventListener("mousemove", function (event) {
          const rect = mainImage.getBoundingClientRect();
          const offsetX = rect.left + window.scrollX;
          const offsetY = rect.top + window.scrollY;
          tooltip.style.top = event.pageY - offsetY + 5 + "px";
          tooltip.style.left = event.pageX - offsetX + 5 + "px";
        });

        area.addEventListener("mouseleave", function () {
          tooltip.style.display = "none";
        });

        // area.addEventListener("click", function (event) {
        //   event.preventDefault();
        //   const href = event.target.getAttribute("href");
        //   window.location.href = href;

        //   // Highlight corresponding table row
        //   const rowIndex = event.target.getAttribute("data-row-index");
        //   highlightTableRow(rowIndex);

        //   // Scroll to the highlighted row
        //   const scrollOffset =
        //     productTableContainer.offsetTop +
        //     tableRows[rowIndex].offsetTop -
        //     100;
        //   window.scrollTo({
        //     top: scrollOffset,
        //     behavior: "smooth",
        //   });
        // });
      });

      // tableRows.forEach((row) => {
      //   row.addEventListener("click", function () {
      //     const rowIndex = row.dataset.rowIndex;
      //     highlightArea(rowIndex);

      //     // Scroll to the main image
      //     const scrollOffset = mainImage.offsetTop + 100;
      //     window.scrollTo({
      //       top: scrollOffset,
      //       behavior: "smooth",
      //     });
      //   });
      // });

      // function highlightArea(index) {
      //   // Remove existing highlights
      //   const highlightedArea = document.querySelector(".highlight-outline");
      //   if (highlightedArea) {
      //     highlightedArea.remove();
      //   }

      //   // Highlight the clicked area
      //   const selectedArea = areas[index];
      //   const coords = selectedArea
      //     .getAttribute("coords")
      //     .split(",")
      //     .map(Number);

      //   const outline = document.createElement("div");
      //   outline.style.position = "absolute";
      //   outline.style.border = "4px solid yellow";
      //   outline.style.pointerEvents = "none";
      //   outline.style.left = `${coords[0]}px`;
      //   outline.style.top = `${coords[1]}px`;
      //   outline.style.width = `${coords[2] - coords[0]}px`;
      //   outline.style.height = `${coords[3] - coords[1]}px`;
      //   outline.classList.add("highlight-outline");
      //   mainImage.parentElement.appendChild(outline);

      //   // Remove the outline after a delay
      //   setTimeout(() => {
      //     outline.remove();
      //   }, 3000);
      // }

      // function highlightTableRow(index) {
      //   // Remove existing highlights
      //   tableRows.forEach((row) => {
      //     row.classList.remove("highlighted");
      //   });

      //   // Highlight the clicked row
      //   tableRows[index].classList.add("highlighted");

      //   // Clear highlight after 3 seconds
      //   setTimeout(() => {
      //     tableRows[index].classList.remove("highlighted");
      //   }, 3000);
      // }

      displayProducts(ownerInfo.products);
      displayGallery(ownerInfo.gallery);
    })
    .catch((error) => {
      console.error("Error fetching or processing data:", error);
    });

  // Toggle button click event
  toggleButton.addEventListener("click", function () {
    const ownerDetails = document.getElementById("ownerDetailsSection");

    // Update button text based on current visibility
    if (
      ownerDetails.style.display === "none" ||
      ownerDetails.classList.contains("hidden")
    ) {
      ownerDetails.style.display = "block";
      ownerDetails.classList.remove("hidden");
      toggleButton.textContent = "Hide Owner Details";
    } else {
      ownerDetails.style.display = "none";
      ownerDetails.classList.add("hidden");
      toggleButton.textContent = "View Owner Details";
    }
  });

  // Display products
  function displayProducts(products) {
    productsList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        const productImg = document.createElement('img');
        productImg.src = `${product.image}`;
        productImg.onerror = () => { productImg.src = defaultImage }; // Fallback to default image on error
        productImg.alt = product.alt;
        productImg.addEventListener('click', () => openModal(product.image));
        
        const productName = document.createElement('h3');
        productName.textContent = `(${product.alt}) ${product.dataInfo}`;
        
        const productDesc = document.createElement('p');
        productDesc.textContent = product.description;
        
        const productLink = document.createElement('a');
        productLink.href = product.link1;
        productLink.target = '_blank';
        productLink.textContent = 'View on Shopee'; // Replace with appropriate text
        productLink.classList.add('affiliate-link');

        productDiv.appendChild(productImg);
        productDiv.appendChild(productName);
        productDiv.appendChild(productDesc);
        productDiv.appendChild(productLink);
        
        productsList.appendChild(productDiv);
    });
  }

  // Display gallery
  function displayGallery(images) {
    galleryImages.innerHTML = '';
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = `${image}`;
        img.alt = 'an Image from Gallery';
        img.onerror = () => { img.src = defaultImage }; // Fallback to default image on error
        img.addEventListener('click', () => openModal(image));
        galleryImages.appendChild(img);
    });
  }

  // Filter products based on search input
  // productSearch.addEventListener('input', (e) => {
  //     const searchTerm = e.target.value.toLowerCase();
  //     const filteredProducts = products.filter(product =>
  //         product.name.toLowerCase().includes(searchTerm) || 
  //         product.dataInfo.toLowerCase().includes(searchTerm)
  //     );
  //     displayProducts(filteredProducts);
  // });

  // Open modal
  function openModal(image) {
      modalImg.src = `${image}`;
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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Source button click event
  sourceButton.addEventListener("click", function () {
    window.location.href = ownerInfo.sourceLink; // Ensure ownerInfo.sourceLink is defined correctly
  });
});
