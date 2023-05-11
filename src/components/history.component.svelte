<script lang="ts">
    import {buildDone, store} from "../store";
import {BuilderService} from "../services/builder.service";
import Loading from '../components/loading-animation.component.svelte';
import Modal from '../components/modal.component.svelte';
let config, service, list = [], loading = false, stacktrace = null;
    service = new BuilderService();
loading = true;
service.getHistory().then(res => {
    list = res;
    loading = false;
});

buildDone.subscribe(status => {
    if (!status) {return;}
    loading = true;
    service.getHistory().then(res => {
        list = res;
        loading = false;
    });
});

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function formatStatus(item) {
    if (!item.failedReason) {
        return 'Success';
    }

    return 'Failed: ' + item.failedReason;
}

function showStackTrace(item) {
stacktrace = item.stacktrace;
}
</script>
{#if stacktrace}
<Modal bind:open={stacktrace}>
    <span slot="header">Stacktrace</span>
    {stacktrace}
</Modal>
    {/if}

<div class="sm:flex-auto mt-6">
    <h1 class="text-base font-semibold leading-6 text-indigo-600">{list.length} Builds</h1>
    <p class="mt-2 text-sm text-gray-700">This is a list of all the builds manually triggered</p>
</div>
<div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
            {#if loading}
            <Loading />
            {/if}
            <table class="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Started At</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Processed At</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Failure Reason</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                {#each list as item}
                <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{formatDate(item.timestamp)}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(item.processedOn)}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm"
                        class:failed={item.failedReason}
                        class:success={!item.failedReason}>{formatStatus(item)}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {#if item.failedReason}
                        <a href="#" on:click={showStackTrace(item)} class="text-indigo-600 hover:text-indigo-900">View Reason</a>
                        {/if}
                    </td>

                </tr>
                    {/each}

                </tbody>
            </table>
        </div>
    </div>
</div>


<style>
    .success {
        @apply text-green-600;
    }

    .failed {
        @apply text-red-600;
    }


</style>
