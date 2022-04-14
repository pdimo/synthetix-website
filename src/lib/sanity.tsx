//@ts-nocheck
import { createClient, createImageUrlBuilder, createPreviewSubscriptionHook } from 'next-sanity';

const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion: '2021-08-31',
};

export const imageBuilder = (source: any) => createImageUrlBuilder(config).image(source);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
export const client = createClient(config);
export const previewClient = createClient({
	...config,
	useCdn: false,
	token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
});

export const getClient = (usePreview: any) => (usePreview ? previewClient : client);
export default client;