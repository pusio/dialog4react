import React, { Component } from 'react';
import Dialog, { DarkDialogComponent as DialogComponent } from 'dialog4react';
import './style.css';

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", maxWidth: "1000px", margin: "50px auto" }}>
                    <button className="test-button" onClick={() => Dialog.add({ body: "hello world" })}>Simple Message</button>
                    <button className="test-button" onClick={() => Dialog.add({
                        title: '(optional) title of the message',
                        body: '(optional) body of the message',
                        showCancel: true,
                        onClickCancel: () => console.log("cancel"),
                        onClickConfirm: () => console.log("confirm"),
                        cancelText: "No",
                        confirmText: "Yes",
                    })}>Advanced Message</button>
                    <button className="test-button" onClick={() => Dialog.add({
                        title: 'Lorem Ipsum',
                        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec nulla sem. Nam at erat aliquet, elementum odio eu, molestie ligula. Proin accumsan tincidunt nisl, id pulvinar sapien semper nec. In hac habitasse platea dictumst. Aliquam at lobortis metus. Sed gravida tincidunt tortor id faucibus. In fringilla semper dui. Integer accumsan iaculis finibus.',
                        showCancel: true
                    })}>Lorem Ipsum</button>
                    <button className="test-button" onClick={() => {
                        const randomText = (len) => {
                            // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
                            let result = [];
                            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            let charactersLength = characters.length;
                            len = len || Math.floor(Math.random() * 20 + 10);
                            for (let i = 0; i < len; i++) {
                                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
                            }
                            return result.join('');
                        };
                        const fiftyFifty = (a, b) => {
                            if (Math.random() > 0.5) return a;
                            return b;
                        };
                        for (let i = 0; i < 10; i++) {
                            Dialog.add({
                                title: fiftyFifty(null, randomText()),
                                body: randomText(),
                                showCancel: fiftyFifty(true, false),
                                onClickCancel: () => console.log(randomText()),
                                onClickConfirm: () => console.log(randomText()),
                                cancelText: fiftyFifty(null, randomText()),
                                confirmText: fiftyFifty(fiftyFifty(null, "YE!"), fiftyFifty("🙀", randomText(5))),
                            });
                        }
                    }}>Spam Random Messages</button>
                </div>
                <DialogComponent />
            </React.Fragment>
        );
    }
}
