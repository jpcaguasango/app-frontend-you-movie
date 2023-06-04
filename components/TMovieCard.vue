<script setup lang="ts">
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  }
})

const { baseIMG } = useRuntimeConfig().public
const { movie } = reactive(props)
</script>

<template>
  <v-card
    class="mx-auto my-12 card-movie"
    rounded="xl"
    elevation="10"
    max-width="374"
  >
    <v-img
      :src="`${baseIMG}${movie.image}`"
      min-height="600"
      height="100%"
      cover
    >
      <template #placeholder>
        <div style="height: 400px" class="d-flex align-center justify-center">
          <v-progress-circular color="grey" indeterminate></v-progress-circular>
        </div>
      </template>
    </v-img>

    <v-card-item>
      <v-card-title> {{ movie.title }} </v-card-title>

      <v-card-subtitle>
        <span class="me-2">{{ movie.date }}</span>
        <v-icon color="success" icon="mdi-calendar-check" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="card-movie__overview text-grey">
        {{ movie.overview }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <div class="text-center">
      <v-card-title>Popularity</v-card-title>

      <v-rating
        :model-value="movie.average"
        class="my-2"
        color="amber"
        density="compact"
        size="small"
        length="10"
        half-increments
        readonly
      />

      <div class="text-grey">
        {{ movie.average.toFixed(1) }}
        ({{ movie.popularity }})
      </div>
    </div>

    <div class="ma-5">
      <a :href="`/${movie.id}`">
        <v-btn color="primary" variant="elevated" rounded="xl" block>
          See Detail
        </v-btn>
      </a>
    </div>
  </v-card>
</template>
