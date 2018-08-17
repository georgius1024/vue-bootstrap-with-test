<template>
    <transition name="fade">
        <div v-show="loading" class="loading-spinner-control">
            <div class="loading-spinner-control-interior"></div>
            <v-progress-circular
                indeterminate 
                :size="100"
                :width="8"
                class="v-spinner primary--text">
            </v-progress-circular>
        </div>
    </transition>
</template>
<style>
    .loading-spinner-control {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        z-index: 7001;
    }
    .loading-spinner-control .loading-spinner-control-interior {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        opacity: 0.3;
        background-color: #666;
        cursor: progress;
        z-index: 7002;
    }
    .loading-spinner-control .v-spinner {
        position: fixed;
        left: 50%;
        top: 50%;
        margin-top: -50px;
        margin-left: -50px;
        z-index: 7003;
    }
</style>
<script type="text/babel">
export default {
  name: 'LoadingSpinner',
  props: {
    loading: {
      default: false
    }
  }
}
</script>