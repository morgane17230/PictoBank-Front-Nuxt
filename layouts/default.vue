<template>
  <v-app
    dark
  >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      class="d-flex flex-column justify-space-between"
      fixed
      app
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Sandra Adams
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list
        nav
      >
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
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title router to="/" v-text="title" />
      <v-spacer />
      <v-btn
        color="cyan"
        icon
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-bottom-navigation
        color="cyan"
        grow
        absolute
      >
        <v-btn
          value="contact"
          to="/contact"
        >
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

        <v-btn
          value="cgu"
          to="/cgu"
        >
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
export default {
  data: () => ({
    clipped: false,
    drawer: false,
    fixed: false,
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
    title: 'PictoBank'
  })
}
</script>
