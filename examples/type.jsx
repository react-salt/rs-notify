import React, { Component } from 'react';
import Notify from '../src/notify.js';
import Button from 'rs-button';

export default class Type extends Component {
    info() {
        Notify.info('系统通知:普通类型');
    }
    success() {
        Notify.success('系统通知:成功类型');
    }
    warning() {
        Notify.warning('系统通知:警告类型');
    }
    danger() {
        Notify.danger('系统通知:危险类型');
    }

    render() {
        return (
            <div>
                <Button myStyle="info" onClick={this.info}>Info</Button> 
                <Button myStyle="success" onClick={this.success}>Success</Button> 
                <Button myStyle="warning" onClick={this.warning}>Warning</Button> 
                <Button myStyle="danger" onClick={this.danger}>Danger</Button> 
            </div>
        );
    }
}
