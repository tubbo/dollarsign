QUnit.test('$', function(assert) {
  assert.ok($);
  assert.ok($('#test'));
  assert.ok($('.test'));
});

QUnit.test('NQuery#elements', function(assert) {
  assert.equal(1, $('#test').elements.length);
});

QUnit.test('NQuery#length', function(assert) {
  assert.equal(2, $('.test').length);
});

QUnit.test('NQuery#map', function(assert) {
  var elements = $('.test').map(function (element) { return element.id; });
  assert.equal(['test', 'test2'], elements);
});

QUnit.test('NQuery#each', function(assert) {
  var elements = [];
  assert.ok($('.test').each(function(element) { elements.push(element); }));
  assert.equal(2, elements.length);
});

QUnit.test('NQuery#on', function(assert) {
  var handler = function(event) { $(event.currentTarget).attr('data-foo', 'bar'); },
      element = $('.test');

  element.on('click', handler);
  assert.equal(handler, element.events.click);
});

QUnit.test('NQuery#off', function(assert) {
  var element = $('.test');
  element.off('click');
  assert.equal(undefined, element.events.click);
});

QUnit.test('NQuery#fire', function(assert) {
  assert.ok($('.test').fire('click'));
});

QUnit.test('NQuery#css', function(assert) {
  assert.ok($('.test').css('color', '#ff0000'));
  assert.equal('#ff0000', $('.test').css('color'));
});

QUnit.test('NQuery#attr', function(assert) {
  assert.ok($('.test').attr('data-foo', 'bar'));
  assert.equal('bar', $('.test').attr('data-foo'));
});

QUnit.test('NQuery#find', function(assert) {
  assert.equal($('#parent'), $('.test').closest('#parent'));
});

QUnit.test('NQuery#closest', function(assert) {
  assert.equal($('#child'), $('.test').closest('#child'));
});

QUnit.test('NQuery#hasClass', function(assert) {
  assert.ok($('.test').hasClass('test'));
  assert.notOk($('.test').hasClass('foo'));
});

QUnit.test('NQuery#addClass', function(assert) {
  assert.ok($('.test').addClass('bar'));
  assert.ok($('.test').hasClass('bar'));
});

QUnit.test('NQuery#removeClass', function(assert) {
  assert.ok($('.test').addClass('bar'));
  assert.ok($('.test').removeClass('bar'));
  assert.notOk($('.test').hasClass('bar'));
});
