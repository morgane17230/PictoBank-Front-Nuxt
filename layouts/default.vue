<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      class="d-flex flex-column justify-space-between"
      fixed
      app
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content v-if="$auth.loggedIn">
            <v-list-item-title class="text-h6">
              {{ $auth.user.username }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon v-if="$auth.loggedIn" @click.stop="drawer = !drawer" />
      <v-btn v-if="$auth.loggedIn" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>

      <v-toolbar-title hidden v-text="title" />
      <v-img
        lazy-src="/pikto.png"
        class="mt-9"
        max-height="100"
        max-width="200"
        src="/pikto.png"
      />

      <v-spacer />
      <v-btn v-if="$auth.loggedIn" color="cyan" icon @click="logout">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
      <v-btn v-else color="cyan" icon to="/login">
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="pb-10">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <v-bottom-navigation color="cyan" grow absolute>
        <v-btn value="contact" to="/contact">
          <span>
            Contact
          </span>

          <v-icon small>
            mdi-chat
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
            mdi-map-marker
          </v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      showSub: false,
      showForgot: false,
      clipped: false,
      drawer: false,
      fixed: false,
      dialog: false,
      show: false,
      valid: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-magnify',
          title: 'Chercher',
          to: '/search'
        },
        {
          icon: 'mdi-plus',
          title: 'Ajouter',
          to: '/add'
        },
        {
          icon: 'mdi-heart',
          title: 'Favoris',
          to: '/favorite'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Pikto'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    hide () {
      this.dialog = false
      this.showSub = false
      this.showForgot = false
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  }

}
</script>
