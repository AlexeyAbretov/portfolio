var RequestsGtmCounters = (function () {
    function isEmpty(obj) {
        return JSON.stringify(obj) === JSON.stringify({});
    }

    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    var events = {
        event_item_order_sent_success: 'event_item_order_sent_success',
        event_item_order_sent_double: 'event_item_order_sent_double',
        event_item_order_sent_fail: 'event_item_order_sent_fail',
        event_item_order_sent_server_error: 'event_item_order_sent_server_error',
        ga_event: 'GA_event',
        change: 'changeField'
    };

    var actions = {
        request: 'Заявка на информирование',
        newStreet: 'NewStreet',
        newHouse: 'NewHouse',
        newFlat: 'NewFlat',
        phone: 'Phone',
        name: 'Name'
    }

    var categories = {
        Conv: 'Конвергенция',
        Home: 'ШПД',
        ConvForm: 'КонвергенцияForm'
    }

    var clientTypes = {
        B2C: 'B2C'
    }

    var products = {
        Convorder: 'Convorder',
        Home: 'Home'
    };

    var types = {
        Home: 'Home User',
        New: 'New order'
    };

    var separators = {
        services: '|'
    };

    function add(options) {
        if (!dataLayer ||
            !dataLayer.push ||
            !options ||
            isEmpty(options)) {
            return;
        }

        if (!options.clientType) {
            options.clientType = clientTypes.B2C;
        }

        dataLayer.push({
            'event': options.event,
            'clientType': options.clientType,
            'ordered_itemProduct': options.product,
            'ordered_itemTitle': options.title,
            'ordered_itemSoc': options.soc,
            'ordered_Type': options.type,
            'ordered_addServices': typeof options.services === 'string' ?
                options.services :
                (Array.isArray(options.services) ?
                    (options.services || [])
                        .join(separators.services) :
                    '')
        });

        if (options.event === events.event_item_order_sent_success) {
            dataLayer.push({
                'event': events.ga_event,
                'eventAction': actions.request,
                'eventCategory': options.product === products.Convorder ?
                    categories.Conv :
                    categories.Home,
                'eventLabel': location.href
            });
        }
    }

    var addChange = function (event) {
        dataLayer.push({
            'event': events.ga_event,
            'eventAction': event,
            'eventCategory': categories.ConvForm,
            'eventLabel': events.change
        });
    }

    return {
        add: add,

        change: {
            add: addChange,

            addNewStreet: function() {
                addChange(event.newStreet)
            },

            addNewHouse: function() {
                addChange(event.newHouse)
            },

            addNewFlat: function() {
                addChange(event.newFlat)
            },

            addPhone: function() {
                addChange(event.phone)
            },

            addName: function() {
                addChange(event.name)
            }
        },

        home: {
            addSuccess: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_success;
                opt.clientType = clientTypes.Home;

                add(opt);
            },

            addFail: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_fail;
                opt.clientType = clientTypes.Home;

                add(opt);
            },

            addError: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_server_error;
                opt.clientType = clientTypes.Home;

                add(opt);
            },

            addDouble: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_double;
                opt.clientType = clientTypes.Home;

                add(opt);
            }
        },

        conv: {
            addSuccess: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_success;
                opt.clientType = clientTypes.Convorder;

                add(opt);
            },

            addFail: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_fail;
                opt.clientType = clientTypes.Convorder;

                add(opt);
            },

            addError: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_server_error;
                opt.clientType = clientTypes.Convorder;

                add(opt);
            },

            addDouble: function (options) {
                var opt = clone(options);
                opt.event = events.event_item_order_sent_double;
                opt.clientType = clientTypes.Convorder;

                add(opt);
            }
        },

        events: events,
        actions: actions,
        categories: categories,

        clientTypes: clientTypes,

        products: products,

        types: types,

        separators: separators
    }
})();