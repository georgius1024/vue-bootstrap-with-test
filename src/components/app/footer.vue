<template>
  <v-footer absolute app dark>
    <div class="mx-4" v-html="copyright"/>
    <v-spacer></v-spacer>
    <div class="mr-4">{{application}} v{{version}}</div>
 </v-footer>
</template>

<script type="text/babel">
  export default {
    name: 'Footer',
    props: {
      copyright: {
        type: String,
        required: true
      },
      application: {
        type: String,
        required: true
      },
      version: {
        type: String,
        required: true
      }
    }
  }
</script>
