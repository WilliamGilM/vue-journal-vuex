import { shallowMount } from "@vue/test-utils"
import Fab from '@/modules/daybook/components/Fab'

describe('Pruebas en el FAB component', () => {

  test('debe de mostrar el ícono por defecto', ()=> {
    // fa-plus
    const wrapper = shallowMount(Fab)
    const itag = wrapper.find('i')

    // otro metodo
    // expect(itag.classes().at(2)).toBe('fa-plus2')
    expect(itag.classes('fa-plus')).toBeTruthy()
  })

  test('debe de mostrar el ícono por argumento: fa-circle', () => {
    // fa-circle
    const wrapper = shallowMount(Fab, {
      props:{
        icon: 'fa-circle'
      }
    })

    const itag = wrapper.find('i')

    expect(itag.classes('fa-circle')).toBeTruthy()
  })

  test('debe de emitir el evento on:click cuando se hace click', () => {
     const wrapper = shallowMount(Fab)

     wrapper.find('button').trigger('click')

    // este metodo funciona con el async await
     /* wrapper.vm.$emit('on:click')

     await wrapper.vm.$nextTick()

     expect(wrapper.emitted('on:click')).toBeTruthy() */

     expect(wrapper.emitted('on:click')).toHaveLength(1)
  })
})