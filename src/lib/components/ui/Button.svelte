<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onclick?: () => void;
    children: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    type = 'button',
    onclick,
    children
  }: Props = $props();

  const variantClasses: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    link: 'btn-link'
  };

  const sizeClasses: Record<string, string> = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };
</script>

<button
  {type}
  {disabled}
  class="btn {variantClasses[variant]} {sizeClasses[size]}"
  class:loading
  {onclick}
>
  {#if loading}
    <span class="loading loading-spinner loading-sm"></span>
  {/if}
  {@render children()}
</button>
