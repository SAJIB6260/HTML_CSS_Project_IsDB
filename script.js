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
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dotsWrap = document.getElementById("dots");

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

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const codeContainer = button.closest(".code-window");
      const codeElement = codeContainer.querySelector("code");
      const textToCopy = codeElement.innerText;

      // Modern Clipboard API - no page jumping!
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          const originalText = button.innerText;
          button.innerText = "Copied!";
          button.classList.add("copied");
          setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  });
});
