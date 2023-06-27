<template>
  <div>
    <HeaderComponent />
    <CardComponent />
  </div>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'

export default {
  components: { CardComponent, HeaderComponent },
  name: 'DashboardComponent'
}
</script>

<style scoped></style>
