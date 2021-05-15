import DialogComponent from './DialogComponent';
import Style from 'style-it';

export default class DarkDialogComponent extends DialogComponent {
    private customStyle: string = `
        .dialog4react-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.65);
            z-index: 2147483647;
        }
        .dialog4react-container {
            max-width: 500px;
            width: fit-content;
            margin: 0 auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            background-color: #2e3538;
            color: #dadada;
            border: 1px solid #171a1c;
            border-radius: 0.3rem;
        }
        .dialog4react-title {
            margin: 0;
            text-align: left;
            padding: 1rem;
            border-bottom: 1px solid #171a1c;
            font-size: 1.25rem;
            line-height: 1.5;
        }
        .dialog4react-body {
            padding: 1rem;
            margin: 0;
        }
        .dialog4react-button-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem;
            border-top: 1px solid #171a1c;
        }
        button.dialog4react-confirm, button.dialog4react-cancel {
            border-radius: 0;
            outline: 0;
            border: none;
            cursor: pointer;
            margin: 0.25rem;
            padding: 0.375rem 0.75rem;
            border-radius: 0.25rem;
            transition: background-color 0.2s ease-in-out;
            text-align: center;
            vertical-align: middle;
            line-height: 1.5;
            color: #ffffff;
        }
        button.dialog4react-confirm:only-child {
            margin-left: auto;
        }
        button.dialog4react-confirm {
            background-color: #2a8938;
        }
        button.dialog4react-confirm:hover {
            background-color: #309c40;
        }
        button.dialog4react-cancel {
            background-color: #454c54;
        }
        button.dialog4react-cancel:hover {
            background-color: #505962;
        }
    `;
    public render() {
        return Style.it(this.customStyle, super.render());
    }
}