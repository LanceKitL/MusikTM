<script lang="ts">
  import { page } from '$app/stores';

  interface NavLink {
    href: string;
    label: string;
    icon: string;
  }

  interface Props {
    links: NavLink[];
    collapsed?: boolean;
  }

  let { links, collapsed = false }: Props = $props();

  $effect(() => {
    $page.url.pathname;
  });
</script>

<aside
  class="bg-base-200 min-h-screen transition-[width] duration-200 ease-out"
  class:w-64={!collapsed}
  class:w-16={collapsed}
  aria-label="Main navigation"
>
  <nav aria-label="Sidebar navigation">
    <div class="p-4">
      {#if !collapsed}
        <span class="text-xl font-bold">MusikkTM</span>
      {:else}
        <span class="text-xl font-bold" title="MusikkTM">M</span>
      {/if}
    </div>

    <ul class="menu flex-1">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="flex items-center gap-3"
            class:active={$page.url.pathname.startsWith(link.href)}
            aria-current={$page.url.pathname.startsWith(link.href) ? 'page' : undefined}
          >
            <i class="{link.icon}" aria-hidden="true"></i>
            {#if !collapsed}
              <span>{link.label}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  .menu li a.active {
    background-color: oklch(var(--p));
    color: oklch(var(--pc));
  }
</style>
