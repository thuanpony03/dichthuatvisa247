import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const giayTo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/giay-to' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    docName: z.string(),
    docNameEn: z.string(),
    sampleImage: z.string(),
    pageCount: z.number(),
    consulates: z.array(z.string()),
    updated: z.date(),
    related: z.array(z.string()).default([]),
    // Ghi chú đặc biệt, ví dụ: sổ hộ khẩu đã hết hiệu lực từ 01/01/2023
    deprecatedNotice: z.string().optional(),
    intro: z.string(),
    terminology: z.array(z.object({ vi: z.string(), en: z.string() })),
    commonErrors: z.array(z.object({ title: z.string(), desc: z.string() })).length(3),
    // Tuỳ chọn — nếu không viết riêng, trang tự sinh 3 câu hỏi mặc định (xem [slug].astro).
    // Khuyến khích viết riêng cho giấy tờ có traffic cao để tránh 20 trang đọc giống hệt nhau.
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).length(3).optional(),
  }),
});

const lanhSu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lanh-su' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    country: z.string(),
    updated: z.date(),
    checklist: z.array(z.object({ docSlug: z.string(), label: z.string() })),
    disclaimer: z.string().optional(),
    formRequirement: z.string(),
    sourceUrl: z.string().url(),
    sourceName: z.string(),
    estimate: z.string(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).length(5),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    updated: z.date(),
  }),
});

export const collections = { 'giay-to': giayTo, 'lanh-su': lanhSu, blog };
