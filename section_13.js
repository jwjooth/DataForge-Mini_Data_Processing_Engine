const Validator = {
  isValidProductId(id){
    return /^P\d{3}$/.test(id)
  },
  isValidEmail(email){
    return /^[\w.-]+@[\w.-]+\.\w{2,}$/i.test(email);
  },
  extractNumbers(str){
    
  },
  findCategory(str){
    return /Electronics|Furniture|Accessories/i.exec(str);
  },
  isMultiline(str){

  },
};