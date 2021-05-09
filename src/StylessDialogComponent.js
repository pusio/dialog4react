import React, { Component } from 'react';
import Dialog from './Dialog';

class StylessDialogComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
        };
        this.locked = true;
        Dialog.registerNotifier(this.checkForNewMessages);
    }

    componentDidMount() {
        this.locked = false;
        this.checkForNewMessages();
    }

    checkForNewMessages = () => {
        if (!this.locked) {
            const message = Dialog.pop();
            if (message) {
                this.setState({ message });
                this.locked = true;
            }
        }
    };

    onClickCancel = () => {
        if (this.state.message.onClickCancel) {
            this.state.message.onClickCancel(this.state.message);
        }
        this.nextMessage();
    };

    onClickConfirm = () => {
        if (this.state.message.onClickConfirm) {
            this.state.message.onClickConfirm(this.state.message);
        }
        this.nextMessage();
    };

    nextMessage = () => {
        const message = Dialog.pop();
        if (message) {
            this.setState({ message });
        } else {
            this.setState({ message: null }, () => {
                this.locked = false;
                this.checkForNewMessages();
            });
        }
    };

    render() {
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

StylessDialogComponent.defaultProps = {
    defaultCancelText: "Cancel",
    defaultConfirmText: "Confirm"
};

export default StylessDialogComponent;