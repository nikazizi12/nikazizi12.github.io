// Function to apply language based on selected option
function applyLanguage() {
  const languageFrame = document.getElementById('languageFrame');
  const languageLinks = document.querySelectorAll('.language-frame a');

  // Function to apply language from stored preference
  function applyLanguageFromStorage(selectedLang) {
    fetchLanguage(selectedLang)
      .then(data => {
        applyCommonLanguageChanges(data);
        applyPageSpecificChanges(data);
      })
      .catch(error => console.error('Error fetching language file:', error));
  }

  // Function to fetch language data
  function fetchLanguage(selectedLang) {
    return fetch(`lang/${selectedLang}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  // Function to apply common language changes
  function applyCommonLanguageChanges(data) {
    // Apply language to elements in header
    document.querySelector('.header-content h1 a').textContent = data.header.title;
  }

  // Function to apply page-specific language changes
  function applyPageSpecificChanges(data) {
    // Apply language based on the current page
    const currentPage = window.location.pathname.split('/').pop();

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

      const tableHeaders = document.querySelectorAll('#productTableContainer th');
      if (tableHeaders.length > 0) {
        tableHeaders[0].textContent = data.setupOverview.tableHeaders.no;
        tableHeaders[1].textContent = data.setupOverview.tableHeaders.productType;
        tableHeaders[2].textContent = data.setupOverview.tableHeaders.productName;
        tableHeaders[3].textContent = data.setupOverview.tableHeaders.productLinks;
      }
    }

    // Hide language frame after applying language only if it exists and is visible
    if (languageFrame && !languageFrame.classList.contains('hidden')) {
      languageFrame.classList.add('hidden');
    }
  }

  // Add click event listeners to language links
  languageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const selectedLang = this.getAttribute('data-lang');

      // Store selected language in localStorage
      localStorage.setItem('selectedLang', selectedLang);

      // Apply language changes immediately
      applyLanguageFromStorage(selectedLang);
    });
  });

  // Check if language is already selected and apply it
  const storedLang = localStorage.getItem('selectedLang');
  if (!storedLang) {
    // Show the language frame if no stored language preference exists
    languageFrame.classList.remove('hidden');
  } else {
    // Apply language from stored preference
    applyLanguageFromStorage(storedLang);
  }
}

// Call applyLanguage() when DOM content is loaded
document.addEventListener('DOMContentLoaded', applyLanguage);
