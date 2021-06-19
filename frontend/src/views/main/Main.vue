<template>
  <v-app id="inspire">
    <v-app-bar app color="white">
      <v-tabs centered class="ml-n9">
        <v-tab
          to="/main/matching"
          exact-active-class="blue--text text--accent-4"
        >
          Love
        </v-tab>
        <v-tab
          to="/main/messages"
          exact-active-class="blue--text text--accent-4"
        >
          Sympathy
        </v-tab>
        <v-tab
          to="/main/profile"
          exact-active-class="blue--text text--accent-4"
        >
        
        <v-badge v-if="!userProfile.avatar || !userProfile.description || !userProfile.age"
          color="primary"
          dot
        >
          Profile
        </v-badge>
          <span v-else>Profile</span>
        

        </v-tab>
      </v-tabs>

      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
              icon
              v-bind="attrs"
              v-on="on"
              color="grey darken-1 shrink"
          >
            <v-img
                :src="`${apiUrl}/static/${userProfile.avatar}`"
            ></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>close</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="white">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2"></v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg" outlined>
              <v-container fluid>
                <router-view></router-view>
              </v-container>

              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

import {readUser, readUserProfile} from "@/store/main/getters";
import {dispatchUserLogOut} from "@/store/main/actions";
import {apiUrl} from '@/env';

const routeGuardMain = async (to, from, next) => {
  if (to.path === "/main") {
    next("/main/matching");
  } else {
    next();
  }
};

@Component
export default class Main extends Vue {
  public apiUrl: string = apiUrl;

  get user() {
    return readUser(this.$store);
  }
  get userProfile() {
    return readUserProfile(this.$store);
  }

  public beforeRouteEnter(to, from, next) {
    routeGuardMain(to, from, next);
  }

  public beforeRouteUpdate(to, from, next) {
    routeGuardMain(to, from, next);
  }

  public async logout() {
    await dispatchUserLogOut(this.$store);
  }
  mounted() {
    console.log(this.userProfile)
  }
}
</script>

<style scoped>
</style>
