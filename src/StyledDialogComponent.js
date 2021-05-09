import StylessDialogComponent from './StylessDialogComponent';
import './defaultdialogstyle.css';

class StyledDialogComponent extends StylessDialogComponent { }

StyledDialogComponent.defaultProps = {
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

export default StyledDialogComponent;