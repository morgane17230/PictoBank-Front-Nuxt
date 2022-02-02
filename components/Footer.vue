<template>
  <v-footer absolute fixed padless app>
    <v-bottom-navigation color="cyan" grow absolute>
      <v-btn value="contact" @click="openContactModal">
        <span>
          Contact
        </span>

        <v-icon small>
          mdi-phone-outline
        </v-icon>
      </v-btn>

      <v-btn>
        <span>PictoBank - {{ new Date().getFullYear() }}</span>

        <v-icon small>
          mdi-copyright
        </v-icon>
      </v-btn>

      <v-btn value="cgu" @click="openCGUModal">
        <span>
          CGU
        </span>

        <v-icon small>
          mdi-handshake-outline
        </v-icon>
      </v-btn>
    </v-bottom-navigation>
    <ContactModal />
    <CGUModal />
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
