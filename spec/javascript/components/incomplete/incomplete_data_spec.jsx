import apolloProvider from 'core/apollo_provider'

import IncompleteData from 'components/incomplete/incomplete_data'
import IncompleteLayout from 'components/incomplete/incomplete_layout'

describe('IncompleteData', function () {
  subject(() => mount(IncompleteData, { apolloProvider }))
  def('layout', () => subject().first(IncompleteLayout))
  def('childProps', () => get('layout').vm.$props)

  it('passes data to the child', function (done) {
    subject()
    setImmediate(function () {
      expect(get('childProps').assignees.length).to.be.greaterThan(0)
      expect(get('childProps').lineItems.length).to.be.greaterThan(0)
      done()
    })
  })
})
