<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
    onclick?: () => void;
    children: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    type = 'button',
    ariaLabel,
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
  disabled={disabled || loading}
  aria-label={ariaLabel}
  aria-busy={loading || undefined}
  class="btn {variantClasses[variant]} {sizeClasses[size]} transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]"
  class:loading
  {onclick}
>
  {#if loading}
    <span class="loading loading-spinner loading-sm" aria-hidden="true"></span>
  {/if}
  {@render children()}
</button>
