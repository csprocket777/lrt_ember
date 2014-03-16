export default function (evtName) {

    var options = arguments[arguments.length - 1],
        hash = options.hash,
        view = options.data.view,
        target;

    view = view.get('concreteView');

    if (hash.target) {
        target = Ember.Handlebars.get(this, hash.target, options);
    } else {
        target = view;
    }

    Ember.run.next(function () {
        target.trigger(evtName);
    });
}