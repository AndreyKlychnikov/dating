<template>
  <v-content>
    <CreateUser/>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateUser from "@/views/main/admin/CreateUser.vue";
@Component({
  components: {CreateUser}
})
export default class Login extends Vue {
}
</script>

<style>
</style>
