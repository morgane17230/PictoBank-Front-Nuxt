const mutations = {
  SET_FOLDERS (state, payload) {
    if (payload) {
      state.folders = payload
    } else {
      state.folders = []
    }
  },

  ADD_FOLDER (state, payload) {
    state.folders = [...state.folders, payload]
  },

  DEL_FOLDER (state, payload) {
    const index = state.folders.findIndex(folder => folder.id === payload.id)
    if (index > -1) {
      state.folders.splice(index, 1)
    }
  },

  UPDATE_FOLDER (state, payload) {
    const index = state.folders.findIndex(folder => folder.id === payload.id)
    state.folder = payload
    if (index > -1) {
      state.folders.splice(index, 1, payload)
    }
  },

  SET_FOLDERNAME (state, payload) {
    state.foldername = payload
  },

  SET_FOLDER_ID (state, payload) {
    state.folderId = payload
  },

  SET_FOLDER (state, payload) {
    state.folder = payload
  },

  DEL_FROM_FOLDER (state, payload) {
    const index = state.folder.pictos.findIndex(picto => picto.id === payload.pictoId)
    state.folder.pictos.splice(index, 1)
  },

  SET_PHOTO (state, payload) {
    state.photo = payload

    if (payload !== null) {
      state.photo.url = URL.createObjectURL(payload)
    }
  }
}

export default mutations
