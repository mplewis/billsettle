import InboxTable from 'components/inbox/inbox_table'

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
  account: 'Chase',
  debt_owner: 'split'
}))

describe('InboxTable', function () {
  subject(() =>
    mount(InboxTable, {
      propsData: {
        lineItems,
        submitted: get('submitted')
      }
    })
  )
  def('submitted', sinon.spy)
  def('submitButton', () => subject().first('.submit'))
  def('approveButton', () => subject().first('tbody button'))

  it('renders line items', function () {
    expect(subject().text()).to.include('Apple Store Cherry Creek')
    expect(subject().text()).to.include('APPLE STORE CCK**')
    expect(subject().text()).to.include('$2,181.45')
    expect(subject().find('tbody tr').length).to.eq(3)
  })

  it('disables the submit button', function () {
    expect(get('submitButton').hasAttribute('disabled')).to.be.true
  })

  context('when submitting', function () {
    beforeEach(() => get('submitButton').trigger('click'))

    it('prevents submission', function () {
      expect(get('submitted')).to.not.have.been.called
    })
  })

  context('when assigning an item', function () {
    beforeEach(() => get('approveButton').trigger('click'))

    it('enables the submit button', function () {
      expect(get('submitButton').hasAttribute('disabled')).to.be.false
    })

    context('then unassigning that item', function () {
      beforeEach(() => get('approveButton').trigger('click'))

      it('disables the submit button', function () {
        expect(get('submitButton').hasAttribute('disabled')).to.be.true
      })
    })

    context('when submitting', function () {
      beforeEach(() => get('submitButton').trigger('click'))

      it('calls submitted', function () {
        expect(get('submitted')).to.be.calledWith({
          itemsToUpdate: { 11: 'approved' }
        })
      })
    })
  })
})
