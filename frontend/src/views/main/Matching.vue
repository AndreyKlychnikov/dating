<template>
  <v-app>
    <div class="mx-auto">
    <div>
     <v-img
     v-if="userProfileById && userProfileById.avatar"
        class="my-4 mx-auto"
        :src="`http://localhost/static/${userProfileById.avatar}`"
        width="450"
        height="550"
        
      ></v-img>
      <v-img
        v-else
        class="my-4 mx-auto"
        src="https://oionline.com/wp-content/uploads/2018/03/not_found.png"
        width="450"
        height="450"
        
      ></v-img>
      <h2 >{{ currentUserNotShown.full_name }} {{userProfileById.age? userProfileById.age: ""}} </h2>
      <div style="max-width:500px">
      <h2 >{{ userProfileById && userProfileById.description || "No description :( "}}</h2>
      </div>
      </div>
      <v-row :justify="'space-between'" class="my-2">
        <v-btn c @click="like" icon
          ><v-icon color="red">mdi-heart</v-icon></v-btn
        >
        <v-btn @click="notlike" icon
          ><v-icon color="black">mdi-close</v-icon></v-btn
        >
      </v-row>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { readUserProfile, readUserProfileNotShown, readUserProfileById } from "@/store/main/getters";
import { ISendSympathy } from "@/interfaces";
import {
  dispatchUserLogOut,
  dispatchGetUserProfileNotShown,
  dispatchGetUserProfileById,
  dispatchSympathy,
} from "@/store/main/actions";

@Component
export default class Matching extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  get userProfileById() {
    return readUserProfileById(this.$store);
  }
  get userProfileNotShown() {
    return readUserProfileNotShown(this.$store);
  }
  get currentUserNotShown(){
    return this.userProfileNotShown![this.current];
  }
  
  current: number = 0;
  public like() {
    const user = {
      receiver_id: this.userProfileNotShown![this.current]!.id,
    };
    dispatchSympathy(this.$store, user as ISendSympathy);
    this.current++;
    dispatchGetUserProfileById(this.$store,this.userProfileNotShown![this.current]!.id!);


  }

  public notlike() {
      if(this.current + 1 < this.userProfileNotShown!.length){

        this.current++;

        dispatchGetUserProfileById(this.$store,this.currentUserNotShown!.id!);
      } else {
        this.current = 0;
        dispatchGetUserProfileNotShown(this.$store);
      }

  }

  mounted() {
    dispatchGetUserProfileNotShown(this.$store);
    setTimeout(()=>{
      dispatchGetUserProfileById(this.$store,this.currentUserNotShown!.id!);
    },100)

  }
}
</script>
<style scoped></style>
