<script setup lang="ts">

</script>

<template>
  <div class="flex flex-column align-items-center w-full">
    <h1>Type List</h1>
    <div class="p-1 md:p-4 border-1 border-round surface-section surface-border w-full">
      <PrimeDataTable
          v-if="articles"
          v-model:rows='count'
          :value="articles!.data"
          table-style="width: 100%;"
          scroll-height="40vh"
          lazy
          paginator
          scrollable
          :total-records="articles!.totalCount"
          :rows-per-page-options="[5, 10, 20, 50]"
          @page="(event: DataTablePageEvent) => load(event)"
      >
        <PrimeColumn field="id" header="ID"></PrimeColumn>
        <PrimeColumn field="articleTitle" header="Title"></PrimeColumn>
      </PrimeDataTable>
    </div>
  </div>
</template>

<style scoped>

</style>