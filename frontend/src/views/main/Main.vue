<template>
  <v-app id="inspire">
    <v-app-bar app color="white">
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
        @click="logout"
      ></v-avatar>

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
          Messages
        </v-tab>
        <v-tab
          to="/main/profile"
          exact-active-class="blue--text text--accent-4"
        >
          Profile
        </v-tab>
        <v-tab exact-active-class="blue--text text--accent-4">
          Updates
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
        @click="logout"
      ></v-avatar>
    </v-app-bar>

    <v-main class="white">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268" outlined color="">
              <v-container>
                <v-list>
                  <v-list-item to="/admin" v-show="user.is_superuser">
                    <v-list-item-title>Admin page</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="logout">
                    <v-list-item-title>LogOut</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-container>

              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg" outlined>
              <v-container fluid>
                <router-view></router-view>
              </v-container>

              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268" outlined>
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { readHasAdminAccess, readUser } from "@/store/main/getters";
import { dispatchUserLogOut } from "@/store/main/actions";
import { store } from "@/store";

const routeGuardMain = async (to, from, next) => {
  if (to.path === "/main") {
    next("/main/matching");
  } else {
    next();
  }
};

@Component
export default class Main extends Vue {
  get user() {
    return readUser(this.$store);
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
}
</script>

<style scoped>
</style>
