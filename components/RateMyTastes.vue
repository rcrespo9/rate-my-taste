<template>
  <v-card class="elevation-12">
    <v-toolbar 
      dark 
      color="primary"
    >
      <v-toolbar-title>Rate My Tastes</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-autocomplete
        :items="moviesResults"
        :loading="isLoading"
        :search-input.sync="movieQuery"
        hide-no-data
        hide-selected
        label="Favorite Movies"
        placeholder="Start typing to search movies..."
        prepend-icon="mdi-filmstrip"
        return-object
      />
      <v-autocomplete
        :items="booksResults"
        :loading="isLoading"
        :search-input.sync="bookQuery"
        hide-no-data
        hide-selected
        label="Favorite Books"
        placeholder="Start typing to search books..."
        prepend-icon="mdi-book-multiple"
        return-object
      />
      <v-autocomplete
        :items="videoGamesResults"
        :loading="isLoading"
        :search-input.sync="videoGameQuery"
        hide-no-data
        hide-selected
        label="Favorite Video Games"
        placeholder="Start typing to search video games..."
        prepend-icon="mdi-gamepad-variant"
        return-object
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'RateMyTastes',
  data: () => ({
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
