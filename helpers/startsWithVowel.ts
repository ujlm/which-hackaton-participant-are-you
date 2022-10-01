export default function startsWithVowel(word: string) {
    var vowels = ("aeiouAEIOU");
    return vowels.indexOf(word[0]) !== -1;
  }