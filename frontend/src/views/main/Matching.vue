<template>
  <v-app>
    <div class="mx-auto">
      <div
        v-if="userProfile.avatar && userProfile.description && userProfile.age"
      >
        <div>
          <v-img
            v-if="currentUserNotShown && currentUserNotShown.avatar"
            class="my-4 mx-auto"
            :src="`${apiUrl}/static/${currentUserNotShown.avatar}`"
            width="450"
            height="550"
          ></v-img>
          <v-img
            v-else
            class="my-4 mx-auto"
            src="https://oionline.com/wp-content/uploads/2018/03/not_found.png"
            width="450"
            height="450"
          ></v-img>
          <h2>
            {{ userProfile.full_name }}
            {{ currentUserNotShown.age ? currentUserNotShown.age : "" }}
          </h2>
          <div style="max-width: 500px">
            <h2>
              {{
                (currentUserNotShown && currentUserNotShown.description) ||
                "No description :( "
              }}
            </h2>
          </div>
        </div>
        <v-row :justify="'space-between'" class="my-2">
          <v-btn c @click="like" icon
            ><v-icon color="red">mdi-heart</v-icon></v-btn
          >
          <v-btn @click="overlay = !overlay" icon
            ><v-icon color="black">mdi-cog</v-icon></v-btn
          >
          <v-btn @click="notlike" icon
            ><v-icon color="black">mdi-close</v-icon></v-btn
          >
        </v-row>
      </div>
      <h2 v-else>Please Update your profile!</h2>
      <v-overlay :absolute="false" :value="overlay">
        <v-sheet
          color="white"
          class="my-auto"
          elevation="1"
          height="250"
          width="500"
        >
          <v-container>
            <div class="my-auto">
              <v-select
                light
                :items="['Not set', 'Male', 'Female']"
                label="Prefered gender"
                v-model="preferred_gender_str"
              ></v-select>
              <v-range-slider max="100" min="0" v-model="preferred_age" light>
                <template v-slot:prepend>
                  <div class="mt-0 pt-0 text-caption">
                    {{ preferred_age[0] }}
                  </div>
                </template>
                <template v-slot:append>
                  <div class="mt-0 pt-0 text-caption">
                    {{ preferred_age[1] }}
                  </div>
                </template>
              </v-range-slider>
              <v-btn @click="overlay = false" class="mx-2" light> Close </v-btn>
              <v-btn color="success" @click="save" light> Save </v-btn>
            </div>
          </v-container>
        </v-sheet>
      </v-overlay>
    </div>
  </v-app>
</template>

<script lang="ts">
import { apiUrl } from '@/env';
import {Component, Vue} from "vue-property-decorator";
import {readUserProfile, readUserProfileNotShown,} from "@/store/main/getters";
import {ISendSympathy, IUserProfileUpdate} from "@/interfaces";
import {dispatchGetUserProfileNotShown, dispatchSympathy, dispatchUpdateUserProfile,} from "@/store/main/actions";

@Component
export default class Matching extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
  get userProfileNotShown() {
    return readUserProfileNotShown(this.$store);
  }
  get currentUserNotShown() {
    return this.userProfileNotShown![this.current];
  }
  public overlay: boolean = false;
  public apiUrl: string = apiUrl;
  public preferred_gender_str: string = "";
  public preferred_gender: boolean | null = this.userProfile!.preferred_gender!;
  public preferred_age: number[] | null = [
    this.userProfile!.preferred_age_min!,
    this.userProfile!.preferred_age_max!,
  ];

  current: number = 0;
  public like() {
    const user = {
      receiver_id: this.userProfileNotShown![this.current]!.id,
    };
    dispatchSympathy(this.$store, user as ISendSympathy);
    this.current++;
  }
  public save() {
    let gen: boolean | null = null;
    if (this.preferred_gender_str == "Male") {
      gen = true;
    } else if (this.preferred_gender_str == "Female") {
      gen = false;
    }

    const profile: IUserProfileUpdate = {
      preferred_gender: gen,
      preferred_age_min: this.preferred_age![0],
      preferred_age_max: this.preferred_age![1],
    };

    dispatchUpdateUserProfile(this.$store, profile);
    dispatchGetUserProfileNotShown(this.$store);

    this.overlay = false;
  }
  public notlike() {
    if (this.current + 1 < this.userProfileNotShown!.length) {
      this.current++;
    } else {
      this.current = 0;
      dispatchGetUserProfileNotShown(this.$store);
    }
  }
  public updateFilter() {}
  mounted() {
    dispatchGetUserProfileNotShown(this.$store);
  }
}
</script>
<style scoped></style>
