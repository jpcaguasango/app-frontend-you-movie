<template>
  <div>
    <v-layout ref="app">
      <TMovieToolbar />
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>
