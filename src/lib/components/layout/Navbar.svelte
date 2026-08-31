<script lang="ts">
  import { page } from '$app/stores';

  interface Props {
    onMenuClick?: () => void;
  }

  let { onMenuClick }: Props = $props();

  let dropdownOpen = $state(false);

  function handleDropdownKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      dropdownOpen = false;
    }
  }
</script>

<header class="navbar bg-base-200 sticky top-0 z-50 border-b border-base-300">
  <div class="navbar-start">
    <button
      class="btn btn-ghost btn-sm lg:hidden"
      onclick={onMenuClick}
      aria-label="Toggle navigation menu"
    >
      <i class="fas fa-bars" aria-hidden="true"></i>
    </button>
    <a href="/" class="btn btn-ghost text-xl font-bold">MusikkTM</a>
  </div>

  <div class="navbar-end">
    {#if $page.data.session}
      <div class="dropdown dropdown-end" class:dropdown-open={dropdownOpen}>
        <button
          tabindex="0"
          aria-label="User menu"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          class="btn btn-ghost btn-circle avatar"
          onclick={() => { dropdownOpen = !dropdownOpen; }}
          onkeydown={handleDropdownKeydown}
        >
          <div class="w-10 rounded-full">
            {#if $page.data.profile?.avatar_url}
              <img
                src={$page.data.profile.avatar_url}
                alt={$page.data.profile?.full_name || 'User avatar'}
              />
            {:else}
              <i class="fas fa-user text-lg" aria-hidden="true"></i>
            {/if}
          </div>
        </button>
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <ul
          role="menu"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          onkeydown={handleDropdownKeydown}
        >
          <li class="menu-title" role="presentation">
            <span>{$page.data.profile?.full_name || 'User'}</span>
          </li>
          <li role="none"><a href="/dashboard" role="menuitem"><i class="fas fa-home mr-2" aria-hidden="true"></i>Dashboard</a></li>
          <li role="none"><a href="/team" role="menuitem"><i class="fas fa-users mr-2" aria-hidden="true"></i>Team</a></li>
          <li role="none"><a href="/settings" role="menuitem"><i class="fas fa-cog mr-2" aria-hidden="true"></i>Settings</a></li>
          <li role="none">
            <form method="POST" action="/auth/signout">
              <button type="submit" role="menuitem">
                <i class="fas fa-sign-out-alt mr-2" aria-hidden="true"></i>Sign out
              </button>
            </form>
          </li>
        </ul>
      </div>
    {:else}
      <a href="/login" class="btn btn-primary btn-sm">Log in</a>
    {/if}
  </div>
</header>
