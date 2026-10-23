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

document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  // সাইডবারের href অনুযায়ী মেইন কন্টেন্টের সেকশনগুলো খুঁজে বের করা
  const sections = Array.from(sidebarLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((section) => section !== null);

  // স্ক্রল করার সময় কোন সেকশনটি স্ক্রিনে আছে তা বোঝার জন্য IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "-120px 0px -40% 0px", // হেডারের হাইট অনুযায়ী এডজাস্ট করা
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // সব লিংক থেকে active ক্লাস রিমুভ করা
        sidebarLinks.forEach((link) => link.classList.remove("active"));

        // যে সেকশনটি স্ক্রিনে আছে, সাইডবারে তার লিংকে active ক্লাস অ্যাড করা
        const activeLink = document.querySelector(
          `.sidebar a[href="#${entry.target.id}"]`,
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  // প্রতিটি সেকশনকে অবজার্ভ করা
  sections.forEach((section) => {
    observer.observe(section);
  });
});
