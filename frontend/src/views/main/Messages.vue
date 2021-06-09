<template>
  <v-app>
    <div class="mx-auto my-2">
      <h1>You have mutual sympathy!</h1>
      <v-container fluid>
        <div v-for="(el, id) in names" :key="id" class="mx-auto my-auto">
          <h3>You and {{ el }} likes each other</h3>
        </div>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { ISympathy } from "@/interfaces";
import { readUserProfile, readUserSympathies,readUserId } from "@/store/main/getters";
import { dispatchUserLogOut, dispatchGetUserId } from "@/store/main/actions";

@Component
export default class Messages extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  get getSymtpathy() {
    return readUserSympathies(this.$store);
  }
  get likes() {
    return [
      {
        name: "John",
      },
      {
        name: "Stepan",
      },
      {
        name: "Andrew",
      },
      {
        name: "Makarichev",
      },
    ];
  }
  public names: string[] = ["asd"];
  public getNames() {
    this.names = [];
  
    this.getSymtpathy.forEach(el => {
      let i = dispatchGetUserId(this.$store, el.reciever_id);
      this.names.push(readUserId().fullname);
    });
  }
  mounted() {
    this.getNames();
  }
}
</script>

<style scoped></style>
