import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './InputField.scss';


export default function InputField({ type, name, placeholder, value, pattern, onChange, error, disabled }) {
  return (
    <div className={classnames('input-field', {
      'input-field--focus': value.length > 0,
      'is-invalid': error
    })}>
      <div className="input-field-inner">
        <input
          type={type}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          value={value}
          pattern={pattern}
          onChange={onChange}
        />
      </div>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};


InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  pattern: PropTypes.string,
  disabled: PropTypes.bool
};

InputField.defaultProps = {
  type: 'text',
  disabled: false
};
