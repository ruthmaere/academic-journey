// Year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Intersection Observer for animations
const reveal = (selector) => {
  const items = document.querySelectorAll(selector);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => obs.observe(el));
};

document.addEventListener("DOMContentLoaded", () => {
  reveal(".fade-in");
  reveal(".slide-up");
});

// Theme toggle
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.classList.add("light");

  btn.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
    btn.textContent = root.classList.contains("light") ? "🌞" : "🌙";
  });
});

// Contact form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const showError = (name, msg) => {
    const el = form.querySelector(`.error[data-for="${name}"]`);
    if (el) el.textContent = msg || "";
  };

  const emailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let valid = true;

    if (name.length < 2) {
      showError("name", "Please enter at least 2 characters.");
      valid = false;
    } else showError("name");

    if (!emailValid(email)) {
      showError("email", "Please enter a valid email address.");
      valid = false;
    } else showError("email");

    if (message.length < 10) {
      showError("message", "Please write at least 10 characters.");
      valid = false;
    } else showError("message");

    const status = document.getElementById("formStatus");
    if (!status) return;

    if (valid) {
      status.textContent = "Thanks! Your message has been validated.";
      status.classList.add("visible");
      form.reset();
    } else {
      status.textContent = "Please fix the errors above.";
      status.classList.add("visible");
    }
  });
});
