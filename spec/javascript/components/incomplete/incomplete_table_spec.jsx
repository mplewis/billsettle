import IncompleteTable from 'components/incomplete/incomplete_table'

const lineItems = [11, 12, 13].map(i => ({
  id: i,
  creator: {
    id: 1,
    email: 'matt@mplewis.com'
  },
  date: '2017-10-15T18:48:00.488Z',
  cents: 218145,
  desc: 'Apple Store Cherry Creek',
  desc_orig: 'APPLE STORE CCK**',
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
  def('assignDebtToMe', () => subject().first('button'))
  def('stateChanged', sinon.spy)

  it('renders line items', function () {
    expect(subject().text()).to.include('Apple Store Cherry Creek')
    expect(subject().text()).to.include('APPLE STORE CCK**')
    expect(subject().text()).to.include('$2,181.45')
    expect(subject().find('tbody tr').length).to.eq(3)
  })

  context('when clicking a button', function () {
    beforeEach(() => get('assignDebtToMe').trigger('click'))

    it('calls stateChanged', function () {
      expect(get('stateChanged')).to.be.calledWith(lineItems[0], 'creator')
    })
  })
})
