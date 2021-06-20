<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline mt-0">User Profile</div>
      </v-col>
      <v-col class="text-right">
        <v-btn
            outlined
            color="primary"
            class="mb-2 mt-0"
            @click="overlay = !overlay"
        >
          Edit
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>


    <v-divider />
    <v-row>
      <v-col cols="6">
        <div
          class="my-4"
        >
          <v-hover v-slot="{ hover }">
            <v-img
              :src="`${api}/static/${userProfile.avatar}`"
              :style="{
                height: 350 + 'px',
                width: 100 + '%',
                objectFit: 'contain',
              }"
            >
              <v-fade-transition>
                <v-overlay
                    v-if="hover"
                    absolute
                    color="primary"
                >
                  <v-btn @click="overlayAvatar = true">Change avatar</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-img>

          </v-hover>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="my-3">
          <div class="subheading secondary--text text--lighten-3">
            Full Name
          </div>
          <p>
            {{ user.full_name }}
          </p>
        </div>
        <div class="my-3">
          <div class="subheading secondary--text text--lighten-3">
            Email
          </div>
          <p>
            {{ user.email }}
          </p>
        </div>
        <div class="my-3">
          <div class="subheading secondary--text text--lighten-3">
            Description
          </div>
          <p>
            {{ userProfile.description }}
          </p>
        </div>
        <div class="my-3">
          <div class="subheading secondary--text text--lighten-3">Age</div>
          <p>
            {{ userProfile.age }}
          </p>
        </div>
        <div class="my-3">
          <div class="subheading secondary--text text--lighten-3">Sex</div>

          <p
            v-if="userProfile.sex != null"
          >
            {{ !!userProfile.sex? 'Male':'Female'  }}
          </p>
          <div v-else class="body-1 text--darken-2">Not Set</div>
        </div>
      </v-col>
    </v-row>

    <v-overlay
      color="grey lighten-3"
      :absolute="absolute"
      :opacity="opacity"
      :value="overlay"
    >
      <v-card class="mx-auto my-12" light min-width="450">
        <v-form ref="form" lazy-validation>
          <v-container fluid>
             <div class="headline mt-0">Edit Profile</div>
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
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {IUserProfileUpdate} from "@/interfaces";
import {readUser, readUserProfile} from "@/store/main/getters";
import {dispatchUpdateUserProfile, dispatchUploadUserAvatar,} from "@/store/main/actions";
import {apiUrl} from "@/env";

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

  public sexSelected: string | null = this.userProfile!.sex! ? "Male" : "Female";
  public description: string | null = this.userProfile!.description!;
  public fullname: string | null = this.user!.full_name!;
  public age: number | null = this.userProfile!.age!;
  public sex: boolean | null = this.userProfile!.sex!;
  public imageData: string | Blob = "";

  public setSex(el: string){
    this.sex = el == 'Male';
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
    await dispatchUploadUserAvatar(this.$store, formData);
    this.overlayAvatar = false;
  }
  mounted() {}
}
</script>
<style scoped></style>
