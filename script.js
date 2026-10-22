document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        menu.classList.remove("open");
      }),
    );
  }

  // Slider Auto Change
  const slides = document.querySelectorAll(".slide");
  const dotsWrap = document.getElementById("dots");

  // চেক করছি পেজে স্লাইডার আছে কিনা
  if (slides.length > 0 && dotsWrap) {
    let index = 0,
      timer;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", () => {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll("button");

    function goTo(i) {
      slides[index].classList.remove("active");
      dots[index].classList.remove("active");
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("active");
      dots[index].classList.add("active");
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 6000);
    }

    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goTo(index + 1);
        restart();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goTo(index - 1);
        restart();
      });
    }

    dots[0].classList.add("active");
    restart();
  }
});
