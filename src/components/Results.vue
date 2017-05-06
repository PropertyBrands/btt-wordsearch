<template>
  <ul>
    <li v-for="result in getResults">
      <pre>{{ result }}</pre>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'results',
  computed: mapGetters(['getResults']),
};
</script>
