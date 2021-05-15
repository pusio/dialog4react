import React, { Component } from 'react';
import Dialog, { Message } from './Dialog';

export type DialogComponentProps = {
    overlayClassName?: string,
    containerClassName?: string,
    titleClassName?: string,
    bodyClassName?: string,
    buttonContainerClassName?: string,
    buttonConfirmClassName?: string,
    buttonConfirmText?: string,
    buttonCancelClassName?: string,
    buttonCancelText?: string,
};

type DialogComponentState = {
    message?: Message;
};

export default class DialogComponent extends Component<DialogComponentProps, DialogComponentState> {

    public static defaultProps: DialogComponentProps = {
        overlayClassName: "dialog4react-overlay",
        containerClassName: "dialog4react-container",
        titleClassName: "dialog4react-title",
        bodyClassName: "dialog4react-body",
        buttonContainerClassName: "dialog4react-button-container",
        buttonConfirmClassName: "dialog4react-confirm",
        buttonCancelClassName: "dialog4react-cancel",
        buttonCancelText: "Cancel",
        buttonConfirmText: "Confirm",
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
        const {
            overlayClassName,
            containerClassName,
            titleClassName,
            bodyClassName,
            buttonContainerClassName,
            buttonConfirmClassName, buttonConfirmText,
            buttonCancelClassName, buttonCancelText,
        } = this.props;
        return (
            <div className={overlayClassName}>
                <div className={containerClassName}>
                    {message.title && <h1 className={titleClassName} >{message.title}</h1>}
                    {message.body && <p className={bodyClassName} >{message.body}</p>}
                    <div className={buttonContainerClassName} >
                        {message.showCancel && <button className={buttonCancelClassName} onClick={this.onClickCancel}>{message.cancelText || buttonCancelText}</button>}
                        <button className={buttonConfirmClassName} onClick={this.onClickConfirm}>{message.confirmText || buttonConfirmText}</button>
                    </div>
                </div>
            </div>
        );
    }

}