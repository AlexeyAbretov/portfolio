import * as React from "react";
import * as classNames from "classnames";

declare var require:(moduleId:string) => any;
let $ = require("jquery");

interface IPopupTitle {
    title: string;
}

export class PopupTitle extends React.Component<IPopupTitle, {}> {
    render() {
        return <h2 className="offer-header">{this.props.title}</h2>;
    }
}

interface ISubTitle {
    title: string;
}

export class SubTitle extends React.Component<ISubTitle, {}> {
    render() {
        return <h4 className="offer-subheader">{this.props.title}</h4>;
    }
}

interface IPopupCloseButton {
    title: string;
    click();
}

export class PopupCloseButton extends React.Component<IPopupCloseButton, {}> {
    public static defaultProps: IPopupCloseButton = {
        title: "",

        click: () => { console.log("PopupCloseButton click") }
    };

    render() {
        let self = this;

        return <span className="popup-close"
            onClick={self.props.click}>{this.props.title}</span>;
    }
}

interface IFee {
    increaseTemplate: string;
    decreaseTemplate: string;
    equalTemplate: string;

    startFee: number;
    newFee: number;
}

export class Fee extends React.Component<IFee, { }> {
    public static defaultProps: IFee = {
        increaseTemplate: "{0} -> {1}",
        decreaseTemplate: "{0} -> {1}",
        equalTemplate: "{0}",

        startFee: 0,
        newFee: 0
    };

    render() {
        let self = this;
        let text = "";

        let startFee = this.props.startFee.toString().replace(".", ",");
        let newFee = this.props.newFee.toString().replace(".", ",");

        let parts = startFee.split(",");
        if (parts.length == 2 && parts[1].length == 1) {
            startFee = startFee + "0";
        }

        parts = newFee.split(",");
        if (parts.length == 2 && parts[1].length == 1) {
            newFee = newFee + "0";
        }

        if (this.props.startFee < this.props.newFee) {
            text = $.fn.format(
                this.props.increaseTemplate,
                startFee,
                newFee);
        } else if (this.props.startFee > this.props.newFee) {
            text = $.fn.format(
                this.props.decreaseTemplate,
                startFee,
                newFee);
        } else {
            text = $.fn.format(
                this.props.equalTemplate,
                startFee);
        }

        return <div className="align">
            <div className="offer-warn"
                dangerouslySetInnerHTML={{ __html: text }}>
            </div>
        </div>;
    }
}

interface IFooter {
    buttonTitle: string;
    linkTitle: string;
    orText: string;

    buttonClick();
    linkClick();
}

export class Footer extends React.Component<IFooter, {}> {
    public static defaultProps: IFooter = {
        buttonTitle: "it's a button",
        linkTitle: "it's a link",
        orText: "or",

        buttonClick: () => { console.log("Footer Button click"); },
        linkClick: () => { console.log("Footer Link click"); }
    };

    render() {
        return <div className="submit align offer-submit">
            <Button
                title={this.props.buttonTitle}
                click={this.props.buttonClick} />
            <span className="button-note">
                <span>{this.props.orText} </span>
                <Link
                    title={this.props.linkTitle}
                    click={this.props.linkClick} />
            </span>
        </div>;
    }
}

interface IButton {
    title: string;
    click();
}

export class Button extends React.Component<IButton, {}> {
    public static defaultProps: IButton = {
        title: "",
        click: () => { console.log("Button click"); }
    };

    render() {
        return <span className="button common">
            <input type="submit" value="{this.props.title}" />
            <label onClick={this.props.click}>{this.props.title}</label>
            <span className="disabled">{this.props.title}</span>
        </span>;
    }
}

interface ILink {
    title: string;
    click();
}

export class Link extends React.Component<ILink, {}> {
    public static defaultProps: IButton = {
        title: "",
        click: () => { console.log("Link click"); }
    };

    render() {
        return <span className="dynamic"
            dangerouslySetInnerHTML={{ __html: this.props.title }}
            onClick={this.props.click}></span>;
    }
}

export interface IState {
    checked: boolean;
    disabled: boolean;
}

interface ICheckbox extends IState {
    id: string;

    title: string;

    linkTitle: string;

    change(id: string);
    linkClick(id: string);

    linkOpened: boolean;
}

export class Checkbox extends React.Component<ICheckbox, { }> {
    public static defaultProps: ICheckbox = {
        id: "",
        title: "checkbox",

        linkTitle: "",

        checked: false,
        disabled: false,

        linkOpened: false,

        change: (id: string) => { console.log("Checkbox change"); },
        linkClick: (id: string) => { console.log("Checkbox linkClick"); }
    };

    click() {
        if (this.props.disabled == false) {
            this.props.change(this.props.id);
        }
    }

    linkClick() {
        this.props.linkClick(this.props.id);
    }

    render() {
        let itemClass = classNames(
            "checkbox-slide",
            { 'checked': this.props.checked == true },
            { 'inactive': this.props.disabled == true }
        );

        let linkClass = classNames(
            "dynamic arrow-opener-link",
            { 'opened': this.props.linkOpened == true }
        );

        let link = this.props.linkTitle != null &&
            this.props.linkTitle != "" ? <span className={linkClass}
                onClick={this.linkClick.bind(this)}>
                <span className="before"></span>{this.props.linkTitle}
            </span> : null;

        return <div>
            <span className={itemClass}
                onClick={this.click.bind(this)}>
                <input type="checkbox" />
            </span>
            <div className="checkbox-text">
                <h4 className="channel-name">{this.props.title}</h4>
                {link}
            </div>
        </div>;
    }
}
