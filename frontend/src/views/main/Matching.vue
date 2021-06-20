<template >
  <v-container>
    <div class="mx-auto" v-if="userProfileNotShown">
      <div v-if="userProfileNotShown.length == 0">
        Unfortunately, we cant found users with yours preferences :(
      </div>
      <div
        v-else-if="
          currentUserNotShown.avatar &&
          currentUserNotShown.description &&
          currentUserNotShown.age
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
      <h2 v-else>Please Update your profile!</h2>
      <v-row
        :justify="'space-between'"
        class="my-2 mt-4 mx-auto"
        style="max-width: 600px"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" @click="like" icon
              ><v-icon color="red">mdi-heart</v-icon></v-btn
            >
          </template>
          <span>I like this!</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="overlay = !overlay" icon  v-bind="attrs" v-on="on"
              ><v-icon color="black">mdi-cog</v-icon></v-btn
            >
          </template>
          <span>Filter settings</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn @click="notlike" icon v-bind="attrs" v-on="on"
          ><v-icon color="black">mdi-close</v-icon></v-btn
        >
          </template>
          <span>I dont like this</span>
        </v-tooltip>

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
    setTimeout(() => {
      dispatchGetUserProfileNotShown(this.$store);
    }, 100);

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
