// Function to apply language based on selected option
function applyLanguage() {
  const languageLinks = document.querySelectorAll('.language-frame a');

  // Add click event listeners to language links
  languageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const selectedLang = this.getAttribute('data-lang');

      // Fetch the corresponding language JSON file based on selectedLang
      fetch(`lang/${selectedLang}.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Apply language to elements in header
          document.querySelector('.header-content h1 a').textContent = data.header.title;
          // document.querySelector('.header-content nav ul li a[href="about.html"]').textContent = data.header.about;
          // document.querySelector('.header-content nav ul li a[href="disclaimer.html"]').textContent = data.header.disclaimer;
          // document.querySelector('.header-content nav ul li a[href="contact.html"]').textContent = data.header.contact;
          // Apply language to elements in footer
          // document.getElementById('copyrightText').textContent = data.footer.copyright;

          // Apply language based on the current page
          // Determine the current page filename
          const currentPage = window.location.pathname.split('/').pop();

          // Check if the current page is the index.html or setupOverview.html
          if (currentPage === '' || currentPage === 'index.html') {
            document.getElementById('main-content').querySelector('h2').textContent = data.index.pageTitle;
            document.getElementById('main-content').querySelector('p').textContent = data.index.pageDescription;
            document.getElementById('searchInput').setAttribute('placeholder', data.index.searchPlaceholder);

            const filterOptions = document.getElementById('filterOptions');
            if (filterOptions) {
              const allCategoriesOption = filterOptions.querySelector('option[value="all"]');
              if (allCategoriesOption) {
                allCategoriesOption.textContent = data.index.allCategories;
              }
            }

            // Translate table headers
            const tableHeaders = document.querySelectorAll('#optionsTable th');
            if (tableHeaders.length > 0) {
              tableHeaders[0].textContent = data.index.tableHeaders.no;
              tableHeaders[1].textContent = data.index.tableHeaders.source;
              tableHeaders[2].textContent = data.index.tableHeaders.action;
            }
          } else if (currentPage === 'setupOverview.html') {
            document.getElementById('overviewTitle').textContent = data.setupOverview.pageTitle;
            document.getElementById('overviewDescription').textContent = data.setupOverview.pageDescription;

            // const ownerDetailsSection = document.getElementById('ownerDetailsSection');
            // if (ownerDetailsSection) {
            //   ownerDetailsSection.querySelector('#ownerNameLabel').textContent = data.setupOverview.ownerDetails.nameLabel;
            //   ownerDetailsSection.querySelector('#basedInLabel').textContent = data.setupOverview.ownerDetails.basedInLabel;
            //   ownerDetailsSection.querySelector('#websiteLabel').textContent = data.setupOverview.ownerDetails.websiteLabel;
            //   ownerDetailsSection.querySelector('#categoryLabel').textContent = data.setupOverview.ownerDetails.categoryLabel;
            //   ownerDetailsSection.querySelector('#descriptionLabel').textContent = data.setupOverview.ownerDetails.descriptionLabel;
            //   ownerDetailsSection.querySelector('#followersLabel').textContent = data.setupOverview.ownerDetails.followersLabel;
            //   ownerDetailsSection.querySelector('#popularContentLabel').textContent = data.setupOverview.ownerDetails.popularContentLabel;
            //   ownerDetailsSection.querySelector('#sourceButton').textContent = data.setupOverview.ownerDetails.viewOwnerPage;
            // }

            const tableHeaders = document.querySelectorAll('#productTableContainer th');
            if (tableHeaders.length > 0) {
              tableHeaders[0].textContent = data.setupOverview.tableHeaders.no;
              tableHeaders[1].textContent = data.setupOverview.tableHeaders.productType;
              tableHeaders[2].textContent = data.setupOverview.tableHeaders.productName;
              tableHeaders[3].textContent = data.setupOverview.tableHeaders.productLinks;
            }
          }

          // Hide language frame after applying language only if it exists and is visible
          const languageFrame = document.getElementById('languageFrame');
          if (languageFrame && !languageFrame.classList.contains('hidden')) {
            languageFrame.classList.add('hidden');
          }
        })
        .catch(error => console.error('Error fetching language file:', error));
    });
  });
}

// Call applyLanguage() when DOM content is loaded
document.addEventListener('DOMContentLoaded', applyLanguage);
