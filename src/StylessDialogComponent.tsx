import React, { Component } from 'react';
import Dialog, { Message } from './Dialog';

export type DialogComponentProps = {
    overlayClassName?: string,
    containerClassName?: string,
    titleClassName?: string,
    textClassName?: string,
    buttonContainerClassName?: string,
    buttonConfirmClassName?: string,
    buttonCancelClassName?: string,
    defaultCancelText?: string,
    defaultConfirmText?: string
};

type DialogComponentState = {
    message?: Message;
};

export default class StylessDialogComponent extends Component<DialogComponentProps, DialogComponentState> {

    public static defaultProps: DialogComponentProps = {
        overlayClassName: "dialog4react-overlay",
        containerClassName: "dialog4react-container",
        titleClassName: "dialog4react-title",
        textClassName: "dialog4react-text",
        buttonContainerClassName: "dialog4react-button-container",
        buttonConfirmClassName: "dialog4react-confirm",
        buttonCancelClassName: "dialog4react-cancel",
        defaultCancelText: "Cancel",
        defaultConfirmText: "Confirm"
    };

    private locked: boolean;

    constructor(props: DialogComponentProps) {
        super(props);
        this.state = {
            message: undefined,
        };
        this.locked = true;
        Dialog.registerNotifier(this.checkForNewMessages);
    }

    public componentDidMount() {
        this.locked = false;
        this.checkForNewMessages();
    }

    private checkForNewMessages = () => {
        if (!this.locked) {
            const message = Dialog.pop();
            if (message) {
                this.setState({ message });
                this.locked = true;
            }
        }
    };

    private onClickCancel = () => {
        this.state.message?.onClickCancel?.(this.state.message);
        this.nextMessage();
    };

    private onClickConfirm = () => {
        this.state.message?.onClickConfirm?.(this.state.message);
        this.nextMessage();
    };

    private nextMessage = () => {
        const message = Dialog.pop();
        if (message) {
            this.setState({ message });
        } else {
            this.setState({ message: undefined }, () => {
                this.locked = false;
                this.checkForNewMessages();
            });
        }
    };

    public render() {
        const { message } = this.state;
        if (!message) return null;
        const { overlayClassName, containerClassName, titleClassName, textClassName,
            buttonContainerClassName, buttonConfirmClassName, buttonCancelClassName,
            defaultCancelText, defaultConfirmText } = this.props;
        return (
            <div className={overlayClassName}>
                <div className={containerClassName}>
                    {message.title && <h1 className={titleClassName}>{message.title}</h1>}
                    {message.text && <p className={textClassName}>{message.text}</p>}
                    <div className={buttonContainerClassName}>
                        {message.showCancel && <button className={buttonCancelClassName} onClick={this.onClickCancel}>{message.cancelText || defaultCancelText}</button>}
                        <button className={buttonConfirmClassName} onClick={this.onClickConfirm}>{message.confirmText || defaultConfirmText}</button>
                    </div>
                </div>
            </div>
        );
    }

}