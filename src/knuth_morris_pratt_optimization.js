// Create by Zubin on 2018-08-11 14:50:54

export function getNext(word) {
  const next = [-1];
  let suffixIndex = -1;
  let wordIndex = 0;

  while (wordIndex < word.length) {
    if (suffixIndex === -1 || word[wordIndex] === word[suffixIndex]) {
      suffixIndex++;
      wordIndex++;

      // 相同继续往前找真前缀
      if (word[wordIndex] === word[suffixIndex]) {
        next[wordIndex] = next[suffixIndex];
      } else {
        next[wordIndex] = suffixIndex;
      }
    } else {
      suffixIndex = next[suffixIndex];
    }
  }

  return next;
}

/**
 * KMP算法(优化)
 *
 * @export
 * @param {String} searchString
 * @param {String} word
 */
export default function knuthMorrisPratt(searchString, word) {
  let strIndex = 0;
  let wordIndex = 0;

  const next = getNext(word);

  while (strIndex < searchString.length && wordIndex < word.length) {
    if (wordIndex === -1 || searchString[strIndex] === word[wordIndex]) {
      strIndex++;
      wordIndex++;
    } else {
      // wordIndex不回退
      wordIndex = next[wordIndex];
    }
  }

  return wordIndex === word.length ? strIndex - wordIndex : -1;
}
