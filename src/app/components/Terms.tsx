import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function TermsPage() {
  const sections = [
    {
      number: '1',
      title: 'Introduction',
      content: 'Welcome to png to svg — operated by T9L, with all payments securely processed by Media International Pvt. Ltd., a wholly owned subsidiary of T9L. By accessing or using png to svg, you agree to the following Terms & Conditions. Please read them carefully.'
    },
    {
      number: '2',
      title: 'Services',
      content: 'png to svg provides digital tools for logo generation, brand kits, and related design assets. All products are delivered electronically; no physical shipments occur.'
    },
    {
      number: '3',
      title: 'Payments',
      paragraphs: [
        'All prices are stated in USD.',
        'Payments for all purchases are made directly to Media International Pvt. Ltd., acting on behalf of T9L for the operation of png to svg.',
        'Payments are processed securely via PayPal or card through PCI-DSS compliant payment gateways.',
        'You authorize the relevant payment processor to charge your selected payment method for the total displayed amount.'
      ]
    },
    {
      number: '4',
      title: 'Refunds and Cancellations',
      content: 'Since png to svg delivers digital design assets instantly upon purchase, refunds are generally not available once files are downloaded. If you experience technical issues preventing access to your files, contact support@png to svg within 7 days of purchase.'
    },
    {
      number: '5',
      title: 'Ownership and License',
      content: 'Upon full payment, you receive a non-exclusive, royalty-free, commercial license to use the generated logos and design assets for personal or commercial branding. You may not resell, redistribute, or claim ownership of generated designs as your own original creation.'
    },
    {
      number: '6',
      title: 'Limitation of Liability',
      content: 'png to svg, T9L, and Media International Pvt. Ltd. are not liable for indirect, incidental, or consequential damages arising from use of the platform. Total liability for any claim shall not exceed the total amount paid by you for the relevant purchase.'
    },
    {
      number: '7',
      title: 'Indemnification',
      content: 'You agree to indemnify and hold harmless png to svg, T9L, and Media International Pvt. Ltd. from any claims, damages, or legal actions arising from misuse of our services or violation of these Terms.'
    },
    {
      number: '8',
      title: 'Intellectual Property',
      content: 'All site content, interface designs, and generated assets (before purchase) remain the property of png to svg and T9L. Purchased assets are licensed as per these terms.'
    },
    {
      number: '9',
      title: 'Governing Law and Jurisdiction',
      content: 'These Terms are governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of courts located in New Delhi, India.'
    },
    {
      number: '10',
      title: 'Updates to Terms',
      content: 'png to svg may revise these Terms periodically. Updates take effect upon publication on this page. Continued use of the service indicates acceptance of the revised Terms.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <Header /> */}
      
      <main className="flex-1 w-full">
        {/* Content Section */}
        <section className="w-full px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl text-[#1a1a1a] mb-3" style={{ fontWeight: 700 }}>
                Terms & Conditions
              </h1>
              <p className="text-base text-[#666666]">
                The legal terms governing your use of png to svg
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-lg md:text-xl text-[#1a1a1a] mb-4" style={{ fontWeight: 600 }}>
                    {section.number}. {section.title}
                  </h2>
                  
                  {section.content && (
                    <p className="text-base text-[#444444] leading-relaxed" style={{ lineHeight: '1.7' }}>
                      {section.content}
                    </p>
                  )}

                  {section.paragraphs && (
                    <div className="space-y-3">
                      {section.paragraphs.map((paragraph, i) => (
                        <p key={i} className="text-base text-[#444444] leading-relaxed" style={{ lineHeight: '1.7' }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}