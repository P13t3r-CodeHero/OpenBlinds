document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav-bar');
  const navLinks = document.querySelectorAll('.nav-bar li a');
  const sections = document.querySelectorAll('section');
  const menuIcon = document.getElementById("menu-icon");
  const navLink = document.querySelector(".nav-links");
  const testimonials = document.querySelectorAll(".testimonial-container");
  const next = document.getElementById("next");
  const previous = document.getElementById("previous");
  const contactForm = document.getElementById('contactForm');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  let currentIndex = 0;

  const updateTestimonialDisplay = () => {
      testimonials.forEach((testimonial, index) => {
          if (index === currentIndex) {
              testimonial.classList.add("active-testimonial");
          } else {
              testimonial.classList.remove("active-testimonial");
          }
      });
  };

  next.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonialDisplay();
  });

  previous.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonialDisplay();
  });

  // Initial display
  updateTestimonialDisplay();

  menuIcon.addEventListener("click", function () {
    navLink.classList.toggle("show");
  });

  navLink.addEventListener("click", function () {
    navLink.classList.toggle("show");
  });

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 600 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('current'));
    if (index >= 0) {
      navLinks[index].classList.add('current');
    }

    const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollPos + 170 >= docHeight) {
      navLinks.forEach((link) => link.classList.remove('current'));
      navLinks[navLinks.length - 1].classList.add('current');
      }
  }

  function fixNav() {
    if (window.scrollY > nav.offsetHeight + 150) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  }

  changeActiveLink();
  window.addEventListener('scroll', () => {
    fixNav();
    changeActiveLink();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.forEach((navLink) => navLink.classList.remove('current'));
      this.classList.add('current');
    });
  });

  // Form submission and toast notifications
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Perform form validation
      const isValid = contactForm.checkValidity();
      if (!isValid) {
          contactForm.classList.add('validate-form');
          return;
      }

      // Disable the submit button
      submitButton.disabled = true;
      submitButton.style.backgroundColor = '#cccccc';

      const formData = new FormData(this);
      const json = JSON.stringify(Object.fromEntries(formData));
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3NDc4NDE2MDMsImV4cCI6MTc3OTM3NzYwMywiaWF0IjoxNzQ3ODQxNjAzLCJpc3MiOiJodHRwczovL29wZW5ibGluZHMuY28uemEiLCJhdWQiOiJlbWFpbC1zZXJ2aWNlIn0.OBsT-dA0Eo6Uk9QsfiF-FXNnINiaZ7l_hg3ql7eTUu0';

      fetch('https://everestsoftwareemailservice-hqdwhzb8hra3e0g4.southafricanorth-01.azurewebsites.net/api/Email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: json
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then(error => {
                  throw new Error(error.message || 'There was an error sending the email.');
              });
          }
          return response.json();
      })
      .then(data => {
          if (data.message) {
              contactForm.reset();
              toastr.success(data.message, 'Success!');
          } else {
              toastr.error('There was an error sending the email.', 'Error');
          }
      })
      .catch(error => {
          toastr.error('There was an error sending the email.', 'Error');
          console.error('Error:', error);
      })
      .finally(() => {
          // Re-enable the submit button after the process is complete
          submitButton.disabled = false;
          submitButton.style.backgroundColor = '#5b9bd5';
      });
  });

  contactForm.addEventListener('input', function() {
      if (this.classList.contains('validate-form')) {
          this.classList.remove('validate-form');
      }
  });
});

function openModal(card) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("modalImage");
  var modalText = document.getElementById("modalText");
  var modalTitle = document.getElementById("modalTitle");

  var cardId = card.getAttribute("data-id");
  var cardImg = card.querySelector("img").src;
  var cardText = card.querySelector("p").innerText;
  var cardTitle = card.querySelector("h2").innerText;

  modalImg.src = cardImg;
  modalText.innerText = cardText;
  modalTitle.innerText = cardTitle;

  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
      modal.style.display = "none";
  }
};
