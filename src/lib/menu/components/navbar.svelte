<script>
	import Logo from "$lib/menu/components/logo.svelte";
	import Hamburger from "$lib/menu/components/hamburger.svelte";
	import Topbar from "./topbar.svelte";

	export let sidebar = false;
</script>

<header class="flex justify-between p-2 items-center">
	<nav class="flex">
		<Hamburger bind:open={sidebar} />
		<Logo />
		<noscript>
			<Topbar />
		</noscript>
	</nav>
</header>
