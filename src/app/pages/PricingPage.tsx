import { Check, X, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Pricing } from '../components/Pricing';

export function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full px-6 py-16 md:py-24 bg-gradient-to-b from-[var(--warm-cream)] to-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl tracking-tight" style={{ fontWeight: 700 }}>
              Simple & Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-[var(--warm-brown)]/70 max-w-2xl mx-auto leading-relaxed">
              Fast, AI-powered PNG to SVG conversion. Choose the plan that works best for you.
              No hidden fees, cancel anytime.
            </p>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <Pricing/>
        

        {/* FAQ Section */}
        <section className="w-full px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-[var(--warm-brown)]/70">
                Everything you need to know about our pricing
              </p>
            </div>

            <Accordion.Root type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" question="Is there a free trial?" answer="Yes! Our Free plan allows you to try the service with 5 conversions per month. No credit card required." />
              
              <AccordionItem value="item-2" question="Can I cancel anytime?" answer="Absolutely. You can cancel your subscription at any time from your account settings. No questions asked, no cancellation fees." />
              
              <AccordionItem value="item-3" question="Do you support bulk uploads?" answer="Bulk uploads are available on our Business plan, which includes API access for automated processing of multiple files." />
              
              <AccordionItem value="item-4" question="What payment methods do you accept?" answer="We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All transactions are secured and encrypted." />
              
              <AccordionItem value="item-5" question="Can I upgrade or downgrade my plan?" answer="Yes, you can change your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the next billing cycle." />
              
              <AccordionItem value="item-6" question="Do you offer refunds?" answer="We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund." />
            </Accordion.Root>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

interface AccordionItemProps {
  value: string;
  question: string;
  answer: string;
}

