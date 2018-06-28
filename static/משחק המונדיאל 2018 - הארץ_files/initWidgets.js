// code for "all" cases
var widgetsPromise = [];
var widgets = interactive.widgets;
for(var widgetName in widgets) {
    var widgetData = widgets[widgetName];
    var widgetFactory = new widgetData.constructor(widgetName);
    if (!!widgetFactory.create) {
        var widgetPromise = widgetFactory.create(widgetData).then(addToWidgetsObj, errorMessage);
        widgetsPromise.push(widgetPromise);
    }
}

function addToWidgetsObj(widget) {
    widgets[widget.getName()].component = widget;
}

function errorMessage(widget) {
    console.log("error"); // example
}

// code for "normal" articles
if(!interactive.articleMeta) { // only interactive article have this property
    Promise.all(widgetsPromise).then(function() {
        for(var widgetName in widgets) {
            appendWidget(widgets[widgetName]);
        }
    });

    function appendWidget(widgetData) {
        var elementBefore = document.querySelector(widgetData.class);
        elementBefore.parentNode.insertBefore(widgetData.component.getElement(), elementBefore);
    }
}
