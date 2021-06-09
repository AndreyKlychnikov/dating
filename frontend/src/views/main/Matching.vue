<template>
  <v-app>
    <div class="mx-auto">
              <v-img class="my-4"
                :src="`http://localhost/static/${userProfile.avatar}`"
                max-height="500"
                max-width="500"
              ></v-img>
              <h2>{{userProfile.description}}</h2>
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
import { readUserProfile,readUserProfileNotShown } from '@/store/main/getters';
import { ISendSympathy } from '@/interface';
import { dispatchUserLogOut, dispatchGetUserProfileNotShown, dispatchSympathy } from '@/store/main/actions';


@Component
export default class Matching extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  get userProfileNotShown() {
    return readUserProfileNotShown(this.$store);
  }
  public like(){
    const user: ISendSympathy = {
      receiver_id: this.userProfileNotShown.id
    }
    dispatchSympathy(this.$store,user);
    dispatchGetUserProfileNotShown(this.$store);
  }
  public notlike(){
    dispatchGetUserProfileNotShown(this.$store);
  }
  mounted(){
    dispatchGetUserProfileNotShown(this.$store);
    console.log("s");
  }
}
</script>
<style scoped>

</style>