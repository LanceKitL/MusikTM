<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="text-center py-12">
  <h1 class="text-4xl font-bold mb-4">Error</h1>
  <p class="text-base-content/70 mb-6">
    {$page.error?.message || 'Something went wrong.'}
  </p>
  <a href="/" class="btn btn-primary">Go Home</a>
</div>
