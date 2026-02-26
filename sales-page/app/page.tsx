'use client';

import { useState } from 'react';

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout session. Please try again.');
      }
    } catch (error) {
      alert('Error processing payment. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline */}
          <p className="text-yellow-400 font-semibold mb-4 text-lg">
            For Local Business Owners Who Are Tired of Begging for Reviews
          </p>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Get <span className="text-yellow-400">5-Star Reviews</span> on Autopilot<br />
            Without Awkward Asks
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            The complete system that turns happy customers into Google reviews — automatically.
          </p>
          
          {/* VSL Video - RIGHT AFTER HEADLINE */}
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-slate-800">
              {!isVideoPlaying ? (
                <div 
                  className="aspect-video flex items-center justify-center cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-white">Watch: How ReviewRush Works</p>
                    <p className="text-sm text-slate-400 mt-1">4 minute video</p>
                  </div>
                </div>
              ) : (
                <video
                  className="aspect-video w-full"
                  controls
                  autoPlay
                  src="https://files.catbox.moe/1be873.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
          
          {/* CTA Button */}
          <a 
            href="#order" 
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Get ReviewRush for Just $47 →
          </a>
          
          <p className="mt-4 text-slate-400 text-sm">
            One-time payment. Instant access. No monthly fees.
          </p>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-900">
            Here's the Truth About Online Reviews...
          </h2>
          
          <div className="space-y-6 text-lg text-slate-700">
            <p>
              <strong>88% of consumers</strong> trust online reviews as much as personal recommendations.
            </p>
            <p>
              Yet most local businesses have <strong>fewer than 10 reviews</strong> on Google.
            </p>
            <p>
              Why? Because asking for reviews feels <span className="text-red-600 font-semibold">awkward</span>. Pushy. Desperate.
            </p>
            <p>
              So you don't ask. Or you ask once and forget. Or you send one email that goes ignored.
            </p>
            <p className="text-xl font-semibold text-slate-900">
              Meanwhile, your competitor with 147 reviews is stealing your customers — even if you're better at what you do.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            What If Getting Reviews Was <span className="text-green-600">Automatic</span>?
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Imagine if every happy customer left a review — without you chasing them down.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2">Done-For-You Templates</h3>
              <p className="text-slate-600">10 email + 5 SMS templates that make asking natural — not needy.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Proven Scripts</h3>
              <p className="text-slate-600">Word-for-word scripts so you know exactly what to say in person.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">QR Code System</h3>
              <p className="text-slate-600">Customers scan, review page opens. Zero friction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything Inside <span className="text-yellow-400">ReviewRush</span>
          </h2>
          
          <div className="space-y-6">
            {[
              { title: "10 Email Templates", desc: "Copy, paste, send. Each one tested and proven to get responses.", value: "$97" },
              { title: "5 SMS Templates", desc: "Text messages that get opened and acted on.", value: "$47" },
              { title: "Verbal Scripts", desc: "Exactly what to say when asking in person — no awkwardness.", value: "$47" },
              { title: "QR Code Generator Guide", desc: "Create scannable codes that take customers directly to your review page.", value: "$27" },
              { title: "The Timing Guide", desc: "When to ask for maximum response rate (timing is everything).", value: "$47" },
              { title: "7-Day Follow-Up Sequence", desc: "Automated reminders that nudge without annoying.", value: "$97" },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    {item.title}
                  </h3>
                  <p className="text-slate-400 ml-6">{item.desc}</p>
                </div>
                <span className="text-slate-500 line-through">{item.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-400 mb-2">Total Value: <span className="line-through">$362</span></p>
            <p className="text-4xl font-bold text-yellow-400">Today: Just $47</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">
            What Happens When You Use This System
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-xl text-left">
              <p className="text-lg mb-4">
                "We went from 12 reviews to 67 in 3 months. Same customers, we just finally started asking the right way."
              </p>
              <p className="font-semibold">— Mike R., Auto Shop Owner</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl text-left">
              <p className="text-lg mb-4">
                "The QR code on our table tents was genius. Customers review us while they're still at the restaurant."
              </p>
              <p className="font-semibold">— Sarah T., Restaurant Owner</p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER SECTION */}
      <section id="order" className="py-16 px-4 bg-gradient-to-b from-yellow-400 to-yellow-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Get ReviewRush Today
          </h2>
          <p className="text-xl mb-8 text-slate-800">
            One-time payment. Lifetime access. Start getting more reviews today.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-5xl font-bold text-slate-900 mb-2">$47</div>
            <p className="text-slate-600 mb-6">One-time payment</p>
            
            <ul className="text-left space-y-3 mb-8">
              {[
                "10 Email Templates",
                "5 SMS Templates",
                "Verbal Scripts",
                "QR Code Guide",
                "Timing Strategy",
                "7-Day Follow-Up Sequence",
                "Instant Digital Access"
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="block w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              {isLoading ? 'Processing...' : 'Get Instant Access →'}
            </button>
            
            <p className="mt-4 text-slate-500 text-sm">
              🔒 Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
            30-Day Money-Back Guarantee
          </h2>
          <p className="text-lg text-slate-700">
            Try ReviewRush risk-free. If you don't get more reviews in 30 days, email us and we'll refund every penny. No questions asked.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              { q: "What kind of business is this for?", a: "Any local business that wants more Google reviews — restaurants, salons, auto shops, contractors, dentists, you name it." },
              { q: "Is this a software or templates?", a: "Templates and training. Everything is ready to copy, paste, and customize for your business. No complicated software to learn." },
              { q: "How fast will I see results?", a: "Most businesses see new reviews within the first week of implementing the system. The templates work immediately." },
              { q: "Is there a monthly fee?", a: "Nope! One-time payment of $47 and it's yours forever." },
            ].map((item, i) => (
              <div key={i} className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get More 5-Star Reviews?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Your competitors are collecting reviews while you're reading this.
          </p>
          <a 
            href="#order"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
          >
            Get ReviewRush for $47 →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 bg-slate-950 text-slate-400 text-center text-sm">
        <p>© 2026 ReviewRush. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="hover:text-white">Terms</a> · <a href="#" className="hover:text-white">Privacy</a> · <a href="#" className="hover:text-white">Contact</a>
        </p>
      </footer>
    </main>
  );
}
