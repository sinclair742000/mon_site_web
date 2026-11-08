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
    facebook: "https://www.facebook.com/share/19ufTChZAv/",
    instagram: "https://www.instagram.com/horizon_monde/",
    tiktok: "https://www.tiktok.com/@horizon_monde",
    threads: "",   // ex. "https://www.threads.net/@horizon_monde"
    youtube: "",   // ex. "https://www.youtube.com/@horizon_monde"
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

  /* ---------- Barre des catégories (page Opportunités) ---------- */
  const catNav = document.querySelector("[data-cat-nav]");
  if (catNav && "IntersectionObserver" in window) {
    const links = Array.prototype.slice.call(catNav.querySelectorAll('a[href^="#"]'));
    const top = document.querySelector(".page-hero");
    const end = document.querySelector(".closing");
    let topVisible = true, endVisible = false;
    const toggleNav = function () { catNav.classList.toggle("is-visible", !topVisible && !endVisible); };
    if (top) new IntersectionObserver(function (e) { topVisible = e[0].isIntersecting; toggleNav(); }).observe(top);
    if (end) new IntersectionObserver(function (e) { endVisible = e[0].isIntersecting; toggleNav(); }).observe(end);
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    links.forEach(function (a) {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) spy.observe(target);
    });
  }

  /* ---------- Formulaire « Évaluer mon projet » → message WhatsApp ----------
     Aucune donnée n'est envoyée à un serveur : le formulaire compose un message
     que la personne relit et envoie elle-même dans WhatsApp. */
  const waForm = document.querySelector("[data-wa-form]");
  if (waForm) {
    // Présélection depuis l'adresse, ex. contact.html?projet=Études&destination=Turquie
    const params = new URLSearchParams(window.location.search);
    ["projet", "destination"].forEach(function (name) {
      const wanted = params.get(name);
      if (!wanted) return;
      Array.prototype.forEach.call(waForm.querySelectorAll('input[name="' + name + '"]'), function (input) {
        if (input.value.toLowerCase() === wanted.toLowerCase()) input.checked = true;
      });
    });

    const setError = function (field, errorId, show) {
      const error = document.getElementById(errorId);
      if (error) error.hidden = !show;
      const targets = field instanceof NodeList || Array.isArray(field) ? field : [field];
      Array.prototype.forEach.call(targets, function (el) {
        if (show) { el.setAttribute("aria-invalid", "true"); el.setAttribute("aria-describedby", errorId); }
        else { el.removeAttribute("aria-invalid"); }
      });
    };

    // Les erreurs disparaissent dès que le champ est corrigé
    waForm.addEventListener("input", function (event) {
      if (event.target.name === "nom" && event.target.value.trim()) setError(event.target, "f-nom-err", false);
    });
    waForm.addEventListener("change", function (event) {
      if (event.target.name === "projet") setError(waForm.querySelectorAll('[name="projet"]'), "f-projet-err", false);
    });

    waForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(waForm);
      const value = function (name) { return String(data.get(name) || "").trim(); };
      const nameInput = waForm.querySelector('[name="nom"]');
      const projectInputs = waForm.querySelectorAll('[name="projet"]');
      const missingName = !value("nom");
      const missingProject = !value("projet");
      setError(nameInput, "f-nom-err", missingName);
      setError(projectInputs, "f-projet-err", missingProject);
      if (missingName || missingProject) {
        (missingName ? nameInput : projectInputs[0]).focus();
        return;
      }

      const lines = ["Bonjour Horizon Monde, je souhaite être orienté(e) pour mon projet.", ""];
      const add = function (label, v) { if (v) lines.push("• " + label + " : " + v); };
      add("Prénom", value("nom"));
      add("Projet", value("projet"));
      add("Destination", value("destination"));
      add("Période", value("periode"));
      add("Nombre de personnes", value("personnes"));
      add("Budget", value("budget"));
      if (value("message")) { lines.push("", value("message")); }

      const url = whatsappUrl(lines.join("\n"));
      const opened = window.open(url, "_blank", "noopener");
      if (!opened) window.location.href = url;
    });
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
