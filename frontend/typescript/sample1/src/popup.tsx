import * as React from "react";
import * as classNames from "classnames";

declare var require:(moduleId:string) => any;
let Enumerable = require("Enumerable");

import * as Shared from "./Shared";
import * as Offers from "./Offers";

declare var require:(moduleId:string) => any;
let $ = require("jquery");

export interface ISavePackagesPopupData {
    title: string;
    closeBtnTitle: string;

    increaseTemplate: string;
    decreaseTemplate: string;
    equalTemplate: string;

    buttonTitle: string;
    linkTitle: string;
    orText: string;

    subTitle1: string;
    subTitle2: string;
    subTitle3: string;
    changedPricesNote: string;

    currentMonthlyFee: number;
    tariffFee: number;
    newFee: number;

    items: Offers.IPackage[]
}

export interface ISavePackagesPopup {
    data: ISavePackagesPopupData;

    isShow: boolean;
    onClose();
    onSubmit(data: any);
}

export class SavePackagesPopup extends React.Component<ISavePackagesPopup,
    {
        //isShow: boolean,
        newFee: number,
        checkedItems: Offers.IPackage[]
    }> {

    public static defaultProps: ISavePackagesPopup = {
        data: {
            title: "title",
            closeBtnTitle: "close",

            buttonTitle: "it's a button",
            linkTitle: "it's a link",
            orText: "or",

            subTitle1: "title 1",
            subTitle2: "title 2",
            subTitle3: "title 3",
            changedPricesNote: "changedPricesNote",

            increaseTemplate: "{0} -> {1}",
            decreaseTemplate: "{0} -> {1}",
            equalTemplate: "{0}",

            currentMonthlyFee: 0,
            tariffFee: 0,
            newFee: 0,

            items: []
        },

        isShow: false,
        onClose: () => { console.log("SavePackagesPopup onClose"); },
        onSubmit: (data: any) => { console.log("SavePackagesPopup onSubmit"); }
    };

    constructor(props: any) {
        super(props);

        this.state = {
            newFee: 0,
            checkedItems: []
        };
    }

    componentWillMount() {
        this.state.newFee = this.props.data.newFee;

        this.state.checkedItems = Enumerable
            .from(this.props.data.items)
            .where((x) => x.checked == true)
            .toArray();
    }

    closeClick() {
        this.hide();
    }

    submit() {
        this.props.onSubmit({
            checkedItems: this.state.checkedItems
        });

        this.hide();
    }

    checkboxChange(id: string) {
        let self = this;

        let newState = this.state;
        let checkedItem = Enumerable
            .from(newState.checkedItems)
            .firstOrDefault((x) => x.id == id);

        if (checkedItem != null) {
            newState.checkedItems = Enumerable
                .from(newState.checkedItems)
                .where((x) => x.id != id)
                .toArray();
        } else {
            let item = Enumerable
                .from(this.props.data.items)
                .where((x) => x.id == id)
                .firstOrDefault();
            if (item != null) {
                newState.checkedItems = Enumerable
                    .from(newState.checkedItems)
                    .merge(Enumerable.from([item]))
                    .toArray();
            }
        }

        if (typeof $.fn.getTariffInfo == "function") {
            $.fn.getTariffInfo(
                Enumerable
                    .from(newState.checkedItems)
                    .select((x) => { return x.id; })
                    .toArray(),
                (data) => {
                    newState.newFee = (data == null ?
                        newState.newFee :
                        (self.props.data.currentMonthlyFee - self.props.data.tariffFee + data.fee));
                    self.setState(newState);
                })
        }
    }

    public hide() {
        this.props.onClose();
    }

    render() {
        let self = this;

        let itemClass = classNames(
            "modal-wrap",
            { 'show': this.props.isShow == true }
        );

        let items1 =
            Enumerable
                .from(self.props.data.items)
                .where((x) => x.status == Offers.SavePackageStatus.EqualsById)
                //.groupBy(
                //    (x) => x.id,
                //    (x) => x,
                //    (g, x) => x.count() > 1 && x.any((a) => a.feeNote != null && a.feeNote != "") ?
                //        x.first(
                //            (s) => s.feeNote != null && s.feeNote != "") :
                //        x.first())
                .toArray();

        let items2 = Enumerable
            .from(self.props.data.items)
            .where((x) => x.status == Offers.SavePackageStatus.Connected &&
                !Enumerable
                    .from(items1)
                    .any((a) => a.saveId == x.id))
            .toArray();

        let items3 = Enumerable
            .from(self.props.data.items)
            .where((x) => x.status == Offers.SavePackageStatus.EqualsByName &&
                !Enumerable
                    .from(items1)
                    .any((a) => a.id == x.id))
            .toArray();

        let hasChangedPrices = Enumerable
            .from(items1)
            .any((x) => x.feeNote != null && x.feeNote != "");

        let subTitle1 = this.props.data.subTitle1;

        if (hasChangedPrices) {
            subTitle1 += (" " + this.props.data.changedPricesNote);
        }

        const disabledStyle = {
            display: 'none'
        };

        return <div className={itemClass}>
            <div className="popup-bg"></div>
            <div className="popup">
                <div className="popup-content">
                    <div className="disabled-popup" style={disabledStyle}></div>
                    <span className="popup-close">Закрыть</span>

                    <Shared.PopupCloseButton
                        title={this.props.data.closeBtnTitle}
                        click={self.closeClick.bind(self)}
                        />

                    <Shared.PopupTitle
                        title={this.props.data.title}
                        />

                    {items1 != null && items1.length > 0 ? <Shared.SubTitle
                        title={subTitle1}
                        /> : null }

                    <Offers.Offer
                        items={items1}
                        checkboxChange={self.checkboxChange.bind(self)}
                        checkedItems={self.state.checkedItems}
                        />

                    {items2 != null && items2.length > 0 ? <Shared.SubTitle
                        title={this.props.data.subTitle2}
                        /> : null}

                    <Offers.Offer
                        items={items2}
                        checkboxChange={self.checkboxChange.bind(self)}
                        checkedItems={self.state.checkedItems}
                        />

                    {items3 != null && items3.length > 0 ? <Shared.SubTitle
                        title={this.props.data.subTitle3}
                        /> : null}

                    <Offers.Offer
                        items={items3}
                        checkboxChange={self.checkboxChange.bind(self)}
                        checkedItems={self.state.checkedItems}
                        />

                    <Shared.Fee
                        startFee={this.props.data.currentMonthlyFee}
                        newFee={this.state.newFee}
                        increaseTemplate={this.props.data.increaseTemplate}
                        decreaseTemplate={this.props.data.decreaseTemplate}
                        equalTemplate={this.props.data.equalTemplate}
                        />

                    <Shared.Footer
                        buttonTitle={this.props.data.buttonTitle}
                        linkTitle={this.props.data.linkTitle}
                        orText={this.props.data.orText}
                        buttonClick={self.submit.bind(self)}
                        linkClick={self.closeClick.bind(self)}
                        />
                </div>
            </div>
        </div>;
    }
}