function AccordionItem({ value, question, answer }: AccordionItemProps) {
  return (
    <Accordion.Item 
      value={value} 
      className="bg-white rounded-2xl border-2 border-[var(--warm-brown)]/10 overflow-hidden hover:border-[var(--warm-orange)]/30 transition-colors"
    >
      <Accordion.Header>
        <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group">
          <span className="text-lg text-[var(--warm-dark)] pr-8" style={{ fontWeight: 600 }}>
            {question}
          </span>
          <ChevronDown className="w-5 h-5 text-[var(--warm-orange)] transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
        <div className="px-6 pb-6 text-[var(--warm-brown)]/80 leading-relaxed">
          {answer}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

/*
  This is a multiline comment
  in a TypeScript code block.
  <section className="w-full px-6 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
        
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              /* Web App Plan */
              // <div className="bg-white rounded-2xl p-8 border border-[var(--warm-brown)]/10 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col">
              //   {/* Most Popular Badge */}
              //   <div className="absolute -top-3 left-8">
              //     <div className="bg-[var(--warm-orange)] text-white px-4 py-1.5 rounded-full text-sm" style={{ fontWeight: 600 }}>
              //       Most Popular
              //     </div>
              //   </div>

              //   <div className="flex-1 flex flex-col pt-2">
              //     {/* Plan Header */}
              //     <div className="space-y-3">
              //       <h3 className="text-3xl text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>
              //         Web App
              //       </h3>
              //       <p className="text-sm text-[var(--warm-brown)]/70 leading-relaxed">
              //         Unlimited web conversions for personal use. Perfect for designers and creators who need quick, reliable vector conversion.
              //       </p>
              //     </div>

              //     {/* Price */}
              //     <div className="py-2 mt-6">
              //       <div className="flex items-baseline gap-1">
              //         <span className="text-5xl text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>
              //           $12
              //         </span>
              //         <span className="text-lg text-[var(--warm-brown)]/60">/month</span>
              //       </div>
              //     </div>

              //     {/* Features List */}
              //     <div className="space-y-3 py-4 mt-6 flex-1">
              //       <div className="flex items-center gap-3">
              //         <Check className="w-5 h-5 text-[var(--warm-orange)] flex-shrink-0" />
              //         <span className="text-[var(--warm-brown)]">Unlimited web conversions</span>
              //       </div>
              //       <div className="flex items-center gap-3">
              //         <Check className="w-5 h-5 text-[var(--warm-orange)] flex-shrink-0" />
              //         <span className="text-[var(--warm-brown)]">Advanced quality controls</span>
              //       </div>
              //       <div className="flex items-center gap-3">
              //         <Check className="w-5 h-5 text-[var(--warm-orange)] flex-shrink-0" />
              //         <span className="text-[var(--warm-brown)]">Background removal tool</span>
              //       </div>
              //       <div className="flex items-center gap-3">
              //         <Check className="w-5 h-5 text-[var(--warm-orange)] flex-shrink-0" />
              //         <span className="text-[var(--warm-brown)]">Instant downloads</span>
              //       </div>
              //       <div className="flex items-center gap-3">
              //         <Check className="w-5 h-5 text-[var(--warm-orange)] flex-shrink-0" />
              //         <span className="text-[var(--warm-brown)]">Cancel anytime</span>
              //       </div>
              //     </div>

              //     {/* CTA Button */}
              //     <div className="mt-6">
              //       <button className="w-full py-3.5 px-8 rounded-full bg-[var(--warm-orange)] text-white hover:bg-[var(--warm-brown)] transition-all duration-300 shadow-sm hover:shadow-md" style={{ fontWeight: 600 }}>
              //         Subscribe
              //       </button>
              //     </div>
              //   </div>
              // </div>

              // {/* API Access Plan */}
              // <div className="bg-white rounded-2xl p-8 border border-[var(--warm-brown)]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              //   <div className="flex-1 flex flex-col">
              //     {/* Plan Header */}
              //     <div className="space-y-3">
              //       <h3 className="text-3xl text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>
              //         API Access
              //       </h3>
              //       <p className="text-sm text-[var(--warm-brown)]/70 leading-relaxed">
              //         Integrate conversion power into your applications. Flexible credit-based pricing with volume discounts.
              //       </p>
              //     </div>

              //     {/* Credit Info */}
              //     <div className="py-2 mt-6">
              //       <p className="text-sm text-[var(--warm-brown)]/60">
              //         1 Credit = 1 Image Conversion
                  //   </p>
                  // </div>

                  // {/* Pricing Options */}
                  // <div className="space-y-3 mt-6 flex-1">
                  //   <label className="flex items-center justify-between p-4 bg-[var(--warm-beige)]/30 rounded-xl cursor-pointer hover:bg-[var(--warm-beige)]/50 transition-colors">
                  //     <div className="flex items-center gap-3">
                  //       <input type="radio" name="api-plan" className="w-4 h-4 accent-[var(--warm-orange)]" defaultChecked />
                  //       <span className="text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>100 credits</span>
                  //     </div>
                  //     <div className="text-right">
                  //       <div className="text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>$25</div>
                  //       <div className="text-xs text-[var(--warm-brown)]/60">$0.25/credit</div>
                  //     </div>
                  //   </label>

                  //   <label className="flex items-center justify-between p-4 bg-[var(--warm-beige)]/30 rounded-xl cursor-pointer hover:bg-[var(--warm-beige)]/50 transition-colors">
                  //     <div className="flex items-center gap-3">
                  //       <input type="radio" name="api-plan" className="w-4 h-4 accent-[var(--warm-orange)]" />
                  //       <span className="text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>500 credits</span>
                  //     </div>
                  //     <div className="text-right">
                  //       <div className="text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>$100</div>
                  //       <div className="text-xs text-[var(--warm-brown)]/60">$0.20/credit</div>
                  //     </div>
                  //   </label>

                  //   <label className="flex items-center justify-between p-4 bg-[var(--warm-beige)]/30 rounded-xl cursor-pointer hover:bg-[var(--warm-beige)]/50 transition-colors">
                  //     <div className="flex items-center gap-3">
                  //       <input type="radio" name="api-plan" className="w-4 h-4 accent-[var(--warm-orange)]" />
                  //       <span className="text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>1000 credits</span>
                  //     </div>
                  //     <div className="text-right">
                  //       <div className="text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>$150</div>
                  //       <div className="text-xs text-[var(--warm-brown)]/60">$0.15/credit</div>
                  //     </div>
                  //   </label>

                  //   <div className="pt-2">
                  //     <button className="text-[var(--warm-orange)] text-sm hover:text-[var(--warm-brown)] transition-colors flex items-center gap-1" style={{ fontWeight: 600 }}>
                  //       View all plans <span>→</span>
                  //     </button>
                  //   </div>
                  // </div>

                  // {/* CTA Button */}
//                   <div className="mt-6">
//                     <button className="w-full py-3.5 px-8 rounded-full bg-[var(--warm-brown)] text-white hover:bg-[var(--warm-dark)] transition-all duration-300 shadow-sm hover:shadow-md" style={{ fontWeight: 600 }}>
//                       Subscribe
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
// */