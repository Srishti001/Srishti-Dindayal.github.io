// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll (clean + professional feel)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({
        behavior: "smooth"
      });
  });
});
