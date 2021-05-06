import Vue from 'vue';
import Vuetify from 'vuetify';
// import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify)

const vuetify = new Vuetify({
  iconfont: 'md',
  theme: {
    themes: {
      light: {
        primary: "#0000FF"        ,
        secondary: "#212121"
      }
    }
  }
})

export default vuetify
