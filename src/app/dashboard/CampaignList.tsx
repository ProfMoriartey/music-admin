'use client';

import { trpc } from '@/utils/trpc';
import { format } from 'date-fns';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export default function CampaignList() {
  const queryClient = useQueryClient();
  const { data: campaigns, isLoading } = trpc.campaign.list.useQuery();
  const { mutate: deleteCampaign } = trpc.campaign.delete.useMutation({
    onSuccess: () => {
      // Invalidate and refetch the campaigns list
      const queryKey = getQueryKey(trpc.campaign.list);
      queryClient.invalidateQueries(queryKey);
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-lg p-4 space-y-3"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!campaigns?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No campaigns found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {campaign.title}
            </h3>
            <p className="text-sm text-gray-500">{campaign.brandName}</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                Budget: ${Number(campaign.budget).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                {format(new Date(campaign.startDate), 'MMM d, yyyy')} -{' '}
                {format(new Date(campaign.endDate), 'MMM d, yyyy')}
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Link
                href={`/dashboard/campaigns/${campaign.id}/edit`}
                className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this campaign?')) {
                    deleteCampaign({ id: campaign.id });
                  }
                }}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 