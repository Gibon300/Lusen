window.addEventListener("DOMContentLoaded", () => {
  //get elems
  const slides = document.querySelectorAll(".slider__slide"),
    prevBtn = document.querySelector(".slider__btn_prev"),
    nextBtn = document.querySelector(".slider__btn_next");

  let counter = 0;

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //check if reached last slide
    if (counter === slides.length - 1) {
      //reset to first slide
      counter = 0;
      moveSlide();
      addActiveToDot(counter);
    } else {
      counter++;
      moveSlide();
      addActiveToDot(counter);
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //check if we on first slide
    if (counter === 0) {
      //reset to last
      counter = slides.length - 1;
      moveSlide();
      addActiveToDot(counter);
    } else {
      counter--;
      moveSlide();
      addActiveToDot(counter);
    }
  });

  //helper to move slides
  function moveSlide() {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    });
  }

  // **** DOTS ****
  //incase we want to dynamically create dots, depending on slides length
  class Dot {
    constructor() {}

    render() {
      const dot = document.createElement("div");
      dot.classList.add("slider__dot");

      const parent = document.querySelector(".slider__dot-container");
      parent.append(dot);
    }
  }

  const length = slides.length;

  function createDots(num) {
    for (let i = 0; i < num; i++) {
      new Dot().render();
    }
  }

  createDots(length);

  //get elems
  const dotsContainer = document.querySelector(".slider__dot-container"),
    dots = document.querySelectorAll(".slider__dot");

  //setup initial active class
  addActiveToDot(counter);

  //event listener
  dotsContainer.addEventListener("click", (e) => {
    const target = e.target;
    //if we clicked on dot
    if (target.classList.contains("slider__dot")) {
      //iterate through dots array, remove all active classes, check what dot is targeted, add active class to this dot and set counter to position of this dot
      //e.g if we clicked on last dot, counter now equals 3
      dots.forEach((dot, i) => {
        dot.classList.remove("active-dot");
        if (target === dot) {
          dot.classList.add("active-dot");
          counter = i;
          moveSlide();
        }
      });
    }
  });

  //add active dot to class, depending on current counter value
  function addActiveToDot(number) {
    //iterate through dots array, remove active class from all dots and add only to item that have same value as counter
    //e.g. if counter 3, we will add active class to last dot
    dots.forEach((dot, i) => {
      dot.classList.remove("active-dot");
      if (number === i) {
        dot.classList.add("active-dot");
      }
    });
  }
});
