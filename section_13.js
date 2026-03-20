export const Validator = {
  // 1. Validate Product ID
  isValidProductId(id) {
    const regex = /^P\d{3}$/;
    return regex.test(id);
  },

  // 2. Validate Email
  isValidEmail(email) {
    const regex = /^[\w.-]+@[\w.-]+\.\w{2,}$/i;
    return regex.test(email);
  },

  // 3. Extract all numbers using exec()
  extractNumbers(str) {
    const regex = /\d+/g;
    const results = [];
    let match;

    while ((match = regex.exec(str)) !== null) {
      results.push(match[0]);
    }

    return results;
  },

  // 4. Find Category
  findCategory(str) {
    const regex = /Electronics|Furniture|Accessories/i;
    const match = regex.exec(str);
    return match ? match[0] : null;
  },

  // 5. Detect multiline string
  isMultiline(str) {
    // Check if there's content after a newline
    const regex = /^.+$/m;
    const matches = str.match(regex);
    return matches && matches.length > 1;
  }
};