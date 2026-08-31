<script lang="ts">
</script>

<svelte:head>
  <title>Cifra - MusikkTM</title>
</svelte:head>

<div class="page-container">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold">Cifra</h1>
    <button class="btn btn-primary transition-transform duration-150 ease-out active:scale-[0.96]" disabled>
      <i class="fas fa-plus mr-2" aria-hidden="true"></i>Add song
    </button>
  </div>

  <div class="card bg-base-200 shadow">
    <div class="card-body">
      <p class="text-base-content/60 text-center py-12">
        No songs in your library. Add songs to view chords and lyrics.
      </p>
    </div>
  </div>
</div>
