<template>
  <v-card class="elevation-12">
    <v-toolbar 
      dark 
      color="primary"
    >
      <v-toolbar-title>Rate My Tastes</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-subheader>Discover the average ratings of your favorite books, movies or video games.</v-subheader>
      <v-autocomplete
        v-model="selectedMovies"
        :items="moviesResults"
        :loading="isMoviesLoading"
        :search-input.sync="movieQuery"
        hide-no-data
        hide-selected
        label="Favorite Movies"
        placeholder="Start typing to search movies..."
        prepend-icon="local_movies"
        return-object
      />
      <v-autocomplete
        v-model="selectedBooks"
        :items="booksResults"
        :loading="isBooksLoading"
        :search-input.sync="bookQuery"
        hide-no-data
        hide-selected
        label="Favorite Books"
        placeholder="Start typing to search books..."
        prepend-icon="library_books"
        return-object
      />
      <v-autocomplete
        v-model="selectedVideoGames"
        :items="videoGamesResults"
        :loading="isGamesLoading"
        :search-input.sync="videoGameQuery"
        hide-no-data
        hide-selected
        label="Favorite Video Games"
        placeholder="Start typing to search video games..."
        prepend-icon="games"
        return-object
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'RateMyTastes',
  data: () => ({
    selectedMovies: '',
    selectedBooks: '',
    selectedVideoGames: '',
    movieQuery: null,
    videoGameQuery: null,
    bookQuery: null,
    moviesResults: [],
    booksResults: [],
    videoGamesResults: [],
    isMoviesLoading: false,
    isBooksLoading: false,
    isGamesLoading: false,
    errors: []
  }),
  watch: {
    movieQuery(val) {
      if (val.length > 2) {
        this.isMoviesLoading = true

        this.debouncedMovieResults(val)
      }
    }
  },
  methods: {
    debouncedMovieResults: debounce(async function debouncedMovieResults(
      query
    ) {
      try {
        const res = await this.$axios.$get(`/api/movies?q=${query}`)

        if (res.Response === 'True') {
          this.moviesResults = res.Search.map(movie => movie.Title)
        } else {
          this.moviesResults = []
        }

        this.isMoviesLoading = false
      } catch (error) {
        throw new Error(error)
      }
    },
    500)
  }
}
</script>

<style>
</style>
