import { getPhonetic } from "./services.js";

export function speakWord(text) {
  if (!("speechSynthesis" in window)) {
    alert("Ваш пристрій не підтримує синтез мови");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;

  window.speechSynthesis.speak(utterance);
}

export async function createCard(word) {
  const card = document.createElement("div");
  card.className = "card";

  const inner = document.createElement("div");
  inner.className = "card__inner";

  const front = document.createElement("div");
  front.className = "card__front";

  const img = document.createElement("img");
  img.className = "card__image";
  img.src = word.image;
  img.alt = word.en;
  img.loading = "lazy";

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = word.ua;

  front.append(img, title);

  const back = document.createElement("div");
  back.className = "card__back";

  const translation = document.createElement("div");
  translation.className = "card__translation";
  translation.textContent = word.en;

  const transcription = document.createElement("div");
  transcription.className = "card__transcription";
  transcription.textContent = "...";
  const phonetic = await getPhonetic(word.en);
  transcription.textContent = phonetic;

  const soundBtn = document.createElement("button");
  soundBtn.className = "sound__btn";
  soundBtn.textContent = "🔊";
  soundBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    speakWord(word.en);
  });

  back.append(translation, transcription, soundBtn);

  inner.append(front, back);
  card.append(inner);

  card.addEventListener("click", (e) => {
    if (!e.target.closest(".sound__btn")) {
      card.classList.toggle("flipped");
    }
  });

  return card;
}
