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
  <title>Sign Up - MusikkTM</title>
</svelte:head>

<div class="min-h-dvh flex items-center justify-center bg-base-200 px-4">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold mb-4">Create Account</h2>

      {#if form?.error}
        <div class="alert alert-error mb-4">
          <span>{form.error}</span>
        </div>
      {/if}

      {#if form?.success}
        <div class="alert alert-success mb-4">
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
            <span class="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            bind:value={fullName}
            placeholder="John Doe"
            class="input input-bordered w-full"
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
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control mb-6">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            bind:value={password}
            placeholder="••••••••"
            class="input input-bordered w-full"
            minlength="8"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-full" disabled={loading}>
          {#if loading}
            <span class="loading loading-spinner loading-sm"></span>
          {/if}
          Sign Up
        </button>
      </form>

      <div class="divider">OR</div>

      <p class="text-center text-sm">
        Already have an account?
        <a href="/login" class="link link-primary">Login</a>
      </p>
    </div>
  </div>
</div>
