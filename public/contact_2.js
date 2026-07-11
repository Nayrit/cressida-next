function initContact2Page() {
  // Nav is owned by React Navbar
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

window.initContact2Page = initContact2Page;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContact2Page);
} else {
  initContact2Page();
}
