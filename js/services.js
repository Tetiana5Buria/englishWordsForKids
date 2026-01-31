const wordAliases = new Map([
  ["yoghurt", "yogurt"],
  ["cheque", "check"],
  ["favourite", "favorite"],
  ["colour", "color"],
  ["centre", "center"],
]);

const phoneticCache = new Map();

function normalizeWord(word) {
  return wordAliases.get(word.toLowerCase()) || word.toLowerCase();
}

export async function getPhonetic(word) {
  const apiWord = normalizeWord(word);
  const cacheKey = apiWord;

  if (phoneticCache.has(cacheKey)) {
    return phoneticCache.get(cacheKey);
  }

  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${apiWord}`
    );

    const entry = response.data[0];

    let phonetic = entry.phonetic || "";

    if (!phonetic && entry.phonetics?.length) {
      const withAudio = entry.phonetics.find((p) => p.audio);
      phonetic = withAudio?.text || entry.phonetics[0]?.text || "";
    }
    phonetic = phonetic || "—";

    phoneticCache.set(cacheKey, phonetic);
    return phonetic;
  } catch (err) {
    console.warn(`Phonetic API error for "${word}":`, err);
    phoneticCache.set(cacheKey, "—");
    return "—";
  }
}
