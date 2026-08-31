<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import { uiStore } from '$lib/stores/ui';

  const dashboardLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { href: '/schedule', label: 'Schedule', icon: 'fas fa-calendar-alt' },
    { href: '/team', label: 'Team', icon: 'fas fa-users' },
    { href: '/cifra', label: 'Cifra', icon: 'fas fa-music' },
    { href: '/praisent', label: 'Praisent', icon: 'fas fa-desktop' }
  ];

  let { children } = $props();
</script>

<div class="min-h-dvh flex flex-col">
  <Navbar onMenuClick={() => uiStore.toggleSidebar()} />

  <div class="flex flex-1">
    <Sidebar
      links={dashboardLinks}
      collapsed={!$uiStore.sidebarOpen}
    />

    <main id="main-content" class="flex-1 p-4 lg:p-6">
      {@render children()}
    </main>
  </div>
</div>
