<script lang="ts">
  interface Props {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    required?: boolean;
    autocomplete?: string;
    class?: string;
    oninput?: (value: string) => void;
  }

  let {
    type = 'text',
    name = '',
    id = '',
    placeholder = '',
    value = $bindable(''),
    label = '',
    error = '',
    hint = '',
    disabled = false,
    required = false,
    autocomplete,
    class: className = '',
    oninput
  }: Props = $props();

  const inputId = $derived(id || name);
  const errorId = $derived(error ? `${inputId}-error` : undefined);
  const hintId = $derived(hint ? `${inputId}-hint` : undefined);
  const describedBy = $derived([errorId, hintId].filter(Boolean).join(' ') || undefined);

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    oninput?.(value);
  }
</script>

<div class="form-control {className}">
  {#if label}
    <label class="label" for={inputId}>
      <span class="label-text">{label}</span>
      {#if required}
        <span class="text-error">*</span>
      {/if}
    </label>
  {/if}

  <input
    {type}
    {name}
    id={inputId}
    {placeholder}
    bind:value
    {disabled}
    {required}
    {autocomplete}
    aria-invalid={!!error || undefined}
    aria-describedby={describedBy}
    class="input input-bordered w-full text-base sm:text-sm"
    class:input-error={!!error}
    oninput={handleInput}
  />

  {#if hint && !error}
    <label class="label" for={inputId}>
      <span class="label-text-alt text-base-content/60">{hint}</span>
    </label>
  {/if}

  {#if error}
    <label class="label" for={inputId}>
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {/if}
</div>
