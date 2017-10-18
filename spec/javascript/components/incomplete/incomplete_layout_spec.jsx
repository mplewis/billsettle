import IncompleteLayout from 'components/incomplete/incomplete_layout'

describe('IncompleteLayout', function () {
  const lineItems = ['item 1', 'item 2']
  const assignees = ['assignee 1', 'assignee 2']
  subject(() =>
    shallow(IncompleteLayout, {
      propsData: { lineItems, assignees, submitted: get('submitted') }
    })
  )
  def('submitted', sinon.spy)

  it('shows the invalid state and forbids submission', function () {
    expect(subject().vm.valid()).to.be.false
    subject().vm.handleSubmit()
    expect(get('submitted')).to.not.be.called
  })

  context('after receiving table item states', function () {
    beforeEach(function () {
      subject().vm.updateTableState(1, 'creator')
      subject().vm.updateTableState(2, 'assignee')
    })

    it('shows the invalid state and forbids submission', function () {
      expect(subject().vm.valid()).to.be.false
      subject().vm.handleSubmit()
      expect(get('submitted')).to.not.be.called
    })

    context('after receiving assignee', function () {
      beforeEach(function () {
        subject().vm.assignee = { id: 1, email: 'matt@mplewis.com' }
      })

      it('shows the valid state', function () {
        expect(subject().vm.valid()).to.be.true
      })

      context('when submitting', function () {
        beforeEach(function () {
          subject().vm.handleSubmit()
        })

        it('passes its data to the parent', function () {
          expect(get('submitted')).to.be.calledWith({
            itemsToUpdate: { 1: 'creator', 2: 'assignee' },
            assignee: { id: 1, email: 'matt@mplewis.com' }
          })
        })
      })
    })
  })
})
