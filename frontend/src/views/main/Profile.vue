<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col col="6">
        <div class="headline">User Profile</div>
        <v-divider />
        <v-row>
          <v-col cols="auto">
            <div
              class="my-4"
              :style="{
                maxWidth: 350 + 'px',
                maxHeight: 350 + 'px',
              }"
            >
              <v-img
                :src="`${api}/static/${userProfile.avatar}`"
                :style="{
                  height: 350 + 'px',
                  width: 100 + '%',
                  objectFit: contain,
                }"
              ></v-img>
              <v-btn class="my-5" @click="overlayAvatar = true"
                >Change avatar</v-btn
              >
            </div>
          </v-col>
          <v-col>
            <div class="my-4">
              <div class="subheading secondary--text text--lighten-3">
                Full Name
              </div>
              <div class="title text--darken-2">
                {{ user.full_name }}
              </div>
            </div>
            <div class="my-3">
              <div class="subheading secondary--text text--lighten-3">
                Email
              </div>
              <div class="title text--darken-2">
                {{ user.email }}
              </div>
            </div>
            <div class="my-3">
              <div class="subheading secondary--text text--lighten-3">
                Discritpion
              </div>
              <div class="title text--darken-2">
                {{ userProfile.description }}
              </div>
            </div>
            <div class="my-3">
              <div class="subheading secondary--text text--lighten-3">Age</div>
              <div class="title text--darken-2">
                {{ userProfile.age }}
              </div>
            </div>
            <div class="my-3">
              <div class="subheading secondary--text text--lighten-3">Sex</div>

              <div
                v-if="userProfile.sex != null"
                class="title text--darken-2"
              >
                {{ !!userProfile.sex? 'Male':'Female'  }}
              </div>
              <div v-else class="body-1 text--darken-2">Not Set</div>
            </div>

            <v-btn
              color="orange lighten-2"
              class="my-5 mx-2"
              @click="overlay = !overlay"
            >
              Edit profile
            </v-btn>
          </v-col>
        </v-row>

        <v-overlay
          color="grey lighten-3"
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
        >
          <v-text-field label="Regular"></v-text-field>
          <v-card class="mx-auto my-12" light min-width="450">
            <v-form ref="form" lazy-validation>
              <v-container fluid>
                <h2 class="ma-4">Change profile</h2>
                <v-text-field label="age" v-model.number="age"></v-text-field>
                <v-text-field
                  label="Description"
                  v-model="description"
                ></v-text-field>
                <v-select :items="['Male','Female']" label="Sex" @change="setSex" v-model="sexSelected" solo></v-select>
              </v-container>
            </v-form>

            <v-btn class="ma-2" @click="cancel">Cancel</v-btn>
            <v-btn class="ma-2" color="error" @click="reset">Reset</v-btn>
            <v-btn class="ma-2" color="primary" @click="submit">Save</v-btn>
          </v-card>
        </v-overlay>
        <v-overlay
          color="grey lighten-3"
          :absolute="absolute"
          :opacity="opacity"
          :value="overlayAvatar"
        >
          <v-sheet color="white" width="500">
            <v-file-input
              class="mx-4"
              light
              accept="image/png, image/jpg, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              v-model="imageData"
            ></v-file-input>
            <v-btn class="mx-4 my-2" color="primary" @click="onUpload"
              >Upload</v-btn
            >
            <v-btn class="ma-2" color="primary" @click="overlayAvatar = false"
              >Close</v-btn
            >
          </v-sheet>
        </v-overlay>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { IUserProfileUpdate, IUserProfile } from "@/interfaces";
import { readUserProfile, readUser, readToken } from "@/store/main/getters";
import {
  dispatchUploadUserAvatar,
  dispatchUpdateUserProfile,
} from "@/store/main/actions";
import { apiUrl } from "@/env";

@Component
export default class Profile extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  get user() {
    return readUser(this.$store);
  }
  public api: string = apiUrl;
  public absolute: boolean = true;
  public opacity: number = 0.95;
  public overlay: boolean = false;
  public overlayAvatar: boolean = false;

  public sexSelected: string | null = this.userProfile!.sex! ? "Male" : "Female";;
  public description: string | null = this.userProfile!.description!;
  public fullname: string | null = this.user!.full_name!;
  public age: number | null = this.userProfile!.age!;
  public sex: boolean | null = this.userProfile!.sex!;
  public imageData: string | Blob = "";

  public setSex(el: string){
    this.sex = el == 'Male'? true : false;
  }
  public reset() {
    if (this.userProfile) {
      this.age = this.userProfile!.age!;
      this.description = this.userProfile!.description!;
    }
  }
  public cancel() {
    this.overlay = false;
    this.reset();
  }
  public async submit() {

    const updatedProfile: IUserProfileUpdate = {
      description: this.description!,
      age: this.age!,
      sex: this.sex! ,
    };

    await dispatchUpdateUserProfile(this.$store, updatedProfile);
    this.overlay = false;
  }
  public async onUpload() {
    const formData = new FormData();
    formData.append("img", this.imageData);
    const userAvatar: FormData = formData;
    await dispatchUploadUserAvatar(this.$store, userAvatar);
    this.overlayAvatar = false;
  }
  mounted() {}
}
</script>
<style scoped></style>
