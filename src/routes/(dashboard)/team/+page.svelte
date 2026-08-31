<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Modal from '$lib/components/ui/Modal.svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  let teamName = $state('');
  let loading = $state(false);
  let copied = $state(false);
  let showDeleteModal = $state(false);
  let deleting = $state(false);

  $effect(() => {
    if (form?.success && form?.team) {
      teamName = '';
    }
    if (form?.success && form?.deleted) {
      goto('/dashboard');
    }
  });

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }

  const team = $derived($page.data.team);
  const profile = $derived($page.data.profile);
  const membership = $derived($page.data.membership);
  const members = $derived($page.data.members);
  const isDirector = $derived(membership?.role === 'director');
</script>

<svelte:head>
  <title>Team - MusikkTM</title>
</svelte:head>

<div class="page-container">
  <h1 class="text-3xl font-bold mb-6" style="text-wrap: balance;">Team</h1>

  {#if team}
    {#if form?.error}
      <div class="alert alert-error mb-4" role="alert">
        <span>{form.error}</span>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <h2 class="card-title text-2xl">{team.name}</h2>

          <div class="divider">Team code</div>

          <div class="flex items-center justify-center gap-4">
            <span class="text-4xl font-mono font-bold tracking-widest text-primary">
              {team.code}
            </span>
            <button
              class="btn btn-sm btn-ghost transition-transform duration-150 ease-out active:scale-[0.96]"
              aria-label={copied ? 'Copied to clipboard' : 'Copy team code'}
              onclick={() => copyCode(team.code)}
            >
              {#if copied}
                <i class="fas fa-check text-success" aria-hidden="true"></i>
              {:else}
                <i class="fas fa-copy" aria-hidden="true"></i>
              {/if}
            </button>
          </div>

          <p class="text-center text-sm text-base-content/60 mt-2">
            Share this code with your team members so they can join.
          </p>

          {#if isDirector}
            <div class="divider"></div>
            <button
              class="btn btn-error btn-outline btn-sm transition-transform duration-150 ease-out active:scale-[0.96]"
              onclick={() => { showDeleteModal = true; }}
            >
              <i class="fas fa-trash mr-2" aria-hidden="true"></i>Delete team
            </button>
          {/if}
        </div>
      </div>

      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <h2 class="card-title">Members ({members.length})</h2>

          {#if members.length === 0}
            <p class="text-base-content/60">No members yet.</p>
          {:else}
            <ul class="space-y-2">
              {#each members as member}
                <li class="flex items-center justify-between p-2 rounded bg-base-300">
                  <div class="flex items-center gap-2">
                    <span>{member.full_name}</span>
                    {#if member.role === 'director'}
                      <span class="badge badge-primary badge-sm">Director</span>
                    {/if}
                  </div>
                  <div class="flex gap-1">
                    {#if member.instruments && member.instruments.length > 0}
                      {#each member.instruments as instrument}
                        <span class="badge badge-sm">{instrument}</span>
                      {/each}
                    {:else}
                      <span class="text-xs text-base-content/40">No instruments</span>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <h2 class="card-title">
            <i class="fas fa-plus-circle mr-2" aria-hidden="true"></i>Create team
          </h2>
          <p class="text-base-content/60">Start a new team as director.</p>

          {#if form?.error}
            <div class="alert alert-error" role="alert">
              <span>{form.error}</span>
            </div>
          {/if}

          <form
            method="POST"
            action="?/create"
            use:enhance={() => {
              loading = true;
              return async ({ update }) => {
                loading = false;
                await update();
              };
            }}
          >
            <div class="form-control mb-4">
              <label class="label" for="teamName">
                <span class="label-text">Team name</span>
              </label>
              <input
                type="text"
                name="teamName"
                id="teamName"
                bind:value={teamName}
                placeholder="e.g., Worship Team Alpha"
                class="input input-bordered w-full text-base sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              class="btn btn-secondary w-full transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]"
              disabled={loading}
              aria-busy={loading || undefined}
            >
              {#if loading}
                <span class="loading loading-spinner loading-sm" aria-hidden="true"></span>
              {/if}
              Create team
            </button>
          </form>
        </div>
      </div>

      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <h2 class="card-title">
            <i class="fas fa-sign-in-alt mr-2" aria-hidden="true"></i>Join team
          </h2>
          <p class="text-base-content/60">Join an existing team with a code.</p>

          <form method="POST" action="?/join">
            <div class="form-control mb-4">
              <label class="label" for="joinCode">
                <span class="label-text">Team code</span>
              </label>
              <input
                type="text"
                name="joinCode"
                id="joinCode"
                placeholder="Enter 6-character code"
                class="input input-bordered w-full uppercase text-base sm:text-sm"
                maxlength="6"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full transition-transform duration-150 ease-out active:scale-[0.96]"
              disabled
            >
              Join team
            </button>
          </form>
        </div>
      </div>
    </div>
  {/if}
</div>

<Modal bind:open={showDeleteModal} title="Delete team" size="sm">
  <p class="text-base-content/80">
    Are you sure you want to delete <strong>{team?.name}</strong>?
  </p>
  <p class="text-error text-sm mt-2">
    This action cannot be undone. All members will be removed.
  </p>

  {#snippet actions()}
    <button
      class="btn btn-ghost transition-transform duration-150 ease-out active:scale-[0.96]"
      onclick={() => { showDeleteModal = false; }}
    >
      Cancel
    </button>
    <form method="POST" action="?/delete" use:enhance={() => {
      deleting = true;
      return async ({ update }) => {
        deleting = false;
        showDeleteModal = false;
        await update();
      };
    }}>
      <button
        type="submit"
        class="btn btn-error transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]"
        disabled={deleting}
        aria-busy={deleting || undefined}
      >
        {#if deleting}
          <span class="loading loading-spinner loading-sm" aria-hidden="true"></span>
        {/if}
        Delete team
      </button>
    </form>
  {/snippet}
</Modal>
