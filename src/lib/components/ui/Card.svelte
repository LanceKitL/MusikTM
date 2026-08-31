<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    headingLevel?: 2 | 3 | 4;
    bordered?: boolean;
    compact?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    title = '',
    headingLevel = 3,
    bordered = true,
    compact = false,
    class: className = '',
    children
  }: Props = $props();
</script>

<div class="card {className}" class:bordered={bordered} class:compact>
  {#if title}
    {#if headingLevel === 2}
      <h2 class="card-title">{title}</h2>
    {:else if headingLevel === 3}
      <h3 class="card-title">{title}</h3>
    {:else}
      <h4 class="card-title">{title}</h4>
    {/if}
  {/if}
  <div class="card-body">
    {@render children()}
  </div>
</div>

<style>
  .card {
    background-color: oklch(var(--b2));
    border-radius: var(--rounded-box);
  }

  .bordered {
    border: 1px solid oklch(var(--b3));
  }

  .compact .card-body {
    padding: 1rem;
  }

  .card-title {
    padding: 1rem 1.5rem 0;
    font-weight: 600;
  }

  .card-body {
    padding: 1.5rem;
  }
</style>
