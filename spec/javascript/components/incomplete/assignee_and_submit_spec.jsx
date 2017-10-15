import AssigneeAndSubmit from 'components/incomplete/assignee_and_submit'

describe('AssigneeAndSubmit', function () {
  subject(() => {
    return mount(AssigneeAndSubmit, {
      propsData: {
        assignees: get('assignees'),
        itemCount: get('itemCount'),
        submitted: get('submitted')
      }
    })
  })
  def('assignees', () => [
    { id: 1, email: 'celaena@terrasen.org' },
    { id: 2, email: 'chaol@adarlan.gov' }
  ])
  def('submitted', sinon.spy)
  def('button', () => subject().first('button'))
  def('dropdown', () => subject().first('select'))

  context('with no items selected', function () {
    def('itemCount', () => 0)

    it('disables the button', function () {
      expect(get('button').hasAttribute('disabled')).to.be.true
    })
    it('highlights the dropdown', function () {
      expect(get('dropdown').hasClass('is-invalid')).to.be.true
    })

    context('after selecting an assignee', function () {
      beforeEach(function () {
        subject().setData({ assignee: get('assignees')[0] })
      })

      it('disables the button', function () {
        expect(get('button').hasAttribute('disabled')).to.be.true
      })
      it('does not highlight the dropdown', function () {
        expect(get('dropdown').hasClass('is-invalid')).to.be.false
      })
      it('shows the proper text', function () {
        expect(get('button').text()).to.include('Select some items')
      })

      context('after selecting an item', function () {
        def('itemCount', () => 1)

        it('enables the button', function () {
          expect(get('button').hasAttribute('disabled')).to.be.false
        })
        it('shows the proper text', function () {
          expect(get('button').text()).to.include('Submit 1 item')
        })

        context('when submitting', function () {
          beforeEach(function () {
            get('button').trigger('click')
          })

          it('passes the full assignee back', function () {
            expect(get('submitted')).to.have.been.calledWith(
              get('assignees')[0]
            )
          })
        })
      })

      context('after selecting multiple items', function () {
        def('itemCount', () => 4)

        it('shows the proper text', function () {
          expect(get('button').text()).to.include('Submit 4 items')
        })
      })
    })
  })
})
