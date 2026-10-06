<template>
  <div class="ag-grid-wrapper">
    <AgGridVue
      :rowData="products"
      :columnDefs="columnDefs"
      rowSelection="multiple"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      domLayout="autoHeight"
      class="ag-theme-alpine"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import type { ColDef } from 'ag-grid-community'
import type { Product } from '@/types/Products'

const props = defineProps<{ products: Product[] }>()

const columnDefs: ColDef[] = [
  { headerName: 'Title', field: 'title', sortable: true, filter: true, flex: 2 },
  { headerName: 'Category', field: 'category', sortable: true, filter: true, flex: 1 },
  { headerName: 'Price', field: 'price', sortable: true, filter: true, flex: 1 },
  { headerName: 'Rating', field: 'rating', sortable: true, filter: true, flex: 1 },
  { headerName: 'Stock', field: 'stock', sortable: true, filter: true, flex: 1 },
]
</script>

<style scoped>
@import 'ag-grid-community/styles/ag-grid.css';
@import 'ag-grid-community/styles/ag-theme-alpine.css';

.ag-grid-wrapper {
  width: 100%;
  margin-top: 1rem;
}

:deep(.ag-root-wrapper) {
  border-radius: 10px;
}
</style>
