import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { campaigns } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

const campaignSchema = z.object({
  title: z.string().min(1).max(255),
  brandName: z.string().min(1).max(255),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  budget: z.number().positive().transform(num => num.toString()),
  imageUrl: z.string().url(),
  description: z.string().min(1),
});

export const campaignRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(campaigns);
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [campaign] = await ctx.db
        .select()
        .from(campaigns)
        .where(eq(campaigns.id, input.id));
      return campaign;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        brandName: z.string().min(1),
        description: z.string().min(1),
        budget: z.number().min(0).transform((num) => num.toString()),
        startDate: z.string().transform((str) => new Date(str)),
        endDate: z.string().transform((str) => new Date(str)),
        targetAudience: z.string().min(1),
        imageUrl: z.string().url(),
        status: z.enum(['draft', 'active', 'completed', 'cancelled']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [campaign] = await ctx.db
        .insert(campaigns)
        .values({
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      return campaign;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        brandName: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        budget: z.number().min(0).transform((num) => num.toString()).optional(),
        startDate: z.string().transform((str) => new Date(str)).optional(),
        endDate: z.string().transform((str) => new Date(str)).optional(),
        targetAudience: z.string().min(1).optional(),
        imageUrl: z.string().url().optional(),
        status: z
          .enum(['draft', 'active', 'completed', 'cancelled'])
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const [campaign] = await ctx.db
        .update(campaigns)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(campaigns.id, id))
        .returning();
      return campaign;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(campaigns).where(eq(campaigns.id, input.id));
      return { success: true };
    }),
}); 