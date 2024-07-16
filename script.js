// script.js
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-bar li a');
    const sections = document.querySelectorAll('section');
    const menuIcon = document.getElementById("menu-icon");
    const navLink = document.querySelector(".nav-links");

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
  
  