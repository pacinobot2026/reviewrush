'use client';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4">
          You're In!
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Thank you for your purchase! Check your email for access instructions.
        </p>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <ol className="text-left text-gray-300 space-y-3">
            <li>✅ Check your email for the download link</li>
            <li>✅ Download all the templates and scripts</li>
            <li>✅ Customize them for your business</li>
            <li>✅ Start collecting those 5-star reviews!</li>
          </ol>
        </div>
        <p className="mt-8 text-gray-500 text-sm">
          Questions? Email support@reviewrush.io
        </p>
      </div>
    </div>
  );
}
