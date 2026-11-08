/* ==========================================================================
   Horizon Monde — script commun à toutes les pages
   ========================================================================== */

/* ---------- CONFIGURATION : à compléter ----------
   whatsappNumber : numéro WhatsApp Business au format international,
                    sans « + », sans espaces ni zéros initiaux.
                    Exemple pour un numéro turc : "905321234567".
   Réseaux sociaux : laisser vide ("") pour masquer le lien sur le site. */
const HM_CONFIG = {
  whatsappNumber: "",
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
