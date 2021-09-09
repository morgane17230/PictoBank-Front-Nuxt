<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1 class="display-2">
          Favoris
        </h1>
      </v-col>
    </v-row>

    <v-spacer />

    <v-row>
      <v-col>
        <v-container
          fluid
        >
          <v-row
            dense
          >
            <v-col

              class="d-flex child-flex d-flex child-flex col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-2"
            >
              <v-card
                class="d-flex flex-column justify-space-between"
              >
                <v-card-actions
                  class="d-flex justify-center"
                >
                  <v-btn
                    icon
                    class="d-flex"
                    width="200"
                    height="200"
                    @click="dialog = true"
                  >
                    <v-icon
                      color="cyan"
                      size="150"
                    >
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-title class="d-flex justify-center">
                  Ajouter un dossier
                </v-card-title>
              </v-card>
            </v-col>
            <v-col
              v-for="card in cards"
              :key="card.title"
              class="d-flex child-flex d-flex child-flex col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-2"
            >
              <v-card>
                <v-card-actions>
                  <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  />
                </v-card-actions>

                <v-card-title v-text="card.title" />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-form v-model="valid">
          <v-card-title>
            Créer un nouveau dossier
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Nom du dossier"
              item-value="text"
              color="cyan"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="cyan"
              text
            >
              Valider
            </v-btn>
            <v-btn
              color="cyan"
              text
              @click="dialog = false"
            >
              Annuler
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    dialog: false,
    valid: false,
    cards: [
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Allan'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Vincent'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Chloé'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Morgane'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Eva'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jacques'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Joseph'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Marie'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Lucienne'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Catherine'
      }
    ]
  })
}
</script>
