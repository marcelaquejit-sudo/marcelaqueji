// ano do footer
document.getElementById("year").textContent = new Date().getFullYear();

// acordeon simples
document.querySelectorAll(".acc-item").forEach((item) => {
  const btn = item.querySelector(".acc-btn");
  btn.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});
