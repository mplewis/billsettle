import IncompleteTable from 'components/incomplete/incomplete_table'

const lineItems = [1, 2, 3].map(i => ({
  id: i,
  creator: {
    id: 1,
    email: 'matt@mplewis.com'
  },
  date: '2017-10-15T18:48:00.488Z',
  cents: 451,
  desc: 'Huckleberry Coffee Roasters',
  desc_orig: 'HUCKLEBERRY COFFEE',
  category: 'debit',
  account: 'Chase'
}))

describe('IncompleteTable', function () {
  subject(() =>
    mount(IncompleteTable, {
      propsData: {
        lineItems,
        stateChanged: get('stateChanged')
      }
    })
  )
  def('stateChanged', sinon.spy)

  it('renders line items', function () {
    expect(subject().text()).to.include('Huckleberry Coffee Roasters')
    expect(subject().text()).to.include('HUCKLEBERRY COFFEE')
    expect(subject().text()).to.include('$4.51')
    expect(subject().find('tbody tr').length).to.eq(3)
  })
})
