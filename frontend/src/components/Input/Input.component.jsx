import React from 'react'
import './Input.component.css'

const Input = ({
    type,
    placeholder,
    onInput,
    errorLog,
    value,
    valueState
}) => {
    const clear = () => {
        valueState(() => "")
    }

    return (
        <div
            className="input-parent"
        >
            <div 
                className={`input-container`}
            >
                <input
                    type={type}
                    placeholder={placeholder}
                    onInput={onInput}
                    value={value}
                    className="input"
                />
                <div className="clear-input" onClick={clear}>
                    {value.length > 0 ? "X" : "<-"}
                </div>
            </div>
            { errorLog && <p className="error-log">{errorLog}</p> }
        </div>
    )
}

export default Input