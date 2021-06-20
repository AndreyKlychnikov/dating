<template >
  <v-container>
    <div class="mx-auto" v-if="userProfileNotShown">
      <div v-if="userProfileNotShown.length == 0">
        Unfortunately, we cant find users with yours preferences :(
      </div>
      <div
        class="mx-auto"
        v-else-if="
          userProfile.avatar && userProfile.description && userProfile.age
        "
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
          <div style="max-width: 500px" class="mx-auto">
            <div class="title text--lighten-3">
              {{ currentUserNotShown.full_name }},
              {{ currentUserNotShown.age ? currentUserNotShown.age : "" }}
            </div>
            <div style="max-width: 500px">
              <p>
                {{
                  (currentUserNotShown && currentUserNotShown.description) ||
                  "No description :( "
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="my-2 text-h4 text-center text--lighten-2" v-else>
        Please Update your profile!
      </div>
      <v-row
        :justify="'space-between'"
        class="my-2 mt-4 mx-auto"
        style="max-width: 600px"
      >
        <v-col cols="4" class="text-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="like" elevation="1" large icon>
                <v-icon color="red">mdi-heart</v-icon>
              </v-btn>
            </template>
            <span>I like this!</span>
          </v-tooltip>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="overlay = !overlay" icon v-bind="attrs" v-on="on" elevation="1" large>
                <v-icon color="black">mdi-cog</v-icon>
              </v-btn>
            </template>
            <span>Filter settings</span>
          </v-tooltip>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="notlike" icon v-bind="attrs" v-on="on" elevation="1" large>
                <v-icon color="black">mdi-close</v-icon>
              </v-btn>
            </template>
            <span>I dont like this</span>
          </v-tooltip>
        </v-col>
      </v-row>
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
                :items="[
                  { text: 'Not set', value: null },
                  { text: 'Male', value: true },
                  { text: 'Female', value: false },
                ]"
                label="Preferred gender"
                v-model="preferred_gender_str"
              ></v-select>
              <v-switch
                light
                v-model="preferr_age"
                label="Age filter"
              ></v-switch>
              <v-range-slider
                max="100"
                min="0"
                v-model="preferred_age"
                :disabled="!preferr_age"
                light
              >
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
  </v-container>
</template>

<script lang="ts">
import { apiUrl } from "@/env";
import { Component, Vue } from "vue-property-decorator";
import { readUserProfile, readUserProfileNotShown } from "@/store/main/getters";
import { ISendSympathy, IUserProfileUpdate } from "@/interfaces";
import {
  dispatchGetUserProfileNotShown,
  dispatchSympathy,
  dispatchUpdateUserProfile,
} from "@/store/main/actions";

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
  public preferred_gender_str: boolean | null =
    this.userProfile!.preferred_gender!;
  public preferred_gender: boolean | null = this.userProfile!.preferred_gender!;
  public preferred_age: number[] = [0, 10];
  public preferr_age: boolean = !!this.userProfile!.preferred_age_min;
  current: number = 0;
  public like() {
    const user = {
      receiver_id: this.userProfileNotShown![this.current]!.id,
    };
    dispatchSympathy(this.$store, user as ISendSympathy);
    this.next();
  }
  public save() {
    const profile: IUserProfileUpdate = {
      preferred_gender: this.preferred_gender_str,
      preferred_age_min: this.preferr_age ? this.preferred_age![0] : null,
      preferred_age_max: this.preferr_age ? this.preferred_age![1] : null,
    };

    dispatchUpdateUserProfile(this.$store, profile);
    setTimeout(() => {
      dispatchGetUserProfileNotShown(this.$store);
    }, 300);

    this.overlay = false;
  }
  public notlike() {
    this.next();
  }
  next() {
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
    console.log(this.userProfile);
    setTimeout(() => {
      this.preferred_age = [
        this.userProfile!.preferred_age_min!,
        this.userProfile!.preferred_age_max!,
      ];
    }, 200);
  }
}
</script>
<style scoped></style>
