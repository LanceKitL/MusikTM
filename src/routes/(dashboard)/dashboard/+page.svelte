<script lang="ts">
</script>

<svelte:head>
  <title>Dashboard - MusikkTM</title>
</svelte:head>

<div class="page-container">
  <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="stat bg-base-200 rounded-box shadow">
      <div class="stat-title">Next Schedule</div>
      <div class="stat-value text-primary">--</div>
      <div class="stat-desc">No upcoming schedules</div>
    </div>

    <div class="stat bg-base-200 rounded-box shadow">
      <div class="stat-title">Team Members</div>
      <div class="stat-value text-secondary">--</div>
      <div class="stat-desc">Join a team to get started</div>
    </div>

    <div class="stat bg-base-200 rounded-box shadow">
      <div class="stat-title">Songs</div>
      <div class="stat-value text-accent">--</div>
      <div class="stat-desc">No songs added yet</div>
    </div>

    <div class="stat bg-base-200 rounded-box shadow">
      <div class="stat-title">Availability</div>
      <div class="stat-value text-success">--</div>
      <div class="stat-desc">Tag your availability</div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="card bg-base-200 shadow">
      <div class="card-body">
        <h2 class="card-title">Recent Announcements</h2>
        <p class="text-base-content/60">No announcements yet.</p>
      </div>
    </div>

    <div class="card bg-base-200 shadow">
      <div class="card-body">
        <h2 class="card-title">Upcoming Lineup</h2>
        <p class="text-base-content/60">No songs in lineup.</p>
      </div>
    </div>
  </div>
</div>
