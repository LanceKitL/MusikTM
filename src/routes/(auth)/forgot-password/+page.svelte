<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  let email = $state('');
  let loading = $state(false);
</script>

<svelte:head>
  <title>Forgot password - MusikkTM</title>
</svelte:head>

<div class="min-h-dvh flex items-center justify-center bg-base-200 px-4">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold mb-2">Forgot password?</h2>
      <p class="text-sm text-base-content/70 mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {#if form?.error}
        <div class="alert alert-error mb-4" role="alert">
          <span>{form.error}</span>
        </div>
      {/if}

      {#if form?.success}
        <div class="text-center py-8">
          <i class="fas fa-envelope-open-text text-5xl text-primary mb-4" aria-hidden="true"></i>
          <h3 class="text-lg font-semibold mb-2">Check your email</h3>
          <p class="text-sm text-base-content/70 mb-6">
            We sent a password reset link to <strong>{email}</strong>.
            Check your inbox and click the link to set a new password.
          </p>
          <a href="/login" class="btn btn-primary">
            Back to log in
          </a>
        </div>
      {:else}
        <form method="POST" use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update();
          };
        }}>
          <div class="form-control mb-6">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              bind:value={email}
              placeholder="you@example.com"
              class="input input-bordered w-full text-base sm:text-sm"
              autocomplete="email"
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]"
            disabled={loading}
            aria-busy={loading || undefined}
          >
            {#if loading}
              <span class="loading loading-spinner loading-sm" aria-hidden="true"></span>
            {/if}
            Send reset link
          </button>
        </form>

        <div class="divider">or</div>

        <p class="text-center text-sm">
          Remember your password?
          <a href="/login" class="link link-primary">Log in</a>
        </p>
      {/if}
    </div>
  </div>
</div>
