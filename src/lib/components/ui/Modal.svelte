<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
    closable?: boolean;
    onclose?: () => void;
    children: Snippet;
    actions?: Snippet;
  }

  let {
    open = $bindable(false),
    title = '',
    size = 'md',
    closable = true,
    onclose,
    children,
    actions
  }: Props = $props();

  let dialogEl = $state<HTMLDialogElement | null>(null);
  let previousFocus = $state<HTMLElement | null>(null);

  function handleClose() {
    open = false;
    onclose?.();
    previousFocus?.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && closable) {
      handleClose();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget && closable) {
      handleClose();
    }
  }

  $effect(() => {
    if (open) {
      previousFocus = document.activeElement as HTMLElement;
      dialogEl?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialogEl?.close();
      document.body.style.overflow = '';
    }
  });

  $effect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<dialog
  bind:this={dialogEl}
  class="modal"
  onkeydown={handleKeydown}
  aria-label={title || undefined}
  style="overscroll-behavior: contain;"
>
  <div class="modal-backdrop" aria-hidden="true" onclick={closable ? handleClose : undefined}></div>

  <div class="modal-box" class:max-w-sm={size === 'sm'} class:max-w-4xl={size === 'lg'}>
    {#if title}
      <h3 class="font-bold text-lg">{title}</h3>
    {/if}

    <div class="py-4">
      {@render children()}
    </div>

    {#if actions}
      <div class="modal-action">
        {@render actions()}
      </div>
    {/if}

    {#if closable}
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close" onclick={handleClose}>
          <i class="fas fa-times"></i>
        </button>
      </form>
    {/if}
  </div>
</dialog>

<style>
  dialog::backdrop {
    background-color: oklch(0 0 0 / 0.6);
  }
</style>
