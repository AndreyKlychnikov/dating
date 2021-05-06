<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12" v-if="step1">
            <v-toolbar color="primary">
              <v-toolbar-title>Регистрация - шаг 1</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter="submit">
                <v-text-field
                    @keyup.enter="submit"
                    v-model="user.email" prepend-icon="email"
                    name="login"
                    label="Login"
                    type="text"
                    autocomplete = 'login'
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
                    v-model="user.full_name" prepend-icon="person"
                    name="full_name"
                    label="full_name"
                    id="full_name"
                    type="text"
                    required
                ></v-text-field>
              </v-form>
              <!-- <div v-if="loginError">
                <v-alert :value="loginError" transition="fade-transition" type="error">
                  Incorrect email or password
                </v-alert>
              </div> -->
              <!-- <v-flex class="caption text-xs-right"><router-link to="/recover-password">Forgot your password?</router-link></v-flex>
              <v-flex class="caption text-xs-right"><router-link to="/signup">SignUp</router-link></v-flex> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="next">Next</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="elevation-12" v-if="step2">
            <v-toolbar color="primary">
              <v-toolbar-title>Регистрация - шаг 2</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter="submit">
                <v-textarea
                    v-model="userProfile.discription" prepend-icon="discription"
                    name="discription"
                    label="Discription"
                    type="text"
                    rows="1"
                    required
                ></v-textarea>
                <v-text-field
                    v-model="userProfile.age"
                    prepend-icon="age"
                    name="age"
                    label="age"
                    id="age"
                    type="number"
                    required
                ></v-text-field>
                <!-- <v-text-field
                    v-model="user.full_name" prepend-icon="person"
                    name="full_name"
                    label="full_name"
                    id="full_name"
                    type="text"
                    required
                ></v-text-field> -->
              </v-form>
              <!-- <div v-if="loginError">
                <v-alert :value="loginError" transition="fade-transition" type="error">
                  Incorrect email or password
                </v-alert>
              </div> -->
              <!-- <v-flex class="caption text-xs-right"><router-link to="/recover-password">Forgot your password?</router-link></v-flex>
              <v-flex class="caption text-xs-right"><router-link to="/signup">SignUp</router-link></v-flex> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="next">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Login extends Vue {
  public step1: boolean = true;
  public step2: boolean = false;
  public user: object = {
    email: '',
    full_name: '',
    password: '',
  }
  public userProfile: object = {
    description: '',
    age: null,
    sex: null
  }
  public next(){
    this.step1 = false;
    this.step2 = true;
  }
}
</script>

<style>
</style>
