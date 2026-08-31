<script lang="ts">
  import '../app.css';
  import type { LayoutData } from './$types';

  let { data, children } = $props();
</script>

<svelte:head>
  <title>MusikkTM - Worship Team Sync</title>
  <meta name="description" content="Worship team management for schedules, chords, and lyrics" />
</svelte:head>

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:btn focus:btn-primary focus:shadow-lg"
>
  Skip to content
</a>

<div class="min-h-dvh flex flex-col">
  {@render children()}
</div>
