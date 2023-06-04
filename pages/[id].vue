<script setup lang="ts">
const { id } = useRoute().params
const { baseIMG } = useRuntimeConfig().public

const movie = ref({})

async function getMovie() {
  try {
    const { data } = await useMyFetch(`/movies/${id}`)
    movie.value = data.value
  } catch (error) {}
}

await getMovie()
</script>

<template>
  <v-container v-if="movie" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5" align="center">
        <v-img
          :src="`${baseIMG}${movie.image}`"
          class="rounded-xl"
          width="80%"
        />
      </v-col>
      <v-col cols="12" md="6" lg="5">
        <div class="d-flex justify-space-between align-center">
          <p class="text-h4 mb-4">
            {{ movie.title }}
          </p>
          <NuxtLink to="/">
            <v-btn
              prepend-icon="mdi-undo"
              variant="elevated"
              color="primary"
              rounded="xl "
            >
              <template #prepend>
                <v-icon color="white"></v-icon>
              </template>

              Back
            </v-btn>
          </NuxtLink>
        </div>
        <div class="mb-5">
          <small class="me-2">{{ movie.date }}</small>
          <v-icon
            color="success"
            icon="mdi-calendar-check"
            size="small"
          ></v-icon>
        </div>

        <div class="mb-5">
          <p class="text-overline">Description</p>
          <p class="text-grey text-justify">
            {{ movie.overview }}
          </p>
        </div>

        <div class="mb-10">
          <p class="text-overline">Genders</p>
          <v-chip
            v-for="gender in movie.genders"
            :key="gender.id"
            class="mr-2 mb-2"
            text-color="white"
            color="success"
            label
          >
            <v-icon start icon="mdi-label"></v-icon>
            {{ gender.name }}
          </v-chip>
        </div>

        <div class="mb-10">
          <p class="text-overline">Production Companies</p>
          <v-chip
            v-for="company in movie.productionCompanies"
            :key="company.id"
            class="mr-2 mb-2"
            text-color="white"
            color="blue"
          >
            <v-icon start icon="mdi-video-outline"></v-icon>
            {{ company.name }} ({{ company.country }})
          </v-chip>
        </div>

        <div class="mb-5">
          <p class="text-overline">Popularity</p>
          <div>
            <v-rating
              :model-value="movie.average"
              class="my-2"
              color="amber"
              density="comfortable"
              size="small"
              length="10"
              half-increments
              readonly
            />

            <p class="text-grey">
              {{ movie.average.toFixed(1) }}
              ({{ movie.popularity }})
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
