<template>
    <div>
        <v-img
                :src="`http://localhost/static/${userProfile.avatar}`"
                max-height="450"
                max-width="450"
              ></v-img>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { readUserProfile, readUser, readToken } from "@/store/main/getters";

@Component
export default class MatchProfileCard extends Vue {
get userProfile() {
    return readUserProfile(this.$store);
  }
  get user() {
    return readUser(this.$store);
  }
}
</script>
<style lang="">
    
</style>