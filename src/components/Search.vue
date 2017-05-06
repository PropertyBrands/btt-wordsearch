<template>
  <div class="keyword-search">
    <form @submit.prevent="update">
      <fieldset>
        <label for="query">Query</label>
        <div class="row main-query">
          <div class="column">
            <input type="text" name="query" v-model="q" @input="updateQuery(q)">
          </div>
          <div class="column column-10">
            <input class="button-primary" type="submit" value="Submit">
          </div>
        </div>
      </fieldset>
    </form>
    <results></results>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce } from 'lodash';
import Results from '@/components/Results';

export default {
  name: 'search',
  components: { Results },
  data() {
    return {
      q: '',
      debug: process.env.NODE_ENV !== 'production',
    };
  },
  computed: mapGetters(['currentQuery']),
  methods: {
    update() {
      this.updateQuery(this.q);
      this.updateResults();
    },
    debounce,
    ...mapActions([
      'updateQuery',
      'updateFilterQuery',
      'removeFilterQuery',
      'updateResults',
    ]),
  },
};
</script>

<style type="scss" scoped>
.main-query {
  justify-content: stretch;
}
</style>
