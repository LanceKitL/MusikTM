<script lang="ts">
  import '../app.css';
  import type { LayoutData } from './$types';

  let { data, children } = $props();
</script>

<svelte:head>
  <title>MusikkTM - Worship Team Sync</title>
  <meta name="description" content="Worship team management for schedules, chords, and lyrics" />
</svelte:head>

<div class="min-h-dvh flex flex-col">
  {@render children()}
</div>
