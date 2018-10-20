<template>
  <v-breadcrumbs>
    <v-breadcrumbs-item
      v-for="item in items"
      :disabled="item.disabled"
      :to="item.to"
      :key="item.text"
      exact
    >
      {{ item.text }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>
<style>
  .breadcrumbs {
    padding: 0px !important;
  }

  @media print
  {
    .breadcrumbs
    {
      display: none !important;
    }
  }
</style>
<script type="text/babel">
  export default {
    name: 'Breadcrumbs',
    props: {
      items: {
        type: Array,
        default: function () {
          return [{
            text: 'Начало',
            disabled: false,
            to: {name: 'root'}
          }]
        }
      }
    }
  }
</script>
