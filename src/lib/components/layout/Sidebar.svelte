<script lang="ts">
  import { page } from '$app/stores';

  interface NavLink {
    href: string;
    label: string;
    icon: string;
  }

  interface Props {
    links: NavLink[];
  }

  let { links }: Props = $props();

  $effect(() => {
    $page.url.pathname;
  });
</script>

<aside
  class="bg-base-200 w-64 min-h-screen border-r border-base-300"
  aria-label="Main navigation"
>
  <nav aria-label="Sidebar navigation">
    <div class="p-4">
      <span class="text-xl font-bold">MusikkTM</span>
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
            <span>{link.label}</span>
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
