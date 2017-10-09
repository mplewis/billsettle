import 'shared/vue'
import { mount } from 'avoriaz'
import ButtonSelect from 'components/button_select'

describe('ButtonSelect', function () {
  subject(() =>
    mount(ButtonSelect, {
      propsData: {
        stateChanged: get.stateChanged,
        buttons: [
          { value: 'hello', name: 'Hello!', color: 'success' },
          { value: 'goodbye', name: 'Goodbye.', color: 'danger' }
        ]
      }
    })
  )
  function buttonByText (text) {
    return subject()
      .find('button')
      .filter(button => button.text().includes(text))[0]
  }
  def('stateChanged', sinon.spy)
  def('hello', () => buttonByText('Hello!'))
  def('goodbye', () => buttonByText('Goodbye.'))

  it('maintains state and fires callbacks', function () {
    get.hello.trigger('click')
    get.goodbye.trigger('click')
    get.hello.trigger('click')
    get.hello.trigger('click')
    expect(get.stateChanged.args).to.eql([
      ['hello'],
      ['goodbye'],
      ['hello'],
      [null]
    ])
  })
})
