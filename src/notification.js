import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './alert.js';

let count = 0;

export default class Notification extends React.Component {
    static propTypes = {
        notices: React.PropTypes.array,
        prefixName: React.PropTypes.string
    }

    static defaultProps = {
        notices: [],
        prefixName: 'salt'
    }

    constructor(props) {
        super(props);
        this.addNotice = this.addNotice.bind(this);
        this.removeNotice = this.removeNotice.bind(this);
    }

    state = {
        notices: this.props.notices.map((notice) => {
            notice.id = this.genKey();
            return notice;
        }) || []
    }

    addNotice(notice) {
        notice.id = this.genKey();
        let { notices } = this.state;
        this.setState({
            notices: notices.concat(notice)
        });
    }

    removeNotice(id) {
        this.setState({
            notices: this.state.notices.filter(notice => notice.id != i)
        });
    }

    genKey() {
        return 'notice_' + count++;
    }

    render() {
        let { notices } = this.state;
        let { prefixName } = this.props;
        let self = this;

        return (
            <div className={`${prefixName}-notice-list`}>
                {
                    notices.map((notice) => {
                        return (
                            <Alert
                                key={notice.id}
                                id={notice.id}
                                onClose={self.removeNotice}
                                duration={notice.duration}
                                type={notice.type}
                                prefixName={prefixName}
                            >
                                {notice.content}
                            </Alert>
                        );
                    })
                }
            </div>
        );
    }
}

Notification.key = 0;
Notification.containerMap = {};

Notification.instance = function( container = document.body ) {
    let reg = /noticelist-(\d+)/;
    let match = (container.className || '').match(reg);
    let noticeId = match && match[1];

    if (noticeId) {
        return Notification.containerMap['noticelist-' + noticeId];
    } else {
        let div = document.createElement('div');
        let notices = ReactDOM.render(<Notification notices={[]} />, div);

        div.className="salt-message-container";

        if (container === document.body) {
            container.appendChild(div);
        } else {
            container.insertBefore(div, container.firstChild);
        }

        Notification.containerMap['noticelist-' + ++Notification.key] = notices;
        container.className = container.className + ' noticilist-' + Notification.key;
        return notices;
    }
}
