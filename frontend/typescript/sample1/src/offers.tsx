import * as React from "react";

declare var require:(moduleId:string) => any;
let Enumerable = require("Enumerable");
let $ = require("jquery");

import * as Channels from "./Channels";
import * as Shared from "./Shared";

export interface IOffer {
    items: IPackage[];

    checkedItems: IPackage[];

    checkboxChange(id: string);
}

export class Offer extends React.Component<IOffer, { openedLinks: string[] }> {
    public static defaultProps: IOffer = {
        items: [],

        checkedItems: [],

        checkboxChange: (id: string) => { console.log("Offer checkboxChange"); }
    };

    constructor(props: any) {
        super(props);

        this.state = {
            openedLinks: []
        };
    }

    linkClick(id: string) {
        let newState = this.state;
        let self = this;

        if (Enumerable
            .from(this.state.openedLinks)
            .any((x) => x == id)) {
            newState.openedLinks = Enumerable
                .from(this.state.openedLinks)
                .where((x) => x != id)
                .toArray();

            self.setState(newState);
        } else {
            if (typeof $.fn.getChannels == "function") {
                newState.openedLinks.push(id);

                $.fn.getChannels(id, (data) => {
                    if (data == null && data.length > 0) {
                        return;
                    }

                    var item = Enumerable
                        .from(self.props.items)
                        .firstOrDefault((x) => x.id == id);

                    if (item != null) {
                        item.channels = Enumerable
                            .from(data)
                            .select((x: any) => {
                                return {
                                    id: x.Id,
                                    note: x.description,
                                    title: x.name,
                                    img: x.imageUrl
                                };
                            })
                            .toArray();
                    }

                    self.setState(newState);
                });
            }
        }
    }

    render() {
        let self = this;
        let items = this.props.items.map(function (item) {
            let checked = Enumerable
                .from(self.props.checkedItems)
                .any((x) => x.id == item.id);
            let visible = Enumerable
                .from(self.state.openedLinks)
                .any((x) => x == item.id);
            let offerKey = $.fn.GUID();
            let channelsKey = $.fn.GUID();

            return [
                <OfferRow
                    key={offerKey}
                    disabled={item.disabled}
                    checkboxChange={self.props.checkboxChange}
                    linkClick={self.linkClick.bind(self)}
                    linkOpened={visible}
                    {...item}
                    checked={checked}
                    />,
                <InfoBlock
                    note={item.note}
                    visible={visible}
                    key={channelsKey}
                    id={item.id}
                    channels={item.channels}
                    />
            ];
        });

        return <div className="offers">
            <div className="tv-offers tv-offers__additionals">
                <table>
                    <colgroup>
                        <col className="grid-456" />
                        <col width="auto" />
                    </colgroup>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        </div>;
    }
}

interface IOfferRow extends IOfferItem {
    checkboxChange(id: string);
    linkClick(id: string);
    linkOpened: boolean;
}

export interface IOfferItem extends Shared.IState {
    id: string;
    checkboxTitle: string;
    linkTitle: string;
    fee: number;
    feeType: string;
    feeNote: string;
    accNote: string;
}

export interface IPackage extends IOfferItem {
    saveId: string;
    note: string;

    status: SavePackageStatus,

    channels: Channels.IChannel[]
}

export enum SavePackageStatus {
    EqualsById = 1,

    EqualsByName = 2,

    Connected = 100
}

export class OfferRow extends React.Component<IOfferRow, {}> {
    public static defaultProps: IOfferRow = {
        id: "",
        checkboxTitle: "checkbox",
        linkTitle: "",
        fee: 0,
        feeType: "",
        feeNote: "",
        accNote: "",

        checked: false,
        disabled: false,
        linkOpened: false,

        checkboxChange: (id: string) => { console.log("OfferItem checkboxChange"); },
        linkClick: (id: string) => { console.log("OfferItem checkboxChange"); }
    };

    render() {
        let feeNote = null;

        if (this.props.accNote == null || this.props.accNote == "") {
            feeNote = this.props.feeNote == null || this.props.feeNote == "" ?
                null :
                <div className="price-note"
                    dangerouslySetInnerHTML={{ __html: this.props.feeNote }}></div>;
        } else {
            feeNote = <div className="price-note"
                dangerouslySetInnerHTML={{ __html: this.props.accNote }}></div>;
        }

        let fee = this.props.fee.toString().replace(".", ",");
        let parts = fee.split(",");
        if (parts.length == 2 && parts[1].length == 1) {
            fee = fee + "0";
        }

        return <tr>
            <td>
                <Shared.Checkbox
                    id={this.props.id}
                    title={this.props.checkboxTitle}
                    linkTitle={this.props.linkTitle}
                    checked={this.props.checked}
                    disabled={this.props.disabled}
                    change={this.props.checkboxChange}
                    linkClick={this.props.linkClick.bind(this)}
                    linkOpened={this.props.linkOpened}
                    />
            </td>
            <td className="price">
                {fee} <span className="note">{this.props.feeType}</span>
                {feeNote}
            </td>
        </tr>;
    }
}
export interface IInfoBlock {
    id: string;
    note: string;
    visible: boolean;
    channels: Channels.IChannel[]
}

export class InfoBlock extends React.Component<IInfoBlock, {}> {
    public static defaultProps: IInfoBlock = {
        id: "",
        note: "",
        visible: false,
        channels: []
    };

    render() {
        let rowStyle = {
            display: this.props.visible ? "table-row" : 'none'
        };

        let contentStyle = {
            display: this.props.visible ? "block" : 'none'
        };

        return <tr className="open-service" style={rowStyle}>
            <td colSpan={2}>
                <div className="open-content" style={contentStyle}>
                    <div className="free-channels">
                        <p className="tv-note"
                            dangerouslySetInnerHTML={{ __html: this.props.note }}>
                        </p>
                        <Channels.ChannelsBlock
                            channels={this.props.channels}
                            />
                    </div>
                </div>
            </td>
        </tr>;
    }
}
