<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  let teamName = $state('');
  let loading = $state(false);
  let copied = $state(false);

  $effect(() => {
    if (form?.success && form?.team) {
      teamName = '';
    }
  });

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }

  const team = $derived($page.data.team);
  const profile = $derived($page.data.profile);
  const members = $derived($page.data.members);
</script>

<svelte:head>
  <title>Team - MusikkTM</title>
</svelte:head>

<div class="page-container">
  <h1 class="text-3xl font-bold mb-6">Team</h1>

  {#if team}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <h2 class="card-title text-2xl">{team.name}</h2>

          <div class="divider">Team Code</div>

          <div class="flex items-center justify-center gap-4">
            <span class="text-4xl font-mono font-bold tracking-widest text-primary">
              {team.code}
            </span>
            <button
              class="btn btn-sm btn-ghost"
              onclick={() => copyCode(team.code)}
            >
              {#if copied}
                <i class="fas fa-check text-success"></i>
              {:else}
                <i class="fas fa-copy"></i>
              {/if}
            </button>
          </div>

          <p class="text-center text-sm text-base-content/60 mt-2">
            Share this code with your team members so they can join.
          </p>
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
                    {#if member.instruments.length > 0}
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
            <i class="fas fa-plus-circle mr-2"></i>Create Team
          </h2>
          <p class="text-base-content/60">Start a new team as director.</p>

          {#if form?.error}
            <div class="alert alert-error">
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
                <span class="label-text">Team Name</span>
              </label>
              <input
                type="text"
                name="teamName"
                id="teamName"
                bind:value={teamName}
                placeholder="e.g., Worship Team Alpha"
                class="input input-bordered w-full"
                required
              />
            </div>

            <button type="submit" class="btn btn-secondary w-full" disabled={loading}>
              {#if loading}
                <span class="loading loading-spinner loading-sm"></span>
              {/if}
              Create Team
            </button>
          </form>
        </div>
      </div>

      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <h2 class="card-title">
            <i class="fas fa-sign-in-alt mr-2"></i>Join Team
          </h2>
          <p class="text-base-content/60">Join an existing team with a code.</p>

          <div class="form-control mb-4">
            <label class="label" for="joinCode">
              <span class="label-text">Team Code</span>
            </label>
            <input
              type="text"
              name="joinCode"
              id="joinCode"
              placeholder="Enter 6-character code"
              class="input input-bordered w-full uppercase"
              maxlength="6"
            />
          </div>

          <button class="btn btn-primary w-full" disabled>
            Join Team
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
