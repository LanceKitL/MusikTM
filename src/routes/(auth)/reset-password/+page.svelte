<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  let password = $state('');
  let loading = $state(false);
</script>

<svelte:head>
  <title>Reset password - MusikkTM</title>
</svelte:head>

<div class="min-h-dvh flex items-center justify-center bg-base-200 px-4">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold mb-2">Set new password</h2>
      <p class="text-sm text-base-content/70 mb-4">
        Enter your new password below.
      </p>

      {#if form?.error}
        <div class="alert alert-error mb-4" role="alert">
          <span>{form.error}</span>
        </div>
      {/if}

      <form method="POST" use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          loading = false;
          await update();
        };
      }}>
        <div class="form-control mb-2">
          <label class="label" for="password">
            <span class="label-text">New password</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            bind:value={password}
            placeholder="At least 8 characters"
            class="input input-bordered w-full text-base sm:text-sm"
            autocomplete="new-password"
            minlength="8"
            required
          />
        </div>

        <p class="text-xs text-base-content/60 mb-6" id="password-hint">
          Must be at least 8 characters
        </p>

        <button
          type="submit"
          class="btn btn-primary w-full transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]"
          disabled={loading}
          aria-busy={loading || undefined}
        >
          {#if loading}
            <span class="loading loading-spinner loading-sm" aria-hidden="true"></span>
          {/if}
          Reset password
        </button>
      </form>

      <div class="divider">or</div>

      <p class="text-center text-sm">
        <a href="/login" class="link link-primary">Back to log in</a>
      </p>
    </div>
  </div>
</div>
