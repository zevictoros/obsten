const header = document.getElementById("header");
const nav = document.getElementById("nav");
const toggle = document.getElementById("menu-toggle");
const icon = toggle ? toggle.querySelector("i") : null;

const navLinks = document.querySelectorAll(".nav a");
const smoothLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll("section[id]");

let isScrolling = false;

/*=====================================
HEADER
=====================================*/

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}

/*=====================================
MENU ATIVO
=====================================*/

function updateActiveMenu() {
  if (isScrolling) return;

  const scrollPosition = window.scrollY + header.offsetHeight + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${section.id}`,
        );
      });
    }
  });
}

/*=====================================
SCROLL SUAVE
=====================================*/

function smoothScroll(targetY, duration = 1200) {
  isScrolling = true;

  const startY = window.pageYOffset;
  const distance = targetY - startY;

  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      isScrolling = false;
      updateActiveMenu();
    }
  }

  requestAnimationFrame(animation);
}

/*=====================================
MENU MOBILE
=====================================*/

function openMenu() {
  if (!nav) return;

  nav.classList.add("active");
  document.body.classList.add("menu-open");

  if (icon) {
    icon.className = "ri-close-line";
  }
}

function closeMenu() {
  if (!nav) return;

  nav.classList.remove("active");
  document.body.classList.remove("menu-open");

  if (icon) {
    icon.className = "ri-menu-3-line";
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.contains("active") ? closeMenu() : openMenu();
  });
}

/*=====================================
SCROLL PARA QUALQUER LINK INTERNO
(Menu + Hero + Botões)
=====================================*/

smoothLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    closeMenu();

    navLinks.forEach((item) => item.classList.remove("active"));

    const menuLink = document.querySelector(`.nav a[href="${href}"]`);

    if (menuLink) {
      menuLink.classList.add("active");
    }

    const offset = target.offsetTop - header.offsetHeight - 10;

    setTimeout(
      () => {
        smoothScroll(offset, 1400);
      },
      nav.classList.contains("active") ? 250 : 0,
    );
  });
});

/*=====================================
FECHAR MENU AO REDIMENSIONAR
=====================================*/

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

/*=====================================
SCROLL
=====================================*/

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveMenu();
});

/*=====================================
LOAD
=====================================*/

window.addEventListener("load", () => {
  closeMenu();
  updateHeader();
  updateActiveMenu();
});
