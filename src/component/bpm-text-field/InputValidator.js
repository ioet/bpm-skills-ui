class InputValidator {
  isValidNumberInput(input) {
    return typeof input !== 'undefined' && input !== '' && !isNaN(input);
  }

  isValidStringInput(input) {
    return typeof input !== 'undefined' && input !== '';
  }
}

export default InputValidator;
