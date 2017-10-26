import apolloProvider from '../../scaffold/mock_apollo_provider'

import InboxData from 'components/inbox/inbox_data'
import InboxTable from 'components/inbox/inbox_table'

describe('InboxData', function () {
  subject(() => mount(InboxData, { apolloProvider }))
  def('layout', () => subject().first(InboxTable))
  def('childProps', () => get('layout').vm.$props)

  it('passes data to the child', function (done) {
    subject()
    setImmediate(function () {
      expect(get('childProps').lineItems.length).to.be.greaterThan(0)
      done()
    })
  })
})
