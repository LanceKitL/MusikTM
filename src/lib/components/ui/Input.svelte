<script lang="ts">
  interface Props {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    name?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    class?: string;
    oninput?: (value: string) => void;
  }

  let {
    type = 'text',
    name = '',
    placeholder = '',
    value = $bindable(''),
    label = '',
    error = '',
    disabled = false,
    required = false,
    class: className = '',
    oninput
  }: Props = $props();

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    oninput?.(value);
  }
</script>

<div class="form-control {className}">
  {#if label}
    <label class="label" for={name}>
      <span class="label-text">{label}</span>
      {#if required}
        <span class="text-error">*</span>
      {/if}
    </label>
  {/if}

  <input
    {type}
    {name}
    {placeholder}
    bind:value
    {disabled}
    {required}
    class="input input-bordered w-full"
    class:input-error={!!error}
    oninput={handleInput}
  />

  {#if error}
    <label class="label" for={name}>
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {/if}
</div>
