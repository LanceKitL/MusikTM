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

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && closable) {
      handleClose();
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="modal modal-open"
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    <div class="modal-backdrop" onclick={closable ? handleClose : undefined}></div>

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
      {:else if closable}
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={handleClose}>
            <i class="fas fa-times"></i>
          </button>
        </form>
      {/if}
    </div>
  </div>
{/if}
