var root = document.getElementById('root');

if (!root) {
    root = document.body;
}

addMessage(root, 'Testing start...');

if (!RequestsGtmCounters) {
    addMessage(root, 'RequestsGtmCounters module was not found!');
}

if (typeof dataLayer === 'undefined') {
    addMessage(root, 'dataLayer module was not found!');
}

RequestsGtmCounters.add();

dataLayer.length ?
    addFailMessage(root, 'RequestsGtmCounters.add() - not passed!') :
    addMessage(root, 'RequestsGtmCounters.add() - passed!');

RequestsGtmCounters.add({});

dataLayer.length ?
    addFailMessage(root, 'RequestsGtmCounters.add({}) - not passed!') :
    addMessage(root, 'RequestsGtmCounters.add({}) - passed!');

var emptyCounter = {
    'event': '',
    'clientType': 'B2C',
    'ordered_itemProduct': '',
    'ordered_itemTitle': '',
    'ordered_itemSoc': '',
    'ordered_Type': '',
    'ordered_addServices': ''
};

var empty = {
    'event': '',
    'clientType': '',
    'product': '',
    'title': '',
    'soc': '',
    'type': '',
    'services': ''
};

RequestsGtmCounters.add(empty);

dataLayer.length !== 1 ?
    addFailMessage(root, 'RequestsGtmCounters.add(empty) - not passed!') :
    addMessage(root, 'RequestsGtmCounters.add(empty) - passed!');

JSON.stringify(dataLayer[0]) !== JSON.stringify(emptyCounter) ?
    addFailMessage(
        root,
        'RequestsGtmCounters.add(empty) - check data - not passed! <br />' +
        JSON.stringify(dataLayer[0]) + '<br />' +
        JSON.stringify(emptyCounter)) :
    addMessage(root, 'RequestsGtmCounters.add(empty) - check data - passed!');

dataLayer.length = 0;

var full = {
    'event': RequestsGtmCounters.events.event_item_order_sent_success,
    'clientType': RequestsGtmCounters.clientTypes.B2C,
    'product': RequestsGtmCounters.products.Home,
    'title': 'title 1',
    'soc': 'soc 1',
    'type': RequestsGtmCounters.types.Home,
    'services': 'service1|service2'
};

var fullCounter = {
    'event': RequestsGtmCounters.events.event_item_order_sent_success,
    'clientType': RequestsGtmCounters.clientTypes.B2C,
    'ordered_itemProduct': RequestsGtmCounters.products.Home,
    'ordered_itemTitle': 'title 1',
    'ordered_itemSoc': 'soc 1',
    'ordered_Type': RequestsGtmCounters.types.Home,
    'ordered_addServices': 'service1|service2'
};

RequestsGtmCounters.add(full);

dataLayer.length !== 2 ?
    addFailMessage(root, 'RequestsGtmCounters.add(full) - not passed!') :
    addMessage(root, 'RequestsGtmCounters.add(full) - passed!');

JSON.stringify(dataLayer[0]) !== JSON.stringify(fullCounter) ?
    addFailMessage(
        root,
        'RequestsGtmCounters.add(full) - check data - not passed! <br />' +
        JSON.stringify(dataLayer[0]) + '<br />' +
        JSON.stringify(fullCounter)) :
    addMessage(root, 'RequestsGtmCounters.add(full) - check data - passed!');

dataLayer.length = 0;

var full_ServicesArray = {
    'event': RequestsGtmCounters.events.event_item_order_sent_success,
    'clientType': RequestsGtmCounters.clientTypes.B2C,
    'product': RequestsGtmCounters.products.Home,
    'title': 'title 1',
    'soc': 'soc 1',
    'type': RequestsGtmCounters.types.Home,
    'services': ['service1', 'service2']
};

RequestsGtmCounters.add(full_ServicesArray);

dataLayer.length !== 2 ?
    addFailMessage(root, 'RequestsGtmCounters.add(full_ServicesArray) - not passed!') :
    addMessage(root, 'RequestsGtmCounters.add(full_ServicesArray) - passed!');

JSON.stringify(dataLayer[0]) !== JSON.stringify(fullCounter) ?
    addFailMessage(
        root,
        'RequestsGtmCounters.add(full_ServicesArray) - check data - not passed! <br />' +
        JSON.stringify(dataLayer[0]) + '<br />' +
        JSON.stringify(fullCounter)) :
    addMessage(root, 'RequestsGtmCounters.add(full_ServicesArray) - check data - passed!');

dataLayer.length = 0;

RequestsGtmCounters.home.addSuccess(full_ServicesArray);

addMessage(root, 'Testing end!');

function addMessage(el, message) {
    var msg = document.createElement("div");
    msg.innerHTML = message;

    el.appendChild(msg);
}

function addFailMessage(el, message) {
    var msg = document.createElement("div");
    msg.style.color = 'red';
    msg.innerHTML = message;

    el.appendChild(msg);
}