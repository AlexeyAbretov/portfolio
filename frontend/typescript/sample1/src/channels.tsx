import * as React from "react";

declare var require:(moduleId:string) => any;
let Enumerable = require("Enumerable");
let $ = require("jquery");

import * as Shared from "./Shared";

export interface IChannelItem extends IChannel {
    click(id: string);
}

export interface IChannel {
    id: string;
    title: string;
    img: string;
    note: string;
}

export class ChannelItem extends React.Component<IChannelItem, {}> {
    public static defaultProps: IChannelItem = {
        title: "",
        img: "",
        id: "",
        note: "",
        click: (id: string) => { console.log("ChannelItem click"); }
    };

    click() {
        this.props.click(this.props.id);
    }
    render() {
        return <div className="free-channel" data-id={this.props.id}>
            <div className="tv-logo">
                <img src={this.props.img} alt="Лого" />
                {this.props.note == null || this.props.note == "" ?
                    <span>{this.props.title}</span> :
                    <span className="dynamic"
                        onClick={this.click.bind(this)}>{this.props.title}</span>
                }
            </div>
        </div>;
    }
}

export interface IChannelsBlock {
    channels: IChannel[]
}

export class ChannelsBlock extends React.Component<IChannelsBlock, { openedId: string }> {
    public static defaultProps: IChannelsBlock = {
        channels: []
    };

    constructor(props: any) {
        super(props);

        this.state = {
            openedId: null
        };
    }

    click(id: string) {
        let newState = this.state;

        newState.openedId = id;

        this.setState(newState);
    }

    noteCloseClick(id: string) {
        let newState = this.state;

        newState.openedId = null;

        this.setState(newState);
    }

    render() {
        let self = this;
        let items = [];
        let skip = 0;
        let take = 4;
        let channels = Enumerable
            .from(self.props.channels)
            .skip(skip * take)
            .take(take)
            .toArray();

        while (channels != null && channels.length > 0) {
            let key = $.fn.GUID();
            items.push(<ChannelsLine channels={channels} key={key} click={this.click.bind(self)} />);
            key = $.fn.GUID();
            items.push(<ChannelsNoteContainer
                channels={channels}
                key={key}
                openedId={self.state.openedId}
                closeClick={self.noteCloseClick.bind(self)} />);

            skip++;

            channels = Enumerable
                .from(self.props.channels)
                .skip(skip * take)
                .take(take)
                .toArray();
        }

        return <div className="free-channel-line-wrap">{items}</div>;
    }
}

export interface IChannelsLine {
    channels: IChannel[],

    click(id: string);
}

export class ChannelsLine extends React.Component<IChannelsLine, {}> {
    public static defaultProps: IChannelsLine = {
        channels: [],

        click: (id: string) => { console.log("ChannelItem click"); }
    };

    render() {
        let self = this;
        let items = this.props.channels.map(function (item) {
            let key = $.fn.GUID();
            return (
                <ChannelItem
                    id={item.id}
                    key={key}
                    img={item.img}
                    title={item.title}
                    click={self.props.click}
                    note={item.note}
                    />
            );
        });

        return <div className="free-channel-line">{items}</div>;
    }
}

export interface IChannelsNoteContainer {
    channels: IChannel[],

    openedId: string;

    closeClick(id: string);
}

export class ChannelsNoteContainer extends React.Component<IChannelsNoteContainer, {}> {
    public static defaultProps: IChannelsNoteContainer = {
        channels: [],
        openedId: "",
        closeClick: (id: string) => { console.log("ChannelsNoteContainer closeClick"); }
    };

    render() {
        let self = this;

        let items = this.props.channels.map(function (item) {
            let key = $.fn.GUID();
            return (item.note == "" || item.note == null ? null :
                <ChannelNote
                    id={item.id}
                    key={key}
                    note={item.note}
                    visible={self.props.openedId == item.id}
                    closeClick={self.props.closeClick}
                    />
            );
        });

        return <div>{items}</div>;
    }
}

export interface IChannelNote {
    note: string;
    id: string;
    visible: boolean;
    closeClick(id: string);
}

export class ChannelNote extends React.Component<IChannelNote, {}> {
    public static defaultProps: IChannelNote = {
        visible: false,
        id: "",
        note: "",
        closeClick: (id: string) => { console.log("ChannelNote closeClick"); }
    };

    close() {
        this.props.closeClick(this.props.id);
    }

    componentDidMount() {
        let before = this.refs["before"];

        let channelEl = $(before)
            .parents(".free-channels")
            .find(".free-channel[data-id='" + this.props.id + "']");

        var l = channelEl.position().left;
        var h = channelEl.height();

        $(before).css("left", l == 0 ? (h / 4) : l);
        $(before).css("margin-left", "0px");
    }

    render() {
        let style = {
            display: this.props.visible ? "block" : 'none'
        };

        return <div className="line-open" style={style}>
            <span className="before"
                ref="before"></span>
            <span className="close" onClick={this.close.bind(this)}></span>
            <p dangerouslySetInnerHTML={{ __html: this.props.note }}>
            </p>
        </div>;
    }
}