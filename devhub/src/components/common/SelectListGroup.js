import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name, value, error, info, onChange, options
    }) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
    return (
        <div className="form-group">
            <select
                className={classnames('form-control form-control-lg', { 'is-invalid': error })}
                onChange={onChange}
                name={name}
                value={value}
            >
             {selectOptions}
            </select>
            {info && <small className="form-text text-muted"> {info} </small>}
            {error && (<div class="invalid-feedback"> {error} </div>)}
        </div>
    )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    options: PropTypes.array.isRequired
}

SelectListGroup.defaultProps = {
    type: 'text'
}

export default SelectListGroup;
