<!-- <template>
   <div>
      <h1>New word</h1>
      <form action="" @submit.prevent="onSubmit">
         <div class="ui labeled input fuild">
            <div class="ui label">
               <i class="united kingdom flag"></i>English
            </div>
            <input type="text" required v-model="word.english" />
         </div>
         <br /><br />
         <div class="ui labeled input fuild">
            <div class="ui label">
               <i class="germany flag"></i>German
            </div>
            <input type="text" required v-model="word.german" />
         </div>
         <br /><br />
         <div>
            <button class="ui primary button">Add</button>
         </div>
      </form>
   </div>
</template>
   
<script>
import { AddNewVocab } from '../helpers/api';

export default {
   name: "New",
   data() {
      return {
         word: {},
      };
   },
   methods: {
      onSubmit: async function() {
         //add new vocab
         await AddNewVocab(this.word);
         //display succeed message using vue-flash
         this.flash("Word added successfully");
         //redirect to word list using $router
         this.$router.push(`/words`);
      }
   }
};
</script> -->