const faqs = document.querySelectorAll(".faq-item");

faqs.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    faqs.forEach((faq) => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = this.querySelector("input").value.trim();

  const mensagem = nome
    ? `Olá! Meu nome é ${nome} e gostaria de solicitar um orçamento para uma Landing Page.`
    : "Olá! Gostaria de solicitar um orçamento para uma Landing Page.";

  window.open(
    `https://wa.me/557192611090?text=${encodeURIComponent(mensagem)}`,
    "_blank",
  );
});
