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
            <v-card-text v-if="step2">
              <v-form>
                <v-textarea
                  v-model="userProfile.description"
                  prepend-icon="description"
                  name="description"
                  label="Description"
                  type="text"
                  rows="1"
                  required
                ></v-textarea>
                <v-text-field
                  v-model.number="userProfile.age"
                  prepend-icon="number"
                  name="age"
                  label="age"
                  id="age"
                  required
                ></v-text-field>
                <v-select
                  :items="['male', 'female']"
                  @change="setSex"
                  label="Sex"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-text v-if="step3">
              <v-form>
                <v-file-input
                  class="mx-4"
                  light
                  accept="image/png, image/jpg, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  v-model="imageData"
                ></v-file-input>
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
import { IUserCreate, IUserProfileCreate } from "@/interfaces";
import {
  dispatchCreateUserOpen,
  dispatchUpdateUserProfile,
  dispatchUploadUserAvatar,
} from "@/store/main/actions";

@Component
export default class Login extends Vue {
  public step1: boolean = true;
  // public step2: boolean = false;
  // public step3: boolean = false;
  public user: IUserCreate = {
        email: "",
    full_name: "",
    password: "",
    is_active: true,
    is_superuser: false,
  };
  public userProfile: IUserProfileCreate = {
    description: "",
    age: 0,
    sex: true,
  };
  public imageData: string | Blob = "";
  public setSex(val: string) {
    if (val == "male") {
      this.userProfile.sex = true;
    } else {
      this.userProfile.sex = false;
    }
  }
  /**
   * submit
   */
  public async submit() {
    await dispatchCreateUserOpen(this.$store, this.user);
    this.$router.push("/login");
  }
  // public next() {
  //   if (this.step1) {
  //     this.step1 = false;
  //     this.step2 = true;
  //     return;
  //   }
  //   this.step2 = false;
  //   this.step3 = true;
  // }
  // public back() {
  //   if (this.step2) {
  //     this.step2 = false;
  //     this.step1 = true;
  //     return;
  //   }
  //   this.step3 = false;
  //   this.step2 = true;
  // }
}
</script>

<style></style>
