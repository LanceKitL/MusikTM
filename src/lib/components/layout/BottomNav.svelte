<script lang="ts">
  import { page } from '$app/stores';

  interface NavLink {
    href: string;
    label: string;
    icon: string;
    iconActive?: string;
  }

  interface Props {
    links: NavLink[];
  }

  let { links }: Props = $props();

  $effect(() => {
    $page.url.pathname;
  });
</script>

<nav class="bottom-nav" aria-label="Bottom navigation">
  <ul class="flex items-center justify-around h-full">
    {#each links as link}
      <li class="flex-1">
        <a
          href={link.href}
          class="flex flex-col items-center justify-center gap-0.5 h-full py-2"
          class:active={$page.url.pathname.startsWith(link.href)}
          aria-current={$page.url.pathname.startsWith(link.href) ? 'page' : undefined}
        >
          <i
            class="{$page.url.pathname.startsWith(link.href) && link.iconActive ? link.iconActive : link.icon} text-xl"
            aria-hidden="true"
          ></i>
          <span class="text-[10px] leading-tight">{link.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 40;
    height: 64px;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background-color: oklch(var(--b2));
    border-top: 1px solid oklch(var(--b3));
  }

  .bottom-nav a {
    color: oklch(var(--bc) / 0.6);
    transition-property: color;
    transition-duration: 150ms;
    transition-timing-function: ease-out;
  }

  .bottom-nav a:hover {
    color: oklch(var(--bc));
  }

  .bottom-nav a.active {
    color: oklch(var(--p));
  }
</style>
