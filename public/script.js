const menuToggle = document.querySelector(".menu-toggle");
const pageShell = document.querySelector(".page-shell");

if (menuToggle && pageShell) {
  const nav = document.getElementById("site-nav");

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    pageShell.classList.toggle("menu-open", !isOpen);

    if (!isOpen && nav) {
      nav.querySelector("a")?.focus();
    }
  });
}

// Apply a small entrance animation after paint for a more polished feel.
window.addEventListener("load", () => {
  document.body.classList.add("is-ready");
});
