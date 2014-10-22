var test = require('tape');
var createMixin = require('./.');


test('exposes interface', function(t) {
	t.plan(5);
	t.equals(typeof createMixin, 'function');

	var testContext = { woo: 'hoo' };
	var contextProp = 'yay';

	var mixin = createMixin(function() {
		return testContext;
	}, contextProp);

	// mock props and context properties as if we mixed it into a component
	mixin.props = {};
	mixin.context = {};

	t.equals(typeof mixin.getChildContext, 'function');
	t.equals(typeof mixin.getAppContext, 'function');
	t.equals(typeof mixin.cloneWithContext, 'function');

	t.equals(mixin.getAppContext(), testContext, 'context retrievable through getAppContext');
});

test('uses context provided in props when available', function(t) {
	t.plan(1);

	var newContext = { woo: 'hoo' };
	var propContext = { hell: 'yeah' };
	var contextProp = 'yay';

	var mixin = createMixin(function() {
		t.fail("No new mixin should be created");
		return newContext;
	}, contextProp);

	// mock props and context as if we were mixed into an component
	mixin.props = {};
	mixin.context = {};

	// passed through props

	mixin.props[contextProp] = propContext;

	t.equals(mixin.getAppContext(), propContext, 'no creating of a new context when context passed through props');
});

test('uses context inherited through component context when available', function(t) {
	t.plan(1);

	var newContext = { woo: 'hoo' };
	var existingContext = { hell: 'yeah' };
	var contextProp = 'yay';

	var mixin = createMixin(function() {
		t.fail("No new mixin should be created");
		return newContext;
	}, contextProp);

	// mock props and context as if we were mixed into an component
	mixin.props = {};
	mixin.context = {};

	// inherit through props
	mixin.context[contextProp] = existingContext;

	t.equals(mixin.getAppContext(), existingContext, 'no creating of a new context when context passed through props');
});

test("Uses a simple object when not defining a 'getNewAppContext' function and 'app' as prop by default", function(t) {
	t.plan(2);

	var mixin = createMixin();

	// mock props and context
	mixin.props = {};
	mixin.context = {};

	t.deepEquals(mixin.getAppContext(), {}, 'simple object used by default');
	t.equals(typeof mixin.getChildContext()['app'], 'object', "using 'app' prop by default");

});