<template>
  <div>
    <HeaderComponent />
    <CardComponent />
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue'
import HeaderComponent from './HeaderComponent.vue'

export default {
  components: { CardComponent, HeaderComponent },
  name: 'DashboardComponent'
}
</script>

<style scoped></style>
