<script lang="ts">
    import {buildDone, buildProgress, store} from "../store";
    import Alert from '../components/alert.component.svelte';
import {BuilderService} from "../services/builder.service";
import Loading from '../components/loading-animation.component.svelte';

let config, service, latestJob, result = {status: null}, loading = false;
    service = new BuilderService();
store.subscribe(val => {
    config = val;

});

buildProgress.subscribe(job => {
    if (!job.id) {return;}

    latestJob = job;
    console.log(`Job ${latestJob.id}`);
    checkProgress();
});

async function startBuild() {
    try {
        latestJob = await service.build();
        console.log(`Build started with id ${latestJob.id}`);
    } catch (e)
    {
        console.log(`Error: ${e}`);
    }
    loading = true;
}

async function checkProgress() {
    if (!latestJob) {
        console.error("No job started");
        return;
    }

   result = await service.getProgress(latestJob.id);
   if (!result.status) {
       console.error(result.error);
       return;
   }

    if (result.status === "completed") {
        console.log('Job Done');
        buildDone.set(true);
        loading = false;
        return;
    }

    if (result.status === "failed") {
        console.error('Job Failed');
        buildDone.set(true);
        loading = false;
        return;
    }

    setTimeout(() => checkProgress(), 1000);
}
</script>
<div class="px-4 sm:px-0 mb-4">
    <h3 class="text-base font-semibold leading-7 text-gray-900">Start a build</h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">After you click the start button, the application build process will commence</p>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">You will be notified here once the process is complete</p>
</div>



{#if loading}
    <div class="mb-4">
        <Loading/>
    </div>
{/if}


<div class="mt-6 mb-6">
    {#if result.status === 'failed'}
        <Alert type="error">
            <span slot="header">Build Failed</span>
            Try again later or contact support
        </Alert>
    {/if}

    {#if result.status === 'completed'}
        <Alert type="success">
            <span slot="header">Build complete</span>
            you can find this build in history
        </Alert>
    {/if}

    {#if result.status === 'active'}
        <Alert type="info">
            <span slot="header">Build is under way</span>
            This might take a minute
        </Alert>
    {/if}
</div>



<button disabled={result.status === 'active'} type="button"
        class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        on:click={startBuild}>Start Build</button>
