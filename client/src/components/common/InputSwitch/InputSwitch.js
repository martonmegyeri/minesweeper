import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './InputSwitch.scss';


export default function InputSwitch({ name, checked, label, onChange, error, disabled }) {
  return (
    <div className={classnames('input-switch', {
      'is-invalid': error
    })}>
      <div className="input-switch-inner">
        <input
          type="checkbox"
          disabled={disabled}
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={name} className="input-switch-label">{label}</label>
      </div>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};


InputSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

InputSwitch.defaultProps = {
  disabled: false
};
