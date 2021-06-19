<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary">
              <v-toolbar-title
                >Registration</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text v-if="step1">
              <v-form @keyup.enter="submit">
                <v-text-field
                  @keyup.enter="submit"
                  v-model="user.email"
                  prepend-icon="email"
                  name="login"
                  label="Login"
                  type="text"
                  autocomplete="login"
                  required
                ></v-text-field>
                <v-text-field
                  @keyup.enter="submit"
                  v-model="user.password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  @keyup.enter="submit"
                  v-model="user.full_name"
                  prepend-icon="person"
                  name="full_name"
                  label="Name"
                  id="full_name"
                  type="text"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn v-if="!step1" @click="back">Back</v-btn>
              <v-btn v-if="!step3" @click="next">Next</v-btn> -->
              <v-btn v-if="step1" @click="submit">Finish</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IUserCreateOpen } from "@/interfaces";
import {
  dispatchCreateUserOpen,
} from "@/store/main/actions";

@Component
export default class Login extends Vue {
  public step1: boolean = true;
  // public step2: boolean = false;
  // public step3: boolean = false;
  public user: IUserCreateOpen = {
        email: "",
    full_name: "",
    password: "",
  };

  /**
   * submit
   */
  public async submit() {
    await dispatchCreateUserOpen(this.$store, this.user);
    this.$router.push("/login");
  }
}
</script>

<style></style>
