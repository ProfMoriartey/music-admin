'use client';

import CampaignForm from '../CampaignForm';

export default function NewCampaignPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Create New Campaign
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <CampaignForm mode="create" />
        </div>
      </div>
    </div>
  );
} 