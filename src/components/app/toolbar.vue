<template>
  <v-toolbar app color="primary" class="main-menu" dense dark>
    <v-toolbar-title>
      <router-link :to="{name: 'root'}">
        <img src="@/assets/logo.png" class="logo">
      </router-link>
    </v-toolbar-title>

    <v-toolbar-title v-html="title" />
    <v-spacer/>
    <v-toolbar-items class="ml-4">
      <v-menu offset-y v-if="profile">
        <v-btn
          flat
          small
          slot="activator"
        >
          <span>
            {{profile.fullName}}
          </span>
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile :to="{name: 'change-password'}">
            <v-list-tile-title>Сменить пароль</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: 'profile'}">
            <v-list-tile-title>Профайл</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: 'logout'}">
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        flat
        :to="{name: 'login'}"
        v-else
      >
        <span>
          Войти
        </span>
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>
<style>
  .main-menu .logo {
    margin-top: 8px;
    height: 50px;
    width: auto;
    filter: grayscale(100%) contrast(0%) brightness(200%);
  }

</style>
<script type="text/babel">
  export default {
    name: 'Toolbar',
    props: {
      title: {
        type: String,
        required: true
      },
      profile: {
        type: [Object, Boolean],
        required: false
      }
    }
  }
</script>
