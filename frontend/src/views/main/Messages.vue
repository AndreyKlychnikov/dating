<template>
  <v-app>
    <div class="mx-auto my-2">
      <h1>Sympathy</h1>
      <div v-for="(el,id) in likes" :key="id" class="mx-2 my-3">
        <h3>You and {{el.name}} likes each other</h3>
      </div>
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
  get getSymtpathy() {
    return readUserProfile(this.$store);
  }
  get likes(){
    return [{
      name: "John"
    },{
      name: "Stepan"
    },{
      name: "Andrew"
    },{
      name: "Makarichev"
    }]
  }
}
</script>

<style scoped>

</style>