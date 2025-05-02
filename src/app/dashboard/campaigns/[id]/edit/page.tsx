'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { trpc } from '@/utils/trpc';
import CampaignForm from '../../CampaignForm';

export default function EditCampaignPage() {
  const params = useParams();
  const campaignId = Number(params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);

  const { data } = trpc.campaign.getById.useQuery(
    { id: campaignId },
    {
      onSuccess: (data) => {
        if (data) {
          setCampaign({
            ...data,
            startDate: new Date(data.startDate).toISOString().split('T')[0],
            endDate: new Date(data.endDate).toISOString().split('T')[0],
          });
        }
        setIsLoading(false);
      },
    }
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Campaign not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Campaign
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <CampaignForm mode="edit" initialData={campaign} />
        </div>
      </div>
    </div>
  );
} 