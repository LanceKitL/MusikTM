<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';

  let { form, data }: { form: ActionData; data: PageData } = $props();

  let loading = $state(false);
</script>

<svelte:head>
  <title>Check your email - MusikkTM</title>
</svelte:head>

<div class="min-h-dvh flex items-center justify-center bg-base-200 px-4">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body text-center">
      <i class="fas fa-envelope-open-text text-5xl text-primary mb-4" aria-hidden="true"></i>

      <h2 class="card-title text-2xl font-bold justify-center mb-2">Check your email</h2>

      <p class="text-sm text-base-content/70 mb-4">
        We sent a confirmation link to
        <strong>{data.email}</strong>.
        Click the link in the email to verify your account.
      </p>

      <p class="text-xs text-base-content/50 mb-6">
        Didn't receive the email? Check your spam folder, or click below to resend.
      </p>

      {#if form?.error}
        <div class="alert alert-error mb-4" role="alert">
          <span>{form.error}</span>
        </div>
      {/if}

      {#if form?.success}
        <div class="alert alert-success mb-4" role="status">
          <span>New confirmation email sent. Check your inbox.</span>
        </div>
      {:else}
        <form method="POST" use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update();
          };
        }}>
          <input type="hidden" name="email" value={data.email} />
          <button
            type="submit"
            class="btn btn-outline btn-primary w-full mb-4 transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]"
            disabled={loading}
            aria-busy={loading || undefined}
          >
            {#if loading}
              <span class="loading loading-spinner loading-sm" aria-hidden="true"></span>
            {/if}
            Resend email
          </button>
        </form>
      {/if}

      <div class="divider">or</div>

      <a href="/login" class="btn btn-ghost">
        Back to log in
      </a>
    </div>
  </div>
</div>
