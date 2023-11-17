import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'
import authApi from '@/api/authApi'

const createVuexStore = ( initialState ) => 
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState }
      }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {

  beforeAll( async() => {

    const { data } = await authApi.post(':signInWithPassword', {
      email: 'test@test.com',
      password: '123456',
      returnSecureToken: true
    })

    localStorage.setItem('idToken', data.idToken)
    
  })

  // Basicas
  test('este es el estado inicial, debe de tener este state', () => {

    const store = createVuexStore( journalState )
    const { isLoading, entries } = store.state.journal

    expect( isLoading ).toBeFalsy()
    expect( entries ).toEqual( journalState.entries )
  
  })

  // Mutations =======
  test('mutation: setEntries', () => {

    const store = createVuexStore({ isLoading: true, entries: [] })

    store.commit('journal/setEntries', journalState.entries)
    expect( store.state.journal.entries.length ).toBe(2)

    store.commit('journal/setEntries', journalState.entries)
    expect( store.state.journal.entries.length ).toBe(4)


    expect( store.state.journal.isLoading ).toBeFalsy()
  })

  test('mutation: updateEntry', () => {
    // create store con entries
    const store = createVuexStore( journalState )
    
    // updateEntry
    const updateEntry = {
      id: '-NbrNy24TmSV3ErKLm8F',
      date: 1692072655575,
      text: 'Hola mundo desde pruebas'
    }

    // commit de la mutation
    store.commit('journal/updateEntry', updateEntry)
    const stateEntries = store.state.journal.entries
    // Expects
    // entries.length = 2
    expect( stateEntries.length ).toBe(2)
    // entries tiene que existir el updateEntry toEqual
    expect( stateEntries.find( e => e.id === updateEntry.id ) ).toEqual(updateEntry)

  })

  test('mutation: addEntry y deleteEntry', () => {

    // crear Store
    const store = createVuexStore( journalState )

    // addEntry { id: 'ABC-123', text: 'Hola Mundo' }
    const addEntry = {
      id: 'ABC-123',
      text: 'Hola Mundo'
    }

    store.commit('journal/addEntry', addEntry)

    const stateEntries = store.state.journal.entries
    // Expects
    // entradas sean 3
    expect( stateEntries.length ).toBe(3)

    // entrtada con el id ABC-123 exista
    expect( stateEntries.find( e => e.id === 'ABC-123' ).id ).toBe('ABC-123')


    // deleteEntry, 'ABC-123'
    store.commit('journal/deleteEntry', 'ABC-123')

    // Expects
    // entrada debe ser 2
    expect( store.state.journal.entries.length ).toBe(2)

    // entrada con el id ABC-123 no debe existir
    expect( store.state.journal.entries.find( e => e.id === 'ABC-123' ) ).toBeFalsy()

  })

  // Getters ========
  test('getters: getEntriesByTerm y getEntryById', () => {

    const store = createVuexStore( journalState )

    const [ entry1, entry2 ] = journalState.entries

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
    expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)

    expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([entry2])

    expect(store.getters['journal/getEntryById']('-NbrNy24TmSV3ErKLm8F')).toEqual(entry1)

  })

  // Actions =======
  test('actions: loadEntries', async() => {

    const store = createVuexStore({ isLoading: true, entries: [] })

    await store.dispatch('journal/loadEntries')

    expect( store.state.journal.entries.length ).toBe(2)

  })

  test('actions: updateEntry', async() => {

    const store = createVuexStore( journalState )

    const updateEntry = {
      id: '-NbrNy24TmSV3ErKLm8F',
      date: 1692072655575,
      text: 'Hola mundo desde mock data',
      otroCampo: true,
      otroMas: { a: 1}
    }

    await store.dispatch('journal/updateEntry', updateEntry)

    expect( store.state.journal.entries.length ).toBe(2)
    expect( store.state.journal.entries.find( e => e.id === updateEntry.id) 
    ).toEqual({
      id: '-NbrNy24TmSV3ErKLm8F',
      date: 1692072655575,
      text: 'Hola mundo desde mock data'
    })

  })

  test('actions: createEntry y deleteEntry', async() => {

    // createStore
    const store = createVuexStore( journalState )

    // newEntry = { date: 1692072655575, text: 'Nueva entrada desde las pruebas' }
    const newEntry = {
      date: 1692072655575, 
      text: 'Nueva entrada desde las pruebas'
    }

    // dispatch de la acción createEntry
    const id = await store.dispatch('journal/createEntry', newEntry)

    // obtener el id de la nueva entrada de firebase
    console.log(id)

    // el ID debe ser un string
    expect(typeof id).toEqual('string')

    // la nueva entrada debe de existir en el state.journal.entries....
    expect(store.state.journal.entries.find( e => e.id === id)
    ).toBeTruthy()

    // # Segunda parte

    // dispatch deleteEntry
    await store.dispatch('journal/deleteEntry', id)

    // la nueva entrada NO debe de existir en el state.journal.entries....
    expect(store.state.journal.entries.find( e => e.id === id)
    ).toBeFalsy()

  })

})