const mutations = {
  SET_PICTOS (state, payload) {
    if (payload) {
      state.pictos = payload
    } else {
      state.pictos = []
    }
  },

  SET_FOUND_PICTOS (state, payload) {
    if (payload) {
      state.foundPictos = payload
    } else {
      state.pictos = []
    }
  },

  SET_PICTO (state, payload) {
    state.picto = payload
    if (state.picto === null) {
      this.commit('global/SET_ZOOM_MODAL', false, { root: true })
    } else {
      this.commit('global/SET_ZOOM_MODAL', true, { root: true })
    }
  },

  SET_PICTO_ID (state, payload) {
    state.pictoId = payload
  },

  SET_PICTO_NAME (state, payload) {
    state.name = payload
  },

  SET_SELECTED_FILE (state, payload) {
    state.selectedFile = payload
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
    state.foundPictos = [...state.foundPictos, payload]
  },

  DEL_PICTO (state, payload) {
    const index = state.pictos.findIndex(picto => picto.id === payload.id)
    if (index > -1) {
      state.pictos.splice(index, 1)
      state.foundPictos.splice(index, 1)
    }
  },

  DEL_PICTOS (state, payload) {
    payload.forEach((deletedPicto) => {
      const index = state.pictos.findIndex(
        picto => picto.id === deletedPicto.id
      )
      if (index > -1) {
        state.pictos.splice(index, 1)
        state.foundPictos.splice(index, 1)
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
    state.selectedFile.originalname = `${state.categoryName}-${state.name}`
    state.selectedFile.category_color = state.categoryColor
    state.uploadedFiles.push(payload)
    state.categoryId = null
    state.name = ''
    state.selectedFile = null
  },

  DEL_UPLOADED_FILES (state, payload) {
    const index = state.uploadedFiles.findIndex(file => file.name === payload)
    if (index > -1) {
      state.uploadedFiles.splice(index, 1)
    }
  }
}
export default mutations
