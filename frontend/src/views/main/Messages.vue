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
import { ISympathy,IUser } from "@/interfaces";
import { readUserProfile, readUserSympathies,readUserId, readToken } from "@/store/main/getters";
import { dispatchUserLogOut, dispatchGetUserId,dispatchGetSympathy } from "@/store/main/actions";
import axios from 'axios'
import { apiUrl } from '@/env';

@Component
export default class Messages extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  get getSymtpathy() {
    return readUserSympathies(this.$store);
  }
  get getUserId() {
    return readUserId(this.$store);
  }
  get getToken() {
    return readToken(this.$store);
  }

  public async getSympathies(){
    setTimeout(() => {}, 500);
    await dispatchGetSympathy(this.$store);
  }
  public async getNames() {
    let names: string[] = [];

      for (const i of this.getSymtpathy) {
        axios.get<IUser>(`${apiUrl}/api/v1/users/${i.reciever_id}`, this.authHeaders(this.getToken)).then((res)=> {
          names[names.length] = res.data.full_name;          
        })
      }
      setTimeout(() => {
        console.log(this.names);
                  this.names = names;

      }, 500);
  }
  public names: string[] = [];
  public authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
  mounted() {
    this.getSympathies();
    this.getNames();
  }
}
</script>

<style scoped></style>
