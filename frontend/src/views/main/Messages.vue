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
import { ISympathy, IUser } from "@/interfaces";
import {
  readUserProfile,
  readUserSympathies,
  readUserId,
  readToken,
} from "@/store/main/getters";
import {
  dispatchUserLogOut,
  dispatchGetUserId,
  dispatchGetSympathy,
} from "@/store/main/actions";
import axios from "axios";
import { apiUrl } from "@/env";

@Component
export default class Messages extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  get getSympathy() {
    return readUserSympathies(this.$store);
  }
  get getToken() {
    return readToken(this.$store);
  }
  public async getSympathies() {
    await dispatchGetSympathy(this.$store);
  }
  public async getNames() {
    let names: string[] = [];
    setTimeout(()=> {},1000)
    let symp = this.getSympathy!;
    console.log(symp)
    if (symp) {
      for (const i of symp) {
        axios
          .get<IUser>(
            `${apiUrl}/api/v1/users/tgit  ?user_id=${i.receiver_id}`,
            this.authHeaders(this.getToken)
          )
          .then((res) => {
          console.log(res)
            names[names.length] = res.data.full_name;
          });
      }
      setTimeout(() => {
        console.log(this.names);
        this.names = names;
      }, 500);
    }
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
    setTimeout(()=> {this.getNames()},200);
  }
}
</script>

<style scoped></style>
