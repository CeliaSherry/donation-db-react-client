import React from 'react';
import filter from 'lodash/filter';
import style from './style.module.css';

const labelClass = ({dirty}, {value}) => filter([
    style['text-input__label'],
    dirty || value ? style['has-value'] : ''
]).join(' ')
// Each of these input components is intended to encompass several things an input
// should handle in the application: labels, input state, and error state.
export const ReduxInput = ({input, meta, label, ...props}) =>
    <div className={style['text-input']}>
        <input className={style['text-input__field']} {...input} />
        <label className={labelClass(meta, input)}>
            {label}
        </label>
        {meta.error && meta.touched ?
            <span className={style['text-input__error']}>{meta.error}</span>
            : null}
    </div>
export const ReduxPassword = ({input, meta, label, ...props}) =>
    <div className={style['text-input']}>
        <input className={style['text-input__field']} type='password' {...input} />
        <label className={labelClass(meta, input)}>
            {label}
        </label>
        {meta.error && meta.touched ?
            <span className={style['text-input__error']}>{meta.error}</span>
            : null}
    </div>
export const ReduxTextArea = ({input, meta, label, ...props}) =>
    <div className={style['text-input']}>
        <textarea className={style["text-input__field"]} {...input} />
        <label className={labelClass(meta, input)}>
            {label}
        </label>
        {meta.error && meta.touched ?
            <span className={style['text-input__error']}>{meta.error}</span>
            : null}
    </div>
export const ReduxSelect = ({input, meta, hide, label, ...props}) =>
    <div style={hide ? {display: 'none'} : null} className={style['select-input']}>
        <label className={style['select-input__label']}>
            {label}
        </label>
        <select className={style['select-input__field']} {...input}>
            {props.children}
        </select>
        {meta.error && meta.touched ?
            <span className={style['text-input__error']}>{meta.error}</span>
            : null}
    </div>


export default ReduxInput;
