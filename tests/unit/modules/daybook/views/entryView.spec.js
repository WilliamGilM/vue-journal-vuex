import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import Swal from 'sweetalert2'

import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../mock-data/test-journal-state";
import EntryView from "@/modules/daybook/views/EntryView";
import { nextTick } from "vue";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  })

  // espia de api sweetalert2
  jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
  }))

describe("Pruebas en el EntryView", () => {
  const store = createVuexStore(journalState)
  // Se tiene el control absoluto del dispatch en las pruebas de jest
  store.dispatch = jest.fn()

  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    // limpiar los mocks
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: "-Nbrdj3H7vX-k9Dkp_Bd",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })
  })

  test("debe de sacar al usuario porque el id no existe", () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: "Este ID no existe en el store",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" })

  });

  test("debe de mostrar la entrada correctamente", () => {

    expect(wrapper.html()).toMatchSnapshot()
    expect(mockRouter.push).not.toHaveBeenCalled()

  })

  test('debe de borrar la entrada y salir', (done) => {

    Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true}) )

    wrapper.find('.btn-danger').trigger('click')

    expect( Swal.fire ).toHaveBeenCalledWith({
      title: '¿Está seguro?',
      text: 'Una vez borrado, no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro'
    })

 
    setTimeout(() => {

      expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-Nbrdj3H7vX-k9Dkp_Bd')
      expect( mockRouter.push ).toHaveBeenCalled()
      done()

    }, 1);

    /* Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }))
        await wrapper.find('.btn-danger').trigger('click')
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Estas seguro?',
            text: 'Se borrara y lo perderas para siempre, eso es mucho tiempo',
            showDenyButton: true,
            denyButtonText: 'No, aún no',
            icon: 'question',
            confirmButtonText: 'Sin miedo al éxito'
        })
        expect(mockRouter.push).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MhOjWw86ptCQT1oGvov') */
    
    
    
  })


})
