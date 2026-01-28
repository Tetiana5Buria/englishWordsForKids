const words = [
  {
    ua: "Кіт",
    en: "Cat",
    transcription: "[kæt]",
    image:
      "https://img.icons8.com/?size=100&id=xgvj7yYHIcxn&format=png&color=000000",
  },
  {
    ua: "Собака",
    en: "Dog",
    transcription: "[dɒɡ]",
    image: "https://img.icons8.com/?size=100&id=124077&format=png&color=000000",
  },
  {
    ua: "Яблуко",
    en: "Apple",
    transcription: "[ˈæpl]",
    image: "https://img.icons8.com/?size=100&id=119430&format=png&color=000000",
  },
  {
    ua: "Масло",
    en: "Butter",
    transcription: "[бате]",
    image:
      "https://img.icons8.com/?size=100&id=NpKKY6nhdrfh&format=png&color=000000",
  },
  {
    ua: "Хліб",
    en: "Bread",
    transcription: "[бред]",
    image: "https://img.icons8.com/?size=100&id=46370&format=png&color=000000",
  },
  {
    ua: "Сир",
    en: "cheese",
    transcription: "[чіз]",
    image:
      "https://img.icons8.com/?size=100&id=uQWpikIotciS&format=png&color=000000",
  },
  {
    ua: "Яйце",
    en: "an egg",
    transcription: "[еґ]",
    image:
      "https://img.icons8.com/?size=100&id=Ybx2AvxzyUfH&format=png&color=000000",
  },
  {
    ua: "Шинка",
    en: "ham",
    transcription: "[хем]",
    image:
      "https://img.icons8.com/?size=100&id=jRrz3DL0Dhud&format=png&color=000000",
  },
  {
    ua: "Ковбаса",
    en: "sausage",
    transcription: "[сосідж]",
    image:
      "https://img.icons8.com/?size=100&id=4cWIk6a8VODy&format=png&color=000000",
  },
  {
    ua: "Суп",
    en: "soup",
    transcription: "[су:п]",
    image:
      "https://img.icons8.com/?size=100&id=BewN23wCh-il&format=png&color=000000",
  },
  {
    ua: "Йогурт",
    en: "yoghurt",
    transcription: "[йоуґет]",
    image:
      "https://img.icons8.com/?size=100&id=LnTcNaXMJOm3&format=png&color=000000",
  },
  {
    ua: "Бутерброд",
    en: "sandwich",
    transcription: "[сенвіч]",
    image:
      "https://img.icons8.com/?size=100&id=In2RWeFNEZPH&format=png&color=000000",
  },
];

const cardsContainer = document.getElementById("cards");

function createCard(word) {
  return `
    <div class="cards__item">
      <div class="cards__inner">

        <div class="cards__front">
          <h2 class="cards__title">${word.ua}</h2>
          <img class="cards__image" src="${word.image}" alt="${word.en}">
        </div>

        <div class="cards__back">
          <p class="cards__translation">${word.en}</p>
          <p class="cards__transcription">${word.transcription}</p>
          <button class="cards__sound" data-word="${word.en}">
            🔊
          </button>
        </div>

      </div>
    </div>
  `;
}

cardsContainer.innerHTML = words.map(createCard).join("");
cardsContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".cards__item");
  if (!card) return;
  if (e.target.classList.contains("cards__sound")) {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(e.target.dataset.word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);

    return;
  } else {
    alert("Sorry, your device does not support speech synthesis.");
  }

  card.classList.toggle("cards__item--flipped");
});
