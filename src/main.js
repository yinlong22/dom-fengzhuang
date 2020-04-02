const div3 = dom.create('<div id="parent"</div>');
dom.wrap(test, div3)

dom.style(test, 'border', '1px solid blue')

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')