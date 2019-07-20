<template>
  <div id="navigation">
    <nav>
      <ul>
        <li v-if="isHomePage"><router-link to="guest-book" class="nav-link">Перейти к гостевой книге</router-link></li>
        <li v-if="!isHomePage"><router-link to="/" class="nav-link">Главная</router-link></li>

        <li v-if="isCurrentUserLoggedIn"><span class="nav-text">Вы вошли как {{currentUserName}}</span></li>
        <li v-if="isCurrentUserLoggedIn"><router-link to="signup" @click="logout" class="nav-link">Выйти</router-link></li>

        <li v-if="!isCurrentUserLoggedIn"><router-link to="login" class="nav-link">Войти</router-link></li>
        <li v-if="!isCurrentUserLoggedIn"><router-link to="signup" class="nav-link">Зарегистрироваться</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import db from '@/firebase-init.js';
import firebase from 'firebase';

export default {
  name: 'navigation',
  data() {
      return {
          isCurrentUserLoggedIn: false,
          currentUserName: null,

          isHomePage: false,
      }
  },

  created() {
    // проверяем, залогинен пользователь или нет
    if (firebase.auth().currentUser) {
      this.isCurrentUserLoggedIn = true;
      // this.currentUserName = firebase.auth().currentUser.uid;
      db.collection('users').doc(firebase.auth().currentUser.uid).get().then( (doc) => {
        this.currentUserName = doc.data().username
      });
    }

    // проверяем, находится пользователь на главной или нет
    this.$router.history.current.path == '/' ? this.isHomePage = true : this.isHomePage = false;

  },

  methods: {
      logout: function() {
          firebase.auth().signOut().then(() => {
              this.$router.go({ path: this.$router.path });
          });
      }
  }
}
</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

ul li {
  display: inline-block;
}

.nav-link {
  margin: 0 6px;
  font-family: $fontFamilyForServiceText;
  font-size: 14px;
  text-decoration: none;
  color: $blue;
  transition: all ease-in-out .2s;
  border-bottom: 1px solid transparent;

  &:hover {
    color: $darkBlue;
    border-bottom: 1px solid;
    cursor: pointer;
  }
}

.nav-text {
  margin: 0 6px;
  font-family: $fontFamilyForServiceText;
  font-size: 14px;
  color: $colorForText;
}


</style>
