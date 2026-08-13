<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <p v-if="description" class="assignment-description">{{ description }}</p>
    <hr />
    <slot></slot>
  </div>
</template>

<style scoped>
.assignment-description {
  margin: -4px 0 16px 0;
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
}
</style>
