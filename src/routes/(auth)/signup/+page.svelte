<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  let fullName = $state('');
  let email = $state('');
  let password = $state('');
  let loading = $state(false);
</script>

<svelte:head>
  <title>Sign up - MusikkTM</title>
</svelte:head>

<div class="min-h-dvh flex items-center justify-center bg-base-200 px-4">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold mb-4">Create account</h2>

      {#if form?.error}
        <div class="alert alert-error mb-4" role="alert">
          <span>{form.error}</span>
        </div>
      {/if}

      {#if form?.success}
        <div class="alert alert-success mb-4" role="status">
          <span>{form.success}</span>
        </div>
      {/if}

      <form method="POST" use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          loading = false;
          await update();
        };
      }}>
        <div class="form-control mb-4">
          <label class="label" for="fullName">
            <span class="label-text">Full name</span>
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            bind:value={fullName}
            placeholder="John Doe"
            class="input input-bordered w-full text-base sm:text-sm"
            autocomplete="name"
            required
          />
        </div>

        <div class="form-control mb-4">
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

        <div class="form-control mb-2">
          <label class="label" for="password">
            <span class="label-text">Password</span>
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
          Sign up
        </button>
      </form>

      <div class="divider">or</div>

      <p class="text-center text-sm">
        Already have an account?
        <a href="/login" class="link link-primary">Log in</a>
      </p>
    </div>
  </div>
</div>
