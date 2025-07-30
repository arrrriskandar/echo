import winkLemmatizer from "wink-lemmatizer";

export const lemmatize = (word) => {
  return (
    winkLemmatizer.noun(word.toLowerCase()) ||
    winkLemmatizer.verb(word.toLowerCase()) ||
    winkLemmatizer.adjective(word.toLowerCase()) ||
    winkLemmatizer.adverb(word.toLowerCase()) ||
    word.toLowerCase()
  );
};
