<template>
  <v-app>
    <div class="mx-auto">
      <h1>Messages</h1>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile } from '@/store/main/getters';
import { dispatchUserLogOut } from '@/store/main/actions';

@Component
export default class Messages extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }
}
</script>

<style scoped>

</style>