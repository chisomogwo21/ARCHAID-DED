(function () {
  const nav = document.querySelector('.nav');
  const mobile = document.querySelector('.mobile');
  const openBtn = document.querySelector('[data-nav-open]');
  const closeBtn = document.querySelector('[data-nav-close]');

  function setScrolled() {
    if (!nav) return;
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('arch-glass', scrolled);
    nav.classList.toggle('nav--scrolled', scrolled);
  }
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  function openMobile() {
    if (!mobile) return;
    mobile.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeMobile() {
    if (!mobile) return;
    mobile.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openMobile);
  if (closeBtn) closeBtn.addEventListener('click', closeMobile);
  if (mobile) {
    mobile.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.matches('[data-nav-link]')) closeMobile();
    });
  }

  // Concept form (static): show a polite message without external APIs.
  const conceptForm = document.querySelector('[data-concept-form]');
  if (conceptForm) {
    conceptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = conceptForm.querySelector('input[name="vision"]');
      const out = document.querySelector('[data-concept-output]');
      const value = input && input.value ? String(input.value).trim() : '';
      if (!out) return;
      if (!value) {
        out.textContent = "Describe the site or context, then submit.";
        out.style.display = 'block';
        return;
      }
      out.textContent =
        "Concept note received. For a full concept brief, email: studio@archaidded.io\n\n" +
        "Site: " + value + "\n" +
        "Deliverables: spatial intent · material palette · light strategy · structure outline";
      out.style.display = 'block';
    });
  }
})();
const newsletterForm = document.querySelector('.formrow[action*="formspree"]');
const messageBox = document.getElementById("newsletterMsg");

if (newsletterForm && messageBox) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    messageBox.textContent = "Submitting...";

    const formData = new FormData(newsletterForm);

    try {
      const response = await fetch(newsletterForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        messageBox.textContent = " Thanks for subscribing!";
        newsletterForm.reset();
      } else {
        messageBox.textContent = "⚠️ Something went wrong. Try again.";
      }
    } catch (err) {
      messageBox.textContent = "⚠️ Network error. Try again.";
    }
  
  });
}


const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");

if (contactForm && contactMsg) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // stops redirect

    contactMsg.textContent = "Sending message...";

    try {
      const formData = new FormData(contactForm);

      const res = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        contactMsg.textContent = "Message sent successfully!";
        contactForm.reset();
      } else {
        contactMsg.textContent = "⚠️ Something went wrong. Please try again.";
      }
    } catch (err) {
      contactMsg.textContent = "⚠️ Network error. Please try again.";
    }
  });
}
