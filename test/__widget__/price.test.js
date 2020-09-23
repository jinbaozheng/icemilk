const {JWidgetPrice: Price} = require('../../dist/index');


test('adds 0.1 + 0.2 to equal 0.3', () => {
    const price = new Price(0.1);
    expect(price.add(0.2).value).toBe(0.3);
});


test('thousand format price', () => {
    const price = new Price(1000000000.1);
    expect(price.format()).toBe(`1000000000.1`);
    expect(new Price(1000000000.1).format('clear', 'thousand')).toBe(`1,000,000,000.1`);
    expect(new Price(100000000.1).format('clear', 'thousand')).toBe(`100,000,000.1`);
    expect(new Price(10000000.1).format('clear', 'thousand')).toBe(`10,000,000.1`);
    expect(new Price(1000.1).format('clear', 'thousand')).toBe(`1,000.1`);
    expect(new Price(100.1).format('clear', 'thousand')).toBe(`100.1`);
    expect(new Price(10.1).format('clear', 'thousand')).toBe(`10.1`);
    expect(new Price(0.1).format('clear', 'thousand')).toBe(`0.1`);
    expect(new Price(0.1).format('cents', 'thousand')).toBe(`0.10`);
});



