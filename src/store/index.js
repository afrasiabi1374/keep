import { createStore } from 'vuex'
function updateLocalStorage (notes) {
  localStorage.setItem('notes', JSON.stringify(notes))
}
function updateTagsLocalStorage (tags) {
  localStorage.setItem('tags', JSON.stringify(tags))
}
export default createStore({
  state: {
    notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [],
    tags: localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : [],
    colors: [
      {
        colorLabel: 'white',
        colorVal: 'white'
      },
      {
        colorLabel: 'purple',
        colorVal: '#9b5de5'
      },
      {
        colorLabel: 'pink',
        colorVal: '#f15bb5'
      },
      {
        colorLabel: 'yellow',
        colorVal: '#fee440'
      },
      {
        colorLabel: 'blue',
        colorVal: '#00bbf9'
      },
      {
        colorLabel: 'cyan',
        colorVal: '#00f5d4'
      },
      {
        colorLabel: 'holo',
        colorVal: '#e75874'
      },
      {
        colorLabel: 'lightPink',
        colorVal: '#fbcbc9 '
      },
      {
        colorLabel: 'orange',
        colorVal: '#d2601a'
      },
      {
        colorLabel: 'flamingo',
        colorVal: '#ed3572'
      },
      {
        colorLabel: 'zeytooni',
        colorVal: '#829079'
      },
      {
        colorLabel: 'firooze2',
        colorVal: '#1fbfb8'
      }
    ]
  },
  mutations: {
    saveNote (state, note) {
      note.id
        ? state.notes.splice(state.notes.findIndex(n => n.id === note.id), 1, note)
        : state.notes.push(JSON.parse(JSON.stringify({ ...note, id: 1 + state.notes.length, archived: false })))
      updateLocalStorage(state.notes)
      console.log('notes in mutation', state.notes)
    },
    saveLabel (state, tag) {
      console.log('sended tag', tag)
      tag.id
        ? state.tags.splice(state.tags.findIndex(n => n.id === tag.id), 1, tag)
        : state.tags.push({ id: 1 + state.tags.length, ...tag })
      updateTagsLocalStorage(state.tags)
      console.log('all tags', state.tags)
    },
    addLabelOnTodo (state, todoIdAndtagId) {
      console.log(state.notes.find(n => n.id === todoIdAndtagId.todoId).tagsId.push(todoIdAndtagId.tagId))
      // state.notes[state.notes.findIndex(n => n.id === todoIdAndtagId.todoId)].tagsId.push(todoIdAndtagId.tagId)
      console.log('noteId : ' + todoIdAndtagId.todoId, 'id : ' + todoIdAndtagId.tagId)

      updateLocalStorage(state.notes)
    },
    deleteNote (state, note) {
      state.notes.splice(state.notes.findIndex(n => n.id === note.id), 1)
      updateLocalStorage(state.notes)
    },
    colorise (state, colorAndId) {
      console.log('object====>>>>>>>', colorAndId)
      state.notes[state.notes.findIndex(n => n.id === colorAndId.id)].color = colorAndId.color
      updateLocalStorage(state.notes)
    },
    deleteTag (state, tag) {
      state.notes.map(note => { note.tagsId.splice(note.tagsId.findIndex(() => tag.id), 1) })
      updateLocalStorage(state.notes)
      state.tags.splice(state.tags.findIndex(n => n.id === tag.id), 1)
      updateTagsLocalStorage(state.tags)
    },
    deleteTagFromTodo (state, todoIdAndtagId) {
      console.log('noteId : ' + todoIdAndtagId.todoId, 'id : ' + todoIdAndtagId.tagId)
      state.notes[state.notes.findIndex(n => n.id === todoIdAndtagId.todoId)].tagsId.splice(state.notes[state.notes.findIndex(n => n.id === todoIdAndtagId.todoId)].tagsId.findIndex(tagId => tagId === todoIdAndtagId.tagId), 1)
      updateLocalStorage(state.notes)
    },
    archiver (state, noteId) {
      console.log(state.notes.find(note => note.id === noteId).archived = !state.notes.find(note => note.id === noteId).archived)
      updateLocalStorage(state.notes)
    }
  },
  getters: {
    tagLabel: (state) => (tid) => {
      // console.log('ffffffffff');
      // return tid
      // return tid
      return '# ' + state.tags.find((t) => t.id === tid).name
    },
    allLabel: (state) => {
      // console.log('ffffffffff');
      // return tid
      // return tid
      return state.tags
    },
    notesByTag: (state) => (tagID) => {
      // console.log('dddddddddddd', parseInt(tagID);
      // tagID = parseInt(tagID)
      // console.log(state.notes.filter(note=>note.tagsId == tagID));
      // state.notes.filter(note => console.log(note.tagsId.includes(0+tagID)) )
      // console.log('ddddddddd', tagID, state.notes.filter(note => note.tagsId.includes(tagID) ));
      return state.notes.filter((note) => note.tagsId.includes(parseInt(tagID)))
    },
    showUnarchived: (state) => {
      return state.notes.filter((note) => note.archived === false)
    },
    archivedOrUnarchivedNotes:
      (state) => (archive, tagId = null) => {
        return state.notes.filter((note) => {
          return (
            note.archived === archive &&
            (tagId ? note.tagsId.includes(parseInt(tagId)) : true)
          )
        })
      },
    allNotes:
      (state) => {
        return state.notes
      }
  },
  actions: {}
})
