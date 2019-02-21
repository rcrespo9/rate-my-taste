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
      <v-combobox
        v-model="selectedMovies"
        :items="moviesResults"
        :loading="isLoading"
        :search-input.sync="movieQuery"
        hide-no-data
        hide-selected
        label="Favorite Movies"
        placeholder="Start typing to search movies..."
        prepend-icon="local_movies"
        return-object
      />
      <v-combobox
        v-model="selectedBooks"
        :items="booksResults"
        :loading="isLoading"
        :search-input.sync="bookQuery"
        hide-no-data
        hide-selected
        label="Favorite Books"
        placeholder="Start typing to search books..."
        prepend-icon="library_books"
        return-object
      />
      <v-combobox
        v-model="selectedVideoGames"
        :items="videoGamesResults"
        :loading="isLoading"
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
export default {
  name: 'RateMyTastes',
  data: () => ({
    selectedMovies: [],
    selectedBooks: [],
    selectedVideoGames: [],
    movieQuery: null,
    videoGameQuery: null,
    bookQuery: null,
    moviesResults: [],
    booksResults: [],
    videoGamesResults: [],
    isLoading: false
  })
}
</script>

<style>
</style>
