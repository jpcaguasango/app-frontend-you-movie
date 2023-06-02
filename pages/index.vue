<script setup lang="ts">
import { useMyFetch } from '../composables/useMyFetch'

const scoreItems = Array.from(new Array(10)).map((item, index) => ({
  title: `${index + 1} Star`,
  value: index + 1
}))

const queryFilter = reactive({
  search: '',
  score: '',
  date: ''
})

const page = ref(1)
const movies = ref([])
const pages = reactive({ totalPages: 0 })

// Methods

/**
 * This function is to the scrolling window
 * Is only rendered in the browser
 *
 */
function scrollToTop() {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) window.scrollTo(0, 0)
}

/**
 * This function is to get the data in the API
 *
 */
async function getDataMovies() {
  const { search } = queryFilter

  if (search) {
    const query = `?title=${search}&page=${page.value}`
    const { data } = await useMyFetch(`/movies/query/${query}`)

    const { results, total_pages: totalPages } = data.value
    movies.value = results
    pages.totalPages = totalPages < 500 ? totalPages : 500
  } else {
    const { data } = await useMyFetch(`/movies/page/${page.value}`)
    const { results, total_pages: totalPages } = data.value
    movies.value = results
    pages.totalPages = totalPages < 500 ? totalPages : 500
  }

  scrollToTop()
}

function resetFilter() {
  page.value = 1
  queryFilter.search = ''
  queryFilter.score = ''
  queryFilter.date = ''
}

// Computes

/**
 * The computed property return the items to the list
 *
 */
const getItems = computed(() => {
  const { score, date } = queryFilter

  if (score || date) {
    const year = date.replaceAll('/', '-')
    return movies.value
      .filter(
        (item) =>
          (item.vote_average >= score && item.vote_average < score + 1) ||
          item.release_date === year
      )
      .sort((a, b) => {
        if (a.vote_average === b.vote_average) return 0
        if (a.vote_average > b.vote_average) return -1
        return 1
      })
  }
  return movies.value
})

// Watchers
watch(page, async () => {
  await getDataMovies()
})
watch(queryFilter, async () => {
  await getDataMovies()
})

// Is call the data fetching
await getDataMovies()
</script>

<template>
  <v-container class="my-5" fluid>
    <v-row class="mx-1">
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="queryFilter.search"
          density="compact"
          label="Search movie"
          append-inner-icon="mdi-magnify"
          color="primary"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="2">
        <v-select
          v-model="queryFilter.score"
          :items="scoreItems"
          item-title="title"
          item-value="value"
          label="Popularity"
          density="compact"
          hide-details
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" lg="2">
        <v-text-field
          v-model="queryFilter.date"
          density="compact"
          label="Date of Publication"
          color="primary"
          hide-details
          type="date"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="getItems.length">
      <v-col v-for="movie in getItems" :key="movie.id" cols="12" md="6" lg="3">
        <TMovieCard :movie="movie" />
      </v-col>
    </v-row>
    <div v-else>
      <TMovieEmptyState>
        <template #buttonReset>
          <v-btn
            color="primary"
            variant="elevated"
            rounded="xl"
            @click="resetFilter"
          >
            Reset Filter
          </v-btn>
        </template>
      </TMovieEmptyState>
    </div>
    <v-row>
      <v-col v-if="getItems.length">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pages.totalPages"
            :total-visible="4"
            active-color="primary"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
