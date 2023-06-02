<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <div
    style="height: 80vh"
    class="d-flex flex-column justify-center align-center text-center"
  >
    <div>
      <v-img src="/empty_data.svg" width="300" />
    </div>
    <div :class="{ 'w-25': !mobile, 'my-5': true }">
      We apologize, but your query did not have any results. Please try again
      with different parameters.
    </div>
    <div>
      <slot name="buttonReset" />
    </div>
  </div>
</template>
