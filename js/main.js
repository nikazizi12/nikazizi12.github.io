document.addEventListener('DOMContentLoaded', () => {
    const setupList = document.getElementById('setupList');
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementsByClassName('close')[0];

    let setups = [];

    // Fetch setups and gallery data
    fetch('assets/setups.json')
        .then(response => response.json())
        .then(data => {
            setups = data.setups;
            displaySetups(setups);
        })
        .catch(error => console.error('Error fetching setup data:', error));

    // Display setups
    function displaySetups(setups) {
        setupList.innerHTML = '';
        setups.forEach(setup => {
            const setupDiv = document.createElement('div');
            setupDiv.classList.add('setup');
            
            const setupImg = document.createElement('img');
            setupImg.src = `assets/img/${setup.image}`;
            setupImg.alt = setup.name;
            setupImg.addEventListener('click', () => openModal(setup.image));
            
            const setupName = document.createElement('h3');
            setupName.textContent = setup.name;
            
            const setupDesc = document.createElement('p');
            setupDesc.textContent = setup.description;
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('affiliate-buttons');

            const viewSetupButton = document.createElement('button');
            viewSetupButton.textContent = 'View Setup Details';
            viewSetupButton.classList.add('affiliate-button');
            viewSetupButton.onclick = () => window.open(setup.affiliateLink, '_blank');

            const viewComponentsButton = document.createElement('button');
            viewComponentsButton.textContent = 'View Owner Video';
            viewComponentsButton.classList.add('affiliate-button');
            viewComponentsButton.onclick = () => window.open(setup.affiliateLink, '_blank');

            buttonsDiv.appendChild(viewSetupButton);
            buttonsDiv.appendChild(viewComponentsButton);

            setupDiv.appendChild(setupImg);
            setupDiv.appendChild(setupName);
            setupDiv.appendChild(setupDesc);
            setupDiv.appendChild(buttonsDiv);
            
            setupList.appendChild(setupDiv);
        });
    }

    // Open modal
    function openModal(image) {
        modalImg.src = `assets/img/${image}`;
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
});
