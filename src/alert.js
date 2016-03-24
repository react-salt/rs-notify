import React, { Component } from 'react';

export default class Alert extends Component {
    static propTypes = {
        duration: React.PropTypes.number,
        content: React.PropTypes.string,
        prefixName: React.PropTypes.string
    }
    static defaultProps = {
        duration: 5,
        content: 'This is a notice',
        prefixName: 'salt'
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

	handleClick() {
        this.props.onClose(this.props.notice.id);
	}

	clearTimer() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}

	componentDidMount() {
        let { duration } = this.props;
		if (duration !== 0) {
			this.timer = setTimeout(() => {
				this.onClose();
			}, duration * 1000);
		}
	}

	shouldComponentUpdate(nextProps) {
		return false;
	}

	componentWillUnmount() {
		this.clearTimer();
	}

    render() {
		let { type, prefixName } = this.props,
            cls = `${prefixName}-alert ${prefixName}-alert-${type}`;

        return (
            <div className={cls}>
				{ this.props.children }
				<i className="close" onClick={this.handleClick}>&times;</i>
            </div>
        );
    }
}
