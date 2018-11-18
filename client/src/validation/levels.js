import Validator from 'validator';


const validateLevelsInput = (data) => {
  const errors = {};

  // Width
  if (parseInt(data.width) < 1) {
    errors.width = 'Field width\'s value should be at least 1';
  }
  if (parseInt(data.width) > 80) {
    errors.width = 'Field width\'s value should be maximum 80';
  }
  if (!Validator.isNumeric(data.width)) {
    errors.width = 'Field width should only contains numbers';
  }
  if (Validator.isEmpty(data.width)) {
    errors.width = 'Field width can not be empty';
  }

  // Height
  if (parseInt(data.height) < 1) {
    errors.height = 'Field height\'s value should be at least 1';
  }
  if (parseInt(data.height) > 80) {
    errors.height = 'Field height\'s value should be maximum 80';
  }
  if (!Validator.isNumeric(data.height)) {
    errors.height = 'Field height should only contains numbers';
  }
  if (Validator.isEmpty(data.height)) {
    errors.height = 'Field height can not be empty';
  }

  // Mines
  if (parseInt(data.mines) < 1) {
    errors.mines = 'Field mines\'s value should be at least 1';
  }
  if (parseInt(data.mines) > 80) {
    errors.mines = 'Field mines\'s value should be maximum 999';
  }
  if (!Validator.isNumeric(data.mines)) {
    errors.mines = 'Field mines should only contains numbers';
  }
  if (Validator.isEmpty(data.mines)) {
    errors.mines = 'Field mines can not be empty';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}


export default validateLevelsInput;