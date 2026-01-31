import { categories } from "./data.js";
import { createCard } from "./ui.js";

const tabsContainer = document.getElementById("tabs");
const cardsContainer = document.getElementById("cards");

async function renderCategory(category) {
  /* for (const word of category.words) {
    const card = await createCard(word);
    cardsContainer.appendChild(card);
  } */

  /*   const promises = category.words.map((word) => createCard(word));
  const cards = await Promise.all(promises);
  cardsContainer.innerHTML = "";
  cards.forEach((cards) => cardsContainer.replaceChild(cards));

  cardsContainer.querySelector(".loading")?.remove(); */

  cardsContainer.textContent = "Loading...";
  const cards = await Promise.all(
    category.words.map((word) => createCard(word))
  );
  cardsContainer.replaceChildren(...cards);
}

function initTabs() {
  categories.forEach((category, index) => {
    const btn = document.createElement("button");
    btn.className = "tab__btn";
    btn.textContent = category.title;

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab__btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCategory(category);
    });

    if (index === 0) {
      btn.classList.add("active");
      renderCategory(category);
    }

    tabsContainer.appendChild(btn);
  });
}

initTabs();
