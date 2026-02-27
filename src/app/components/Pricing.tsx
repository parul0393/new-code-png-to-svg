import { Check } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing-section" className="w-full px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight" style={{ fontWeight: 700 }}>
            Pricing
          </h2>
          <p className="text-lg md:text-xl text-[var(--warm-brown)]/70 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start converting with our web app or unlock API access for unlimited scalability.
          </p>
          <div className="w-24 h-[1px] bg-[var(--warm-orange)]/30 mx-auto mt-6"></div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Web App Plan */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border-2 border-[var(--warm-orange)]/30 hover:border-[var(--warm-orange)]/50 transition-all duration-300 relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-[var(--warm-orange)] text-white px-6 py-2 rounded-full text-sm" style={{ fontWeight: 600 }}>
                Most Popular
              </div>
            </div>

            <div className="space-y-6">
              {/* Plan Header */}
              <div className="space-y-3 pt-4">
                <h3 className="text-2xl md:text-3xl" style={{ fontWeight: 700 }}>
                  Web App
                </h3>
                <p className="text-[var(--warm-brown)]/70 leading-relaxed">
                  Unlimited web conversions for personal use. Perfect for designers and creators who need quick, reliable vector conversion.
                </p>
              </div>

              {/* Price */}
              <div className="py-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>
                    $12
                  </span>
                  <span className="text-lg text-[var(--warm-brown)]/60">/month</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--warm-orange)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--warm-brown)]">Unlimited web conversions</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--warm-orange)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--warm-brown)]">Advanced quality controls</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--warm-orange)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--warm-brown)]">Background removal tool</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--warm-orange)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--warm-brown)]">Instant downloads</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--warm-orange)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--warm-brown)]">Cancel anytime</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full py-4 px-8 rounded-full bg-[var(--warm-orange)] text-white hover:bg-[var(--warm-brown)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" style={{ fontWeight: 600 }}>
                Subscribe
              </button>
            </div>
          </div>

          {/* API Plan */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border-2 border-[var(--warm-brown)]/10 hover:border-[var(--warm-brown)]/20 transition-all duration-300">
            <div className="space-y-6">
              {/* Plan Header */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl" style={{ fontWeight: 700 }}>
                  API Access
                </h3>
                <p className="text-[var(--warm-brown)]/70 leading-relaxed">
                  Integrate conversion power into your applications. Flexible credit-based pricing with volume discounts.
                </p>
              </div>

              {/* Pricing Table */}
              <div className="space-y-4 py-4">
                <div className="text-sm text-[var(--warm-brown)]/60 mb-4" style={{ fontWeight: 600 }}>
                  1 Credit = 1 Image Conversion
                </div>

                {/* Pricing Options */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-[var(--warm-beige)]/40 rounded-2xl cursor-pointer hover:bg-[var(--warm-beige)]/60 transition-colors border border-[var(--warm-brown)]/10">
                    <input type="radio" name="api-plan" className="w-5 h-5 accent-[var(--warm-orange)]" defaultChecked />
                    <div className="flex-1 mx-4">
                      <div className="text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>100 credits</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>$25</div>
                      <div className="text-xs text-[var(--warm-brown)]/60)">$0.25/credit</div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-[var(--warm-beige)]/40 rounded-2xl cursor-pointer hover:bg-[var(--warm-beige)]/60 transition-colors border border-[var(--warm-brown)]/10">
                    <input type="radio" name="api-plan" className="w-5 h-5 accent-[var(--warm-orange)]" />
                    <div className="flex-1 mx-4">
                      <div className="text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>500 credits</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>$100</div>
                      <div className="text-xs text-[var(--warm-brown)]/60">$0.20/credit</div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-[var(--warm-beige)]/40 rounded-2xl cursor-pointer hover:bg-[var(--warm-beige)]/60 transition-colors border border-[var(--warm-brown)]/10">
                    <input type="radio" name="api-plan" className="w-5 h-5 accent-[var(--warm-orange)]" />
                    <div className="flex-1 mx-4">
                      <div className="text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>1000 credits</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>$150</div>
                      <div className="text-xs text-[var(--warm-brown)]/60">$0.15/credit</div>
                    </div>
                  </label>
                </div>

                <button className="text-[var(--warm-orange)] text-sm hover:text-[var(--warm-brown)] transition-colors mt-2" style={{ fontWeight: 600 }}>
                  View all plans →
                </button>
              </div>

              {/* CTA Button */}
              <button className="w-full py-4 px-8 rounded-full bg-[var(--warm-brown)] text-white hover:bg-[var(--warm-dark)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" style={{ fontWeight: 600 }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 text-[var(--warm-brown)]/60">
          <p>All plans include secure payments and instant activation. No hidden fees.</p>
        </div>
      </div>
    </section>
  );
}