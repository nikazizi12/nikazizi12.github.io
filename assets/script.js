// Smooth Scrolling for Navigation Links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the height of the navbar

        window.scrollTo({
            top: target.offsetTop - navbarHeight - 20, // Adjust scroll position to account for navbar height
            behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        // Collapse the navbar after clicking on a link in mobile view
        if (window.innerWidth <= 991) {
            document.querySelector('.navbar-toggler').click();
        }
    });
});


// Toggle Navbar Active State on Scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop - 70 && scrollPos < section.offsetTop + section.offsetHeight) {
            const currentId = section.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Close the responsive navbar when clicking outside
document.addEventListener('click', function (event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const isClickInside = navbarCollapse.contains(event.target) || document.querySelector('.navbar-toggler').contains(event.target);

    if (!isClickInside && navbarCollapse.classList.contains('show')) {
        document.querySelector('.navbar-toggler').click();
    }
});

// Back to Top Button (Optional Feature)
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

window.addEventListener('scroll', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const isClickInside = navbarCollapse.contains(event.target) || document.querySelector('.navbar-toggler').contains(event.target);

    if (window.scrollY > 80) {
        // Close the responsive navbar
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    }
});
