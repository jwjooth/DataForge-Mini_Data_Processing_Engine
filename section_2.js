export const StringUtils = {
  normalize(str) {
    const words = str.toLowerCase().trim().split(" ");
    const result = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return result.join(" ");
  },
  toSlug(str) {
    return str.toLowerCase().trim().replaceAll(" ", "-");
  },
  truncate(str, maxLength) {
    if (str.length > maxLength) {
      const data = [];
      const arr = str.split("");
      for (let i = 0; i < maxLength; i++) {
        data.push(arr[i]);
      }
      return data.join("") + "...";
    } else {
      return str;
    }
  },
  countWords(str) {
    return str.split(" ").length;
  },
  containsKeyword(str, keyword) {
    return str.toLowerCase().includes(keyword.toLowerCase()) ? true : false;
  },
  extractId(str) {
    return str.substring(1);
  },
};