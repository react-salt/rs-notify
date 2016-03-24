import Notification from './notification.js';

function fireNotice(type, content, settings) {
    let container;
    let notice = {
        type: type,
        content: content
    };

    if (typeof settings === 'number') {
        notice.duration = settings;
    } else if (typeof settings === 'object') {
        if (!settings.nodeType) {
            notice.duration = settings.duration;
            container = settings.container;
        } else {
            container = settings;
        }
    }

    Notification.instance(container).addNotice(notice);

}

let Notify = {};
['info', 'success', 'warning', 'danger'].forEach((item) => {
    Notify[item] = function() {
        fireNotice.call(this, item, arguments[0], arguments[1]);
    }
});

export default Notify;
