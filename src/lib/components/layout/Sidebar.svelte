<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

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
    // Track current path for active state
    $page.url.pathname;
  });
</script>

<aside class="bg-base-200 min-h-screen transition-all" class:w-64={!collapsed} class:w-16={collapsed}>
  <nav class="flex flex-col h-full">
    <div class="p-4">
      {#if !collapsed}
        <span class="text-xl font-bold">MusikkTM</span>
      {:else}
        <span class="text-xl font-bold">M</span>
      {/if}
    </div>

    <ul class="menu flex-1">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="flex items-center gap-3"
            class:active={$page.url.pathname.startsWith(link.href)}
          >
            <i class="{link.icon}"></i>
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
