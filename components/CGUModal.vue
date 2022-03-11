<template>
  <v-dialog v-model="cguModal" max-width="500px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Conditions générales d'utilisation</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeCGUModal">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pt-5">
        Lorem ipsum dolor sit amet. Qui esse rerum qui modi omnis quo
        perspiciatis ipsam est velit possimus ex sunt itaque in corporis totam
        At accusamus impedit. Hic consequatur quia et similique atque qui
        dolores galisum sit necessitatibus omnis est aperiam ipsum non
        recusandae architecto. Et nulla similique aut mollitia provident et
        delectus similique vel voluptatibus quam cum saepe quaerat et mollitia
        inventore in quasi doloribus. Id veritatis veritatis a quia aperiam ut
        dolores numquam in quaerat dolor? Aut voluptas culpa sunt aspernatur aut
        corporis galisum aut sunt quia ad fuga officia. Id impedit omnis aut
        eaque dignissimos est illum rerum sed necessitatibus voluptas id
        doloribus velit ut quod quidem ut velit voluptate. Ut magni magni nam
        vero fugiat cum odit voluptate id unde accusamus a sint assumenda qui
        iusto commodi qui dicta inventore. Cum dolores cupiditate non labore
        nulla id galisum fugit ut consequuntur quam vel vitae molestiae. Qui
        sunt nulla qui illum unde eum dolore repellat sed similique nulla aut
        accusantium voluptas non consequuntur voluptatem? Qui aspernatur
        voluptatem eum veniam quasi est labore laboriosam sed aliquam possimus
        ad aliquam illo rem tempore deserunt. Et atque nulla non rerum
        blanditiis non iste perferendis et enim commodi qui galisum incidunt sit
        autem facilis. Et necessitatibus repellat ut odit neque id quia maxime
        ad ratione perferendis? Eum quibusdam tenetur eum illum saepe ab iusto
        eaque qui consequatur vero. Hic fuga aliquam non porro reprehenderit sed
        quae quis ut inventore voluptatem qui galisum sapiente. Ut velit quia et
        suscipit omnis a incidunt dolor aut Quis quibusdam est porro facilis.
        Sit minus quod in iure cumque ut dolores illum. In repellendus libero id
        sapiente aperiam cum voluptatem quasi ut veniam quisquam ut dolores
        quae! Et illo quae est fugiat dicta sit galisum necessitatibus et
        aspernatur sint sit dolorem rerum! Nam maiores quidem et consequatur
        saepe qui reiciendis maiores sit quam soluta eos dignissimos harum quo
        officia facilis aut omnis porro. Sed nostrum eveniet est doloremque
        excepturi ut impedit blanditiis. Et perspiciatis quasi cum voluptatem
        explicabo eum similique nemo eum enim quia qui aliquam alias. Nam
        necessitatibus rerum hic tempora sint et asperiores dolorem id nobis
        quaerat. Est quidem itaque est voluptas accusantium in accusamus
        numquam.
      </v-card-text>
      <v-card-actions>
        <v-btn color="cyan darken-3" end outlined @click="closeCGUModal">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { mdiClose } from '@mdi/js'
export default {
  data: () => ({
    svgClose: mdiClose
  }),
  computed: {
    ...mapState({
      cguModal: state => state.global.cguModal
    })
  },

  methods: {
    closeCGUModal () {
      this.$store.commit('global/SET_CGU_MODAL', false)
    }
  }
}
</script>
