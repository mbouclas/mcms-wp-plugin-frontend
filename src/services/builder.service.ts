import {buildProgress} from "../store";

export class BuilderService {
    public static client;
    public static url;
    public static key;

    constructor() {

    }
    async build() {
        const res$ = await fetch(`${BuilderService.url}/api/run/${BuilderService.client}`, {
            headers: {
                'x-api-key': BuilderService.key,
                'x-client-id': BuilderService.client,
            }
        });
        const res = await res$.json();
        if (!res.success) {
            throw new Error(res.error);
        }

        const job = res.job;
        buildProgress.set(job);
        return job;
    }

    async getProgress(jobId) {
        const res = await fetch(`${BuilderService.url}/api/run/${jobId}/status`, {
            headers: {
                'x-api-key': BuilderService.key,
                'x-client-id': BuilderService.client,
            }
        });
        return  await res.json();
    }

    async getHistory() {
        const res = await fetch(`${BuilderService.url}/api/run/${BuilderService.client}/history`, {
            headers: {
                'x-api-key': BuilderService.key,
                'x-client-id': BuilderService.client,
            }
        });
        return  await res.json();
    }
}
