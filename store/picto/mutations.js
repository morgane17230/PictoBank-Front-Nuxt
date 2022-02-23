const mutations = {
  SET_PICTOS (state, payload) {
    if (payload) {
      state.pictos = payload
    } else {
      state.pictos = []
    }
  },

  SET_PICTO_ID (state, payload) {
    state.pictoId = payload
  },

  SET_COLLECTED_PICTOS_HOME (state, payload) {
    state.collectedPictosHome = [...payload]
  },

  SET_COLLECTED_PICTOS_FOLDER (state, payload) {
    state.collectedPictosFolder = [...payload]
  },

  SET_CATEGORY_NAME (state, payload) {
    state.categoryName = payload
  },

  SET_CATEGORY_COLOR (state, payload) {
    state.categoryColor = payload
  },

  SET_CATEGORY_ID (state, payload) {
    state.categoryId = payload
  },

  ADD_PICTOS (state, payload) {
    state.pictos = [...state.pictos, payload]
  },

  DEL_PICTO (state, payload) {
    const index = state.pictos.findIndex(picto => picto.id === payload.id)
    if (index > -1) {
      state.pictos.splice(index, 1)
    }
  },

  DEL_PICTOS (state, payload) {
    payload.forEach((deletedPicto) => {
      const index = state.pictos.findIndex(picto => picto.id === deletedPicto.id)
      if (index > -1) {
        state.pictos.splice(index, 1)
      }
    })
  },

  INITIALIZE_UPLOADED_FILES (state) {
    state.uploadedFiles = []
  },

  SET_UPLOADED_FILES (state, payload) {
    state.selectedFile = payload
    state.selectedFile.url = URL.createObjectURL(payload)
    state.selectedFile.category_id = state.categoryId
    state.selectedFile.category_name = state.categoryName
    state.selectedFile.category_color = state.categoryColor
    state.uploadedFiles.push(payload)
  },

  ON_DROP_UPLOADED_FILES (state, payload) {
    payload.forEach((element) => {
      element.category_id = state.categoryId
      element.category_name = state.categoryName
      element.category_color = state.categoryColor
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
