const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav__list");

/* Scrolling Nav */

const scrollingNav = () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) nav.classList.add("scrolling-nav");
  else nav.classList.remove("scrolling-nav");
};

window.addEventListener("scroll", scrollingNav);

/* Toggling Nav Menu */

const navMenuBtn = document.querySelector(".menu-btn");
const toggleMenu = () => {
  nav.classList.toggle("show-menu");
  if (nav.classList.contains("show-menu")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
};

navMenuBtn.addEventListener("click", toggleMenu);

const pagesMenuBtn = document.querySelector(".pages-link a");

pagesMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  pagesMenuBtn.parentElement.classList.toggle("show-menu");
});

/* Scroll To Section */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").slice(1).trim();
  
    sections.forEach((section) => {
      if (section.getAttribute("id") == id) {
        const secTop = section.offsetTop - 80;
        window.scrollTo({ top: secTop, behavior: "smooth" });
      }
    });
  });
});

/* Activating Nav Links */

const activeLinks = () => {
  sections.forEach(section => {
    const scrollY = window.scrollY;
    const secHeight = section.getClientRects()[0].height;
    const secTop = section.offsetTop - 120;
    const secID = section.getAttribute('id')

    if(scrollY > secTop && scrollY <= secTop + secHeight){
      document.querySelector(`.main-link[href*=${secID}]`).parentElement.classList.add('active')
    }else{
      document.querySelector(`.main-link[href*=${secID}]`).parentElement.classList.remove('active')
    }
  })
}

window.addEventListener('scroll', activeLinks)

/* Show Apply Items */

const applyItems = Array.from(document.querySelectorAll(".apply__about-item"));

const hideOtherItems = () => {
  applyItems.forEach((item) => {
    item.style.height = "2.5rem";
    item.querySelector(".fas").classList.remove("open");
  });
};

applyItems.forEach((applyItem) => {
  applyItem.addEventListener("click", () => {
    hideOtherItems();
    let height = 0;
    Array.from(applyItem.children).forEach((child) => {
      height += child.clientHeight;
    });
    applyItem.style.height = `${height}px`;
    applyItem.querySelector(".fas").classList.add("open");
  });
});

/* Services Slider */

const cardsWrapper = document.querySelector(".cards__wrapper");
const nextBtn = document.querySelector(".services__wrapper .next-btn");
const prevBtn = document.querySelector(".services__wrapper .prev-btn");

let currentPosition = 0;
let numOfCards = cardsWrapper.children.length;
let gap = 16;

const moveSlider = (next) => {
  // Initializing Slider Position
  if (window.innerWidth > 620 && window.innerWidth < 1030) {
    numOfCards = cardsWrapper.children.length - 1;
    gap = 20;
  } else if (window.innerWidth > 1030) {
    numOfCards = cardsWrapper.children.length - 2;
    gap = 20;
  }

  const width = cardsWrapper.children[0].clientWidth + gap;

  if (next) {
    currentPosition++;
    if (width * currentPosition >= width * numOfCards) currentPosition = 0;
  } else {
    currentPosition--;
    if (currentPosition < 0) currentPosition = numOfCards - 1;
  }

  cardsWrapper.style.transform = `translateX(-${width * currentPosition}px)`;
};

nextBtn.addEventListener("click", () => moveSlider(true));

prevBtn.addEventListener("click", () => moveSlider(false));

/* Swiper */

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 60,
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    color: "#fff",
  },
});
