<template>
  <v-app>
    <div class="mx-auto my-2">
      <v-container fluid>
        <div v-for="(user, id) in users" :key="id" class="mx-auto my-2">
          <template>
            <v-card elevation="1" tile flat max-width="450px">
              <v-layout column align-center>
                <v-avatar class="my-3 mx-3">
                  <img
                    :src="`${api}/static/${usersProfiles[id].avatar}`"
                    height="200px"
                  />
                </v-avatar>
                <v-card-title>
                  {{ "  " + user.full_name + " " + usersProfiles[id].age }}
                </v-card-title>
                <v-card-subtitle>
                  Contact me! -> {{ user.email + " <-" }}
                </v-card-subtitle>
                <v-card-text>
                  {{ usersProfiles[id].description || "no description :(" }}
                </v-card-text>
              </v-layout>
            </v-card>
          </template>
        </div>
        <h3 v-if="!users.length">No sympathy yet :(</h3>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { ISympathy, IUser, IUserProfile } from "@/interfaces";
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
  public api: string = apiUrl;
  public users: IUser[] = [];
  public usersProfiles: IUserProfile[] = [];
  public async getNames() {
    this.users = [];
    setTimeout(() => {}, 1000);
    let symp = this.getSympathy!;
    console.log(symp);
    if (symp) {
      for (const i of symp) {
        axios
          .get<IUser>(
            `${apiUrl}/api/v1/users/${+i.receiver_id}`,
            this.authHeaders(this.getToken)
          )
          .then((res) => {
            this.users.push(res.data);
            axios
              .get<IUserProfile>(
                `${apiUrl}/api/v1/profiles/${+i.receiver_id}`,
                this.authHeaders(this.getToken)
              )
              .then((r) => {
                this.usersProfiles.push(r.data);
              });
          });
      }
      console.log("profiles", this.usersProfiles);
      console.log("users", this.users);
    }
  }
  public authHeaders(token: string) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  mounted() {
    this.getSympathies();
    setTimeout(() => {
      this.getNames();
    }, 200);
  }
}
</script>

<style scoped></style>
