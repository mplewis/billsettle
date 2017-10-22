import IncompleteLayout from 'components/incomplete/incomplete_layout'

describe('IncompleteLayout', function () {
  const lineItems = [{ id: 1 }, { id: 2 }]
  const assignees = [
    { id: 1, email: 'matt@mplewis.com' },
    { id: 2, email: 'anna@mplewis.com' }
  ]
  subject(() =>
    shallow(IncompleteLayout, {
      propsData: { lineItems, assignees, submitted: get('submitted') }
    })
  )
  def('submitted', sinon.spy)

  context('after receiving table item states', function () {
    beforeEach(function () {
      subject().vm.updateTableState({ id: 1 }, 'creator')
      subject().vm.updateTableState({ id: 2 }, 'assignee')
    })

    context('when submitting', function () {
      beforeEach(function () {
        subject().vm.handleSubmit({ id: 1, email: 'matt@mplewis.com' })
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
