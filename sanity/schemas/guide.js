import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
	name: 'guide',
	title: 'Guide Documents',
	type: 'document',
	orderings: [orderRankOrdering],
	initialValue: () => ({
		publishedAt: new Date().toISOString(),
	}),
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'subTitle',
			title: 'Sub Title',
			type: 'string',
			description: 'Optional - Leave blank to not show',
		},
		{
			title: 'Sub Title Bottom?',
			name: 'subPos',
			type: 'boolean',
			description: 'When set sub title will show under title',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'introText',
			title: 'Intro Text',
			type: 'text',
			validation: (Rule) => Rule.required().min(10).max(160),
		},
		{
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'icon',
			title: 'Icon image',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'guideCategory' }],
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'tag' } }],
			options: {
				layout: 'tags',
			},
			validation: (Rule) => Rule.unique().required().min(1).max(3),
		},
		{
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'pageBuilder',
			type: 'pageBuilder',
			title: 'Page Builder',
			validation: (Rule) => Rule.required(),
		},
		orderRankField({ type: 'category', hidden: true }),
	],
	initialValue: {
		subPos: false,
	},
	orderings: [
		{
			title: 'Category',
			name: 'category',
			by: [{ field: 'category', direction: 'desc' }],
		},
	],

	preview: {
		select: {
			title: 'title',
			subtitle: 'category.title',
			media: 'icon',
		},
	},
};
