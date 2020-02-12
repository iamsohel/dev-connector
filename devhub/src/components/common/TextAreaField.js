
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaField = ({
    name, placeholder, value, label, error, info, type, onChange, disabled
    }) => {
    return (
        <div className="form-group">
            <textarea
                type={type}
                className={classnames('form-control form-control-lg', { 'is-invalid': error })}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
                disabled={disabled}
            />
            {info && <small className="form-text text-muted"> {info} </small>}
            {error && (<div class="invalid-feedback"> {error} </div>)}
        </div>
    )
}

TextAreaField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

TextAreaField.defaultProps = {
    type: 'text'
}

export default TextAreaField;
