import * as React from "react";
import {unmountComponentAtNode, render} from "react-dom";

import * as Popup from "./Popup";

declare var require:(moduleId:string) => any;
let $ = require("jquery");

class SavePackagesPopupFactory
{
    private _selector: string = null;
    private _onSubmit: (DataCue: any) => { };

    onClose() {
        unmountComponentAtNode(
            $(this._selector)[0]);
    }

    onSubmit(data) {
        this._onSubmit(data);
    }

    show(options: Popup.ISavePackagesPopupData, selector: string, onSubmit: (data: any) => {}) {
        this._selector = selector;
        this._onSubmit = onSubmit;

        render(
            <Popup.SavePackagesPopup
                data={options}
                isShow={true}
                onClose={this.onClose.bind(this)}
                onSubmit={this.onSubmit.bind(this)} />,
            $(selector)[0]
        );
    }
}

export = SavePackagesPopupFactory;
