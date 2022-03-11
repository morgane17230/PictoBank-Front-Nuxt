<template>
  <v-footer fixed app>
    <v-bottom-navigation color="cyan darken-3" grow absolute>
      <v-btn value="contact" @click="openContactModal">
        <span>
          Contact
        </span>

        <v-icon small>
          {{ svgPhone }}
        </v-icon>
      </v-btn>

      <v-btn>
        <span>&copy;PictoBank - {{ new Date().getFullYear() }}</span>
      </v-btn>

      <v-btn value="cgu" @click="openCGUModal">
        <span>
          CGU
        </span>

        <v-icon small>
          {{ svgHandshake }}
        </v-icon>
      </v-btn>
    </v-bottom-navigation>
    <ContactModal />
    <CGUModal />
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
import { mdiPhoneOutline, mdiHandshakeOutline } from '@mdi/js'
export default {
  data () {
    return {
      svgPhone: mdiPhoneOutline,
      svgHandshake: mdiHandshakeOutline
    }
  },
  computed: {
    ...mapState({
      contactModal: state => state.global.contactModal,
      cguModal: state => state.global.cguModal
    })
  },

  methods: {
    openContactModal () {
      this.$store.commit('global/SET_CONTACT_MODAL', true)
    },

    openCGUModal () {
      this.$store.commit('global/SET_CGU_MODAL', true)
    }
  }

}
</script>
