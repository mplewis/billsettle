import pluralize from 'shared/pluralize'

describe('pluralize', function () {
  it('pluralizes correctly', function () {
    expect(pluralize(0, 'widget')).to.eq('0 widgets')
    expect(pluralize(1, 'widget')).to.eq('1 widget')
    expect(pluralize(2, 'widget')).to.eq('2 widgets')
    expect(pluralize(5, 'widget')).to.eq('5 widgets')
  })
})
