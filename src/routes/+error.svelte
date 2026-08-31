<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="min-h-dvh flex items-center justify-center bg-base-200 px-4">
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Something went wrong</h1>
    <p class="text-base-content/70 mb-6">
      {$page.error?.message || 'An unexpected error occurred.'}
    </p>
    <a href="/" class="btn btn-primary transition-transform duration-150 ease-out active:scale-[0.96]">
      Go home
    </a>
  </div>
</div>
