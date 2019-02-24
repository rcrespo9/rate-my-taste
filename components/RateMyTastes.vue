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
        item-text="Title"
        :loading="isMoviesLoading"
        :search-input.sync="movieQuery"
        hide-no-data
        hide-selected
        multiple
        chips
        deletable-chips
        label="Favorite Movies"
        placeholder="Start typing to search movies..."
        prepend-icon="local_movies"
        return-object
      />
      <v-autocomplete
        v-model="selectedBooks"
        :items="booksResults"
        item-text="best_book.title._text"
        :loading="isBooksLoading"
        :search-input.sync="bookQuery"
        hide-no-data
        hide-selected
        multiple
        chips
        deletable-chips
        label="Favorite Books"
        placeholder="Start typing to search books..."
        prepend-icon="library_books"
        return-object
      />
      <v-autocomplete
        v-model="selectedVideoGames"
        :items="videoGamesResults"
        item-text="name"
        :loading="isGamesLoading"
        :search-input.sync="videoGameQuery"
        hide-no-data
        hide-selected
        multiple
        chips
        deletable-chips
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
      if (val && val.length > 2) {
        this.isMoviesLoading = true

        this.debouncedMovieResults(val)
      } else if (!val) {
        this.moviesResults = []
      }
    },
    videoGameQuery(val) {
      if (val && val.length > 2) {
        this.isGamesLoading = true

        this.debouncedGamesResults(val)
      } else if (!val) {
        this.videoGamesResults = []
      }
    },
    bookQuery(val) {
      if (val && val.length > 2) {
        this.isBooksLoading = true

        this.debouncedBooksResults(val)
      } else if (!val) {
        this.booksResults = []
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
          this.moviesResults = res.Search
        }

        this.isMoviesLoading = false
      } catch (error) {
        throw new Error(error)
      }
    },
    500),
    debouncedGamesResults: debounce(async function debouncedGamesResults(
      query
    ) {
      try {
        const res = await this.$axios.$get(`/api/games?q=${query}`)

        this.videoGamesResults = res

        this.isGamesLoading = false
      } catch (error) {
        throw new Error(error)
      }
    }),
    debouncedBooksResults: debounce(async function debouncedBooksResults(
      query
    ) {
      try {
        const res = await this.$axios.$get(`/api/books?q=${query}`)

        this.booksResults = res.GoodreadsResponse.search.results.work

        this.isBooksLoading = false
      } catch (error) {
        throw new Error(error)
      }
    })
  }
}
</script>

<style>
</style>
