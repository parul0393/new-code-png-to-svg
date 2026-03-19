import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
  const sections = [
    {
      number: '1',
      title: 'Introduction',
      content: 'This Privacy Policy explains how png to svg, operated under T9L, and Media International Pvt. Ltd. (payment processor) collect and use your data.'
    },
    {
      number: '2',
      title: 'Information We Collect',
      bulletPoints: [
        'Name, email address, and payment details (processed via PayPal or secure card gateway).',
        'Device and browser information.',
        'Activity data related to site usage and purchases.'
      ]
    },
    {
      number: '3',
      title: 'How We Use Your Information',
      bulletPoints: [
        'To process payments and deliver purchased assets.',
        'To provide customer support and improve user experience.',
        'To comply with legal and financial record-keeping requirements.'
      ]
    },
    {
      number: '4',
      title: 'Payment Data',
      paragraphs: [
        'All transactions are processed through Media International Pvt. Ltd. using SSL encryption and PCI-DSS compliant gateways.',
        'png to svg does not store or access full card information.'
      ]
    },
    {
      number: '5',
      title: 'Data Sharing',
      paragraphs: [
        'We share necessary information only with trusted third-party services (payment gateways, hosting, analytics) to operate png to svg.',
        'We do not sell or trade user data.'
      ]
    },
    {
      number: '6',
      title: 'Data Security',
      paragraphs: [
        'All information transmitted through png to svg is encrypted via HTTPS and protected by 256-bit SSL.',
        'We apply standard administrative and technical safeguards to prevent unauthorized access.'
      ]
    },
    {
      number: '7',
      title: 'Cookies',
      content: 'Cookies help personalize content and track usage. You may disable cookies in your browser at any time.'
    },
    {
      number: '8',
      title: 'User Rights',
      content: 'You can request access, correction, or deletion of your personal data by emailing support@png to svg.'
    },
    {
      number: '9',
      title: 'Retention of Data',
      content: 'We retain transaction and account data only as long as necessary for compliance or operational requirements.'
    },
    {
      number: '10',
      title: 'Changes to Policy',
      content: 'We may update this Privacy Policy periodically. The latest version will always be available on this page.'
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
                Privacy Policy
              </h1>
              <p className="text-base text-[#666666]">
                How we collect, use, and protect your personal information
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

                  {section.bulletPoints && (
                    <ul className="space-y-2">
                      {section.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="inline-block w-1 h-1 rounded-full bg-[#444444] mt-2.5 flex-shrink-0"></span>
                          <span className="text-base text-[#444444] leading-relaxed" style={{ lineHeight: '1.7' }}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
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