const mutations = {
  SET_PICTOS (state, payload) {
    state.pictos = payload
  },

  ADD_PICTOS (state, payload) {
    state.pictos = [...state.pictos, payload]
  },

  DEL_PICTOS (state, payload) {
    const index = state.pictos.findIndex(picto => picto.id === payload.id)
    if (index > -1) {
      state.pictos.splice(index, 1)
    }
  },

  SET_ERROR (state, payload) {
    state.error = payload
  },

  SET_UPLOADED_FILES (state, payload) {
    state.selectedFile = payload
    state.selectedFile.url = URL.createObjectURL(payload)
    state.uploadedFiles.push(payload)
  },

  ON_DROP_UPLOADED_FILES (state, payload) {
    payload.forEach((element) => {
      element.url = URL.createObjectURL(element)
      state.uploadedFiles = [...state.uploadedFiles, element]
    })
  },

  DEL_UPLOADED_FILES (state, payload) {
    const index = state.uploadedFiles.findIndex(file => file.name === payload)
    if (index > -1) {
      state.uploadedFiles.splice(index, 1)
    }
  }
}
export default mutations
