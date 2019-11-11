import React, { Component } from 'react';
import filter from 'lodash/filter';
import style from './style.module.css';


const cardClass = (props) => {
    console.log(style.body);
    return filter([
        style.body,
        style[props.color] ? style[props.color] : '',
        props.isLink ? style.link : '',
        props.className || ''
    ]).join('')
};

export default class Card extends Component {
    render(){
        const { className, color, isLink, ...otherProps } = this.props;
        return (
        <div {...otherProps } className={cardClass({className, color, isLink})}>
        {this.props.children}
        </div>
        );
    };
};


Card.Head = (props) => {
    return <div className = {style.head}>{props.children}</div>
};

Card.Subhead = (props) => {
    return <div className = {style.subhead}>{props.children}</div>
};

const rowClass = (props) => {
    return filter([
     style.row,
     props.last ? style.lastRow : '',
     props.pullRight ? style.pullRight : '',
     props.pullLeft ? style.pullLeft : '',
    ]).join(' ')
};

Card.Row = (props) => {
    return (
        <div className = {rowClass(props)}>
        {props.children}
        </div>
    )
};