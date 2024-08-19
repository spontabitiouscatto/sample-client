<!-- <template>
   <div>
      <table class="ui celled table">
         <thead>
            <tr>
               <th colspan="5" class="center aligned">WORD LIST</th>
            </tr>
            <tr>
               <th class="center aligned">English</th>
               <th class="center aligned">German</th>
               <th colspan="3" class="center aligned">Menu</th>
            </tr>
         </thead>
         <tbody>
               <tr v-for="(word, i) in words" :key="i">
               <td>{{ word.english }}</td>
               <td>{{ word.german }}</td>
               <td class="center aligned">
                  <router-link class="ui button green" :to="{name: 'Show', params: {id: word._id}}">
                     Show
                  </router-link>
               </td>
               <td class="center aligned">
                  <router-link class="ui button yellow" :to="{name: 'Edit', params: {id: word._id}}">
                     Edit
                  </router-link>
               </td>
               <td class="center aligned">
                  <a class="ui button red" @click.prevent="onDelete(word._id)">
                     Delete
                  </a>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
import { ViewAllVocabs, DeleteVocab } from '../helpers/api'

export default {
   name: 'Words',
   data() {
      return {
         words: []
      }
   },
   async mounted() {
      this.words = await ViewAllVocabs()
   },
   methods: {
      async onDelete(id) {
         //display confirm message
         const deleteConfirm = window.confirm(
            "Are you sure to delete this word?"
         )
         if (deleteConfirm) {
            //delete words
            await DeleteVocab(id);
            //refresh the word list
            const updatedWords = this.words.filter((word) => word._id !== id);
            this.words = updatedWords;
            this.flash("Word Deleted successfully")
         }
      }
   }
}
</script> -->