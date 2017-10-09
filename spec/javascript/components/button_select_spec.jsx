import 'shared/vue'
import { mount } from 'avoriaz'
import ButtonSelect from 'components/button_select'

describe('ButtonSelect', function () {
  it('works', function () {
    const comp = mount(ButtonSelect, {
      propsData: {
        stateChanged: console.log,
        buttons: [
          { value: 'hello', name: 'Hello!', color: 'success' },
          { value: 'goodbye', name: 'Goodbye.', color: 'danger' }
        ]
      }
    })
    console.log(comp.html())
    console.log(comp.first('button').html())
    expect(comp).to.exist
  })
})
