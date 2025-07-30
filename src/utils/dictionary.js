export const isValidWord = async (word) => {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    return res.ok;
  } catch {
    return false;
  }
};
