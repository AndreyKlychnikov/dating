<template>
  <v-app>
    <div class="mx-auto">
      <h1>Matching</h1>
              <v-img class="my-4"
                :src="`http://localhost/static/${userProfile.avatar}`"
                max-height="600"
                max-width="600"
              ></v-img>
    <v-row :justify="'space-between'" class="my-2">
        <v-btn c @click="like" icon><v-icon color="red">mdi-heart</v-icon></v-btn>
        
        <v-btn @click="notlike" icon><v-icon color="black">mdi-close</v-icon></v-btn>
    </v-row>

    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile } from '@/store/main/getters';
import { dispatchUserLogOut } from '@/store/main/actions';

@Component
export default class Matching extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  public like(){
    console.log("like this");
  }
  public notlike(){
    console.log("not like");
  }
}
</script>
<style scoped>

</style>