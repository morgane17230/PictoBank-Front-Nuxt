<template>
  <v-footer :absolute="!fixed" app>
    <v-bottom-navigation color="cyan" grow absolute>
      <v-btn value="contact" to="/contact">
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

      <v-btn value="cgu" to="/cgu">
        <span>
          CGU
        </span>

        <v-icon small>
          mdi-handshake-outline
        </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>

<script>

export default {
  data () {
    return {
      fixed: false
    }
  }
}
</script>
