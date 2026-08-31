<script lang="ts">
  import { page } from '$app/stores';

  const data = $derived($page.data);

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }

  const greeting = $derived(getGreeting());
  const firstName = $derived(data.profile?.full_name?.split(' ')[0] || 'there');
</script>

<svelte:head>
  <title>Dashboard - MusikkTM</title>
</svelte:head>

<div class="page-container space-y-6">
  <!-- Greeting -->
  <div>
    <h1 class="text-2xl font-bold" style="text-wrap: balance;">
      {greeting}, {firstName}
    </h1>
    {#if data.team}
      <p class="text-base-content/60 mt-1">{data.team.name}</p>
    {/if}
  </div>

  <!-- Next Service Hero Card -->
  <div class="card bg-base-200 shadow-lg glow-primary">
    <div class="card-body">
      {#if data.nextSchedule}
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-base-content/60 mb-1">Next service</p>
            <h2 class="card-title text-xl">{data.nextSchedule.title}</h2>
            <p class="text-base-content/80 mt-1">{formatDate(data.nextSchedule.date)}</p>
          </div>
          <div class="stat-figure text-primary">
            <i class="fas fa-calendar-check text-3xl opacity-40" aria-hidden="true"></i>
          </div>
        </div>
        <div class="card-actions justify-end mt-4">
          <a href="/schedule" class="btn btn-primary btn-sm transition-transform duration-150 ease-out active:scale-[0.96]">
            View schedule
          </a>
        </div>
      {:else}
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-base-content/60 mb-1">Next service</p>
            <h2 class="card-title text-xl">No upcoming services</h2>
            <p class="text-base-content/60 mt-1">Create a schedule to get started.</p>
          </div>
          <div class="stat-figure text-primary">
            <i class="fas fa-calendar-plus text-3xl opacity-20" aria-hidden="true"></i>
          </div>
        </div>
        <div class="card-actions justify-end mt-4">
          <a href="/schedule" class="btn btn-primary btn-sm transition-transform duration-150 ease-out active:scale-[0.96]">
            Create schedule
          </a>
        </div>
      {/if}
    </div>
  </div>

  <!-- Stats Row -->
  <div class="grid grid-cols-3 gap-3">
    <a href="/team" class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="card-body p-4 items-center text-center">
        <i class="fas fa-users text-xl text-primary mb-1" aria-hidden="true"></i>
        <span class="text-2xl font-mono font-bold">{data.memberCount}</span>
        <span class="text-xs text-base-content/60">Members</span>
      </div>
    </a>

    <a href="/cifra" class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="card-body p-4 items-center text-center">
        <i class="fas fa-music text-xl text-secondary mb-1" aria-hidden="true"></i>
        <span class="text-2xl font-mono font-bold">{data.songCount}</span>
        <span class="text-xs text-base-content/60">Songs</span>
      </div>
    </a>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body p-4 items-center text-center">
        <i class="fas fa-check-circle text-xl text-success mb-1" aria-hidden="true"></i>
        <span class="text-2xl font-mono font-bold">--</span>
        <span class="text-xs text-base-content/60">Ready</span>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div>
    <h2 class="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-3">Quick actions</h2>
    <div class="grid grid-cols-3 gap-3">
      <a href="/cifra" class="card bg-base-200 hover:bg-base-300 transition-colors duration-150 cursor-pointer">
        <div class="card-body p-4 items-center text-center">
          <i class="fas fa-plus text-lg text-primary" aria-hidden="true"></i>
          <span class="text-sm">Add song</span>
        </div>
      </a>

      <a href="/schedule" class="card bg-base-200 hover:bg-base-300 transition-colors duration-150 cursor-pointer">
        <div class="card-body p-4 items-center text-center">
          <i class="fas fa-calendar-plus text-lg text-secondary" aria-hidden="true"></i>
          <span class="text-sm">New schedule</span>
        </div>
      </a>

      <a href="/team" class="card bg-base-200 hover:bg-base-300 transition-colors duration-150 cursor-pointer">
        <div class="card-body p-4 items-center text-center">
          <i class="fas fa-users text-lg text-accent" aria-hidden="true"></i>
          <span class="text-sm">Team</span>
        </div>
      </a>
    </div>
  </div>

  <!-- Announcements -->
  <div class="card bg-base-200 shadow-sm">
    <div class="card-body">
      <h2 class="card-title text-base">
        <i class="fas fa-bullhorn mr-2 text-warning" aria-hidden="true"></i>
        Announcements
      </h2>
      <p class="text-base-content/60 text-sm py-4 text-center">
        No announcements yet.
      </p>
    </div>
  </div>

  <!-- Upcoming Lineup -->
  <div class="card bg-base-200 shadow-sm">
    <div class="card-body">
      <h2 class="card-title text-base">
        <i class="fas fa-list-ol mr-2 text-accent" aria-hidden="true"></i>
        Upcoming lineup
      </h2>
      <p class="text-base-content/60 text-sm py-4 text-center">
        No songs in lineup. Add songs to your library.
      </p>
    </div>
  </div>
</div>
