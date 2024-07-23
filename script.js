document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-bar li a');
    const sections = document.querySelectorAll('section');
    const menuIcon = document.getElementById("menu-icon");
    const navLink = document.querySelector(".nav-links");
    const testimonials = document.querySelectorAll(".testimonial-container");
    const next = document.getElementById("next");
    const previous = document.getElementById("previous");
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
  });

  function openModal(card) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImage");
    var modalText = document.getElementById("modalText");

    var cardId = card.getAttribute("data-id");
    var cardImg = card.querySelector("img").src;
    var cardText = card.querySelector("p").innerText;

    modalImg.src = cardImg;
    modalText.innerText = cardText;

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
}

  