/* ==========================================================================
   Horizon Monde — script commun à toutes les pages
   ========================================================================== */

/* ---------- CONFIGURATION : à compléter ----------
   whatsappNumber : numéro WhatsApp Business au format international,
                    sans « + », sans espaces ni zéros initiaux.
                    Exemple pour un numéro camerounais : "2376XXXXXXXX".
   Réseaux sociaux : laisser vide ("") pour masquer le lien sur le site. */
const HM_CONFIG = {
  whatsappNumber: "237698994839",
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
};

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Liens WhatsApp ----------
     Chaque élément portant [data-whatsapp] reçoit un lien wa.me avec le
     message indiqué dans data-message. Sans JavaScript, le lien d'origine
     (page contact) reste utilisable. */
  function whatsappUrl(message) {
    const base = "https://wa.me/" + (HM_CONFIG.whatsappNumber || "");
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }
  window.hmWhatsappUrl = whatsappUrl;

  if (!HM_CONFIG.whatsappNumber) {
    console.warn("[Horizon Monde] Numéro WhatsApp non configuré : renseignez HM_CONFIG.whatsappNumber dans assets/js/main.js.");
  }

  document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
    link.href = whatsappUrl(link.dataset.message || "");
    link.target = "_blank";
    link.rel = "noopener";
  });

  /* ---------- Réseaux sociaux ---------- */
  document.querySelectorAll("[data-social]").forEach(function (link) {
    const url = HM_CONFIG.social[link.dataset.social];
    if (url) {
      link.href = url;
    } else {
      const item = link.closest("li") || link;
      item.hidden = true;
    }
  });

  /* ---------- Page active dans le menu ---------- */
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll('[data-nav="' + page + '"]').forEach(function (link) {
      link.setAttribute("aria-current", "page");
    });
  }

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav-principale");
  if (toggle && nav) {
    const label = toggle.querySelector(".visually-hidden");
    const setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Fermer le menu" : "Ouvrir le menu";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Ombre de l'en-tête au défilement ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero : léger mouvement de la photo au défilement (ordinateur) ---------- */
  const heroSection = document.querySelector(".hero");
  const heroPicture = document.querySelector(".hero-picture");
  if (heroSection && heroPicture && !reduceMotion) {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let ticking = false;
    const update = function () {
      ticking = false;
      if (!desktop.matches) { heroPicture.style.transform = ""; return; }
      const shift = Math.min(window.scrollY, heroSection.offsetHeight) * 0.06;
      heroPicture.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    desktop.addEventListener("change", update);
    update();
  }

  /* ---------- Bouton WhatsApp flottant : masqué pendant le hero ---------- */
  const floatBtn = document.querySelector(".whatsapp-float");
  if (heroSection && floatBtn && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      floatBtn.classList.toggle("is-hidden", entries[0].intersectionRatio >= 0.35);
    }, { threshold: 0.35 }).observe(heroSection);
  }

  /* ---------- Frise « Comment ça marche » : le fil doré suit le défilement ---------- */
  const timeline = document.querySelector(".timeline");
  if (timeline && !reduceMotion) {
    let pending = false;
    const paint = function () {
      pending = false;
      const box = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const progress = Math.min(Math.max((start - box.top) / box.height, 0), 1);
      timeline.style.setProperty("--progress", progress.toFixed(3));
    };
    window.addEventListener("scroll", function () {
      if (!pending) { pending = true; window.requestAnimationFrame(paint); }
    }, { passive: true });
    window.addEventListener("resize", paint);
    paint();
  }

  /* ---------- Apparition progressive des blocs ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Année du pied de page ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
