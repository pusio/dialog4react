export type Message = {
    title?: string, // title of the message
    text?: string, // body of the message
    showCancel?: boolean, // should cancel button be visible
    onClickCancel?: CallbackFunction, // executed when cancel button is clicked
    onClickConfirm?: CallbackFunction, // executed when confirm button is clicked
    cancelText?: string, // override text inside cancel button
    confirmText?: string, // override text inside confirm button
};
export type NotifierFunction = () => void;
export type CallbackFunction = (message: Message) => void;

export default class Dialog {
    private static queue: Array<Message> = [];
    private static notifier?: NotifierFunction = undefined;

    public static add(message: Message) {
        Dialog.queue.push(message);
        if (Dialog.notifier) {
            Dialog.notifier();
        }
    }

    public static registerNotifier(notifier: NotifierFunction) {
        Dialog.notifier = notifier;
    }

    public static pop(): Message | undefined {
        return Dialog.queue.splice(0, 1)[0];
    }
}