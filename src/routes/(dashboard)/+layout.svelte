<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import BottomNav from '$lib/components/layout/BottomNav.svelte';

  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: 'fas fa-home', iconActive: 'fas fa-home' },
    { href: '/schedule', label: 'Schedule', icon: 'fas fa-calendar-alt', iconActive: 'fas fa-calendar-alt' },
    { href: '/team', label: 'Team', icon: 'fas fa-users', iconActive: 'fas fa-users' },
    { href: '/cifra', label: 'Cifra', icon: 'fas fa-music', iconActive: 'fas fa-music' },
    { href: '/praisent', label: 'Praisent', icon: 'fas fa-desktop', iconActive: 'fas fa-desktop' }
  ];

  let { children } = $props();
</script>

<div class="min-h-dvh flex flex-col">
  <Navbar />

  <div class="flex flex-1">
    <!-- Sidebar: desktop only -->
    <div class="hidden lg:block">
      <Sidebar links={navLinks} />
    </div>

    <main id="main-content" class="flex-1 p-4 pb-24 lg:p-6 lg:pb-6">
      {@render children()}
    </main>
  </div>
</div>

<!-- Bottom nav: mobile only -->
<div class="lg:hidden">
  <BottomNav links={navLinks} />
</div>
