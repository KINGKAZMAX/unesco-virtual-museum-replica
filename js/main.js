/* UNESCO Virtual Museum replica — interactions
   - Loading experience with rotating facts (from the site's _payload.json)
   - Menu overlay
   - Header scroll state, reveal-on-scroll, back-to-top
   - Simple news carousel drag support
*/

(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu overlay ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".menu-overlay a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- Home loading experience ---------- */
  var stage = document.querySelector(".home-stage");
  if (stage) {
    var facts = Array.prototype.slice.call(document.querySelectorAll(".loading-fact"));
    var bar = document.querySelector(".loading-bar i");
    var idx = 0;
    var progress = 0;

    var totalMs = 6400;           // length of the loading sequence
    var stepMs = totalMs / 27;
    var tick = setInterval(function () {
      progress = Math.min(100, progress + 100 / 27);
      if (bar) bar.style.width = progress + "%";
    }, stepMs);

    function showFact(i) {
      facts.forEach(function (f, j) {
        f.classList.toggle("show", i === j);
      });
    }
    if (facts.length) showFact(0);
    var factTimer = setInterval(function () {
      idx = (idx + 1) % facts.length;
      showFact(idx);
    }, 2200);

    setTimeout(function () {
      clearInterval(tick);
      clearInterval(factTimer);
      if (bar) bar.style.width = "100%";
      stage.classList.add("ready");
      document.title = document.title.replace("Loading", "UNESCO Virtual Museum of Stolen Cultural Objects");
    }, totalMs + 400);
  }

  /* ---------- Carousel drag-to-scroll (desktop) ---------- */
  var carousel = document.querySelector(".carousel");
  if (carousel && window.matchMedia("(min-width: 961px)").matches) {
    var down = false, startX = 0, startLeft = 0;
    carousel.addEventListener("pointerdown", function (e) {
      down = true;
      startX = e.clientX;
      startLeft = carousel.scrollLeft;
      carousel.setPointerCapture(e.pointerId);
    });
    carousel.addEventListener("pointermove", function (e) {
      if (!down) return;
      carousel.scrollLeft = startLeft - (e.clientX - startX);
    });
    ["pointerup", "pointercancel"].forEach(function (ev) {
      carousel.addEventListener(ev, function () { down = false; });
    });
  }
})();
