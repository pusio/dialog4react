export default class Dialog {
    static _queue = [];
    static _notifier = null;

    /**
     * Enqueue message to be rendered by DialogComponent.
     * @param {object} message 
     * example message = {
     *     title: '(optional) title of the message',
     *     text: '(optional) body of the message',
     *     showCancel: true, // should cancel button be visible
     *     onClickCancel: () => console.log("cancel"), // should clicking on cancel button do something
     *     onClickConfirm: () => console.log("confirm"), // should clicking on confirm button do something
     *     cancelText: "No", // override text inside cancel button,
     *     confirmText: "Yes", // override text inside confirm button,
     * };
     */
    static add = (message) => {
        Dialog._queue.push(message);
        if (Dialog._notifier && typeof Dialog._notifier === 'function') {
            Dialog._notifier();
        }
    };

    static registerNotifier = (notifier) => {
        Dialog._notifier = notifier;
    };

    static pop = () => {
        return Dialog._queue.splice(0, 1)[0];
    };
}