<template>
  <div>
    <h1>Reports</h1>
  </div>
</template>

<script>
  export default {
    middleware: 'isAdmin',
    layout: 'admin',
  }
</script>