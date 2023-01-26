import React from 'react'
import classes from './style.module.scss';

interface IProps {
    onChange(e: any): void
    placeholder?: string
    value: string
}
function TextBoxCustom({ onChange, placeholder, value }: IProps) {
    return <input type="text" value={value} onChange={onChange} className={classes.input} placeholder={placeholder || ''} />
}

export default TextBoxCustom