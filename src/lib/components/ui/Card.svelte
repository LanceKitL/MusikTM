<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    bordered?: boolean;
    compact?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    title = '',
    bordered = true,
    compact = false,
    class: className = '',
    children
  }: Props = $props();
</script>

<div class="card {className}" class:bordered={bordered} class:compact>
  {#if title}
    <div class="card-title">{title}</div>
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
