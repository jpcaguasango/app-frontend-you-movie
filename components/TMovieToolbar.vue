<script setup lang="ts">
const { appName } = useRuntimeConfig().public
</script>

<template>
  <v-app-bar color="primary" name="app-bar">
    <v-app-bar-title>
      <v-icon class="mr-2"> mdi-movie-roll </v-icon>
      <b> {{ appName }} </b>
    </v-app-bar-title>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>
