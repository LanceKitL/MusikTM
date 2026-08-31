<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  interface Props {
    onMenuClick?: () => void;
  }

  let { onMenuClick }: Props = $props();
</script>

<header class="navbar bg-base-200 sticky top-0 z-50 border-b border-base-300">
  <div class="navbar-start">
    <button class="btn btn-ghost btn-sm lg:hidden" onclick={onMenuClick} aria-label="Toggle menu">
      <i class="fas fa-bars"></i>
    </button>
    <a href="/" class="btn btn-ghost text-xl font-bold">MusikkTM</a>
  </div>

  <div class="navbar-end">
    {#if $page.data.session}
      <div class="dropdown dropdown-end">
        <button tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            {#if $page.data.profile?.avatar_url}
              <img src={$page.data.profile.avatar_url} alt={$page.data.profile.full_name} />
            {:else}
              <i class="fas fa-user text-lg"></i>
            {/if}
          </div>
        </button>
        <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
          <li class="menu-title">
            <span>{$page.data.profile?.full_name || 'User'}</span>
          </li>
          <li><a href="/dashboard"><i class="fas fa-home mr-2"></i>Dashboard</a></li>
          <li><a href="/team"><i class="fas fa-users mr-2"></i>Team</a></li>
          <li><a href="/settings"><i class="fas fa-cog mr-2"></i>Settings</a></li>
          <li>
            <form method="POST" action="/auth/signout">
              <button type="submit">
                <i class="fas fa-sign-out-alt mr-2"></i>Sign Out
              </button>
            </form>
          </li>
        </ul>
      </div>
    {:else}
      <a href="/login" class="btn btn-primary btn-sm">Login</a>
    {/if}
  </div>
</header>
