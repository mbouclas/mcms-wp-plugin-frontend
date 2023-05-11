<script lang="ts">
    import {store} from "./store";

    export let url, client, key;
    let activeTab = 'builder';
    import Layout from './layouts/layout.svelte'
    import Builder from './components/builder.component.svelte';
    import History from './components/history.component.svelte';
    import Settings from './components/settings.component.svelte';
    import {BuilderService} from "./services/builder.service";
    BuilderService.client = client;
    BuilderService.url = url;
    BuilderService.key = key;

    store.update(() => ({client, url, key}));

    $: isActive = (tab) => {
        return activeTab === tab;
    }

    function setTab(tab) {
        activeTab = tab;
    }

    $: getClasses = (tab) => {
        return tab === activeTab ?
            'border-indigo-500 text-indigo-600 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
    }

</script>

<Layout>
        <div class="hidden sm:block">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                    <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                    <button type="button" on:click={setTab.bind(this,'builder')} class={getClasses('builder')}>Build</button>
                    <button type="button" on:click={setTab.bind(this,'history')} class={getClasses('history')}>History</button>
                    <button type="button" on:click={setTab.bind(this,'settings')} class={getClasses('settings')}>Settings</button>
                </nav>
            </div>
        </div>

    <div id="builder-tab" class={isActive('builder') ? '' : 'hidden'}>
        <Builder />
    </div>
    <div id="history-tab" class={isActive('history') ? '' : 'hidden'}>
        <History />
    </div>
    <div id="settings-tab" class={isActive('settings') ? '' : 'hidden'}>
    <Settings />
    </div>

</Layout>

