import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Database, 
  Lock, 
  UserCheck, 
  Cookie,
  Mail,
  Phone,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "November 17, 2025";

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, date of birth, and government-issued ID.",
        "Driver Information: Valid driver's license details, driving history, and vehicle preferences.",
        "Location Data: Current location, pickup/drop-off locations, and GPS tracking during rentals (with consent).",
        "Payment Information: Credit card details, billing address, and transaction history (processed securely by third-party payment providers).",
        "Vehicle Information: Vehicle make, model, registration details, and maintenance records for car owners.",
        "Communication Data: Messages, reviews, ratings, and support interactions with other users.",
        "Usage Data: How you interact with our platform, including pages visited, features used, and time spent.",
        "Device Information: IP address, browser type, operating system, and device identifiers."
      ]
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content: [
        "Service Provision: To facilitate car rentals, process bookings, and manage transactions.",
        "Account Management: To create and maintain your account, verify your identity, and provide customer support.",
        "Safety and Security: To conduct background checks, verify driver credentials, and ensure platform safety.",
        "Communication: To send booking confirmations, updates, promotional offers, and customer service communications.",
        "Platform Improvement: To analyze usage patterns, improve our services, and develop new features.",
        "Legal Compliance: To comply with applicable laws, regulations, and legal processes.",
        "Dispute Resolution: To handle disputes between users and provide evidence when necessary.",
        "Fraud Prevention: To detect and prevent fraudulent activities and protect user accounts."
      ]
    },
    {
      icon: UserCheck,
      title: "3. Information Sharing and Disclosure",
      content: [
        "Other Users: We share necessary information between car owners and renters to facilitate rentals (name, contact details, vehicle information).",
        "Service Providers: We share data with third-party service providers including payment processors, background check services, and analytics providers.",
        "Legal Authorities: We may disclose information when required by law, court order, or government regulation.",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets, user information may be transferred to the acquiring entity.",
        "Safety Purposes: We may share information with emergency services or law enforcement if there's a safety concern or emergency.",
        "Aggregate Data: We may share anonymized, aggregated data that does not identify individual users for research and marketing purposes."
      ]
    },
    {
      icon: Lock,
      title: "4. Data Security Measures",
      content: [
        "Encryption: All sensitive data is encrypted using industry-standard SSL/TLS protocols during transmission.",
        "Secure Storage: Personal information is stored on secure servers with access controls and regular security audits.",
        "Payment Security: Payment information is tokenized and processed through PCI-DSS compliant payment processors.",
        "Access Controls: Only authorized personnel can access user data, and all access is logged and monitored.",
        "Regular Updates: We continuously update our security measures to protect against emerging threats.",
        "Data Minimization: We collect only the information necessary to provide our services and retain it only as long as needed."
      ]
    },
    {
      icon: Cookie,
      title: "5. Cookies and Tracking Technologies",
      content: [
        "Essential Cookies: Required for basic website functionality, including login authentication and shopping cart management.",
        "Performance Cookies: Help us understand how our website is used and improve its performance.",
        "Functional Cookies: Remember your preferences and personalize your experience.",
        "Marketing Cookies: Used to display relevant advertisements and track marketing campaign effectiveness.",
        "Third-Party Cookies: Cookies from our partners for analytics, advertising, and social media integration.",
        "Cookie Control: You can manage cookie preferences through your browser settings or our cookie consent banner."
      ]
    },
    {
      icon: UserCheck,
      title: "6. Your Rights and Choices",
      content: [
        "Access: You have the right to request access to your personal information we hold about you.",
        "Correction: You can request correction of inaccurate or incomplete personal information.",
        "Deletion: You can request deletion of your personal information, subject to legal and contractual obligations.",
        "Portability: You can request a copy of your data in a structured, machine-readable format.",
        "Restriction: You can request restriction of processing of your personal information under certain circumstances.",
        "Objection: You can object to processing of your personal information for direct marketing purposes.",
        "Withdraw Consent: You can withdraw consent for data processing where consent is the legal basis."
      ]
    },
    {
      icon: Database,
      title: "7. Data Retention",
      content: [
        "Account Information: Retained while your account is active and for a period after deletion as required by law.",
        "Transaction Records: Retained for 7 years to comply with tax and financial regulations.",
        "Communication Records: Retained for 2 years for customer service and dispute resolution purposes.",
        "Analytics Data: Retained in anonymized form for analysis and service improvement.",
        "Legal Requirements: Some data may be retained longer if required by applicable laws or regulations.",
        "Automatic Deletion: Inactive accounts are automatically deleted after 12 months of inactivity."
      ]
    },
    {
      icon: Shield,
      title: "8. Children's Privacy",
      content: [
        "Age Requirement: Our services are intended for users who are at least 18 years old.",
        "No Collection from Minors: We do not knowingly collect personal information from children under 18.",
        "Parental Consent: If we discover we have collected information from a minor, we will delete it immediately.",
        "Verification: We use age verification methods to ensure compliance with age requirements.",
        "Reporting: Concerns about children's privacy should be reported to our privacy team immediately."
      ]
    },
    {
      icon: AlertCircle,
      title: "9. International Data Transfers",
      content: [
        "Primary Location: Your data is primarily stored and processed in the Philippines.",
        "Third-Party Services: Some data may be transferred to international service providers for processing.",
        "Adequate Protection: We ensure international transfers provide adequate protection for your personal information.",
        "Compliance: All international transfers comply with applicable data protection laws.",
        "Standard Contractual Clauses: We use standard contractual clauses for international data transfers where required."
      ]
    },
    {
      icon: FileText,
      title: "10. Policy Updates",
      content: [
        "Notification: We will notify users of significant changes to this privacy policy via email or platform notifications.",
        "Posting: Updated policies will be posted on our website with the effective date clearly marked.",
        "Continued Use: Continued use of our services after changes constitutes acceptance of the new policy.",
        "Review Period: We review this privacy policy annually to ensure it remains current and comprehensive.",
        "Feedback: We welcome feedback on our privacy practices and policy clarity."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-800 to-charcoal text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-coral rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-coral bg-opacity-20 rounded-full mb-6">
              <Shield className="w-10 h-10 text-coral" />
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
              Privacy <span className="text-coral">Policy</span>
            </h1>
            <p className="text-xl text-silver-100 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-silver-200">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-softwhite sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="text-sm font-medium text-charcoal hover:text-coral transition-colors"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <div key={index} id={`section-${index}`} className="mb-12 scroll-mt-24">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-coral bg-opacity-10 rounded-full">
                      <section.icon className="w-6 h-6 text-coral" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-poppins text-2xl font-bold text-charcoal mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Your Rights Summary */}
          <div className="mt-16 p-8 bg-coral bg-opacity-10 rounded-xl border border-coral border-opacity-20">
            <h3 className="font-poppins text-xl font-bold text-charcoal mb-6">Your Privacy Rights at a Glance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-charcoal">Access Your Data</h4>
                  <p className="text-gray-600 text-sm">Request a copy of your personal information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-charcoal">Correct Information</h4>
                  <p className="text-gray-600 text-sm">Update inaccurate or incomplete data</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-charcoal">Delete Your Account</h4>
                  <p className="text-gray-600 text-sm">Request removal of your personal data</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-charcoal">Control Marketing</h4>
                  <p className="text-gray-600 text-sm">Opt out of promotional communications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 p-8 bg-softwhite rounded-xl border border-gray-200">
            <h3 className="font-poppins text-xl font-bold text-charcoal mb-4">Privacy Questions?</h3>
            <p className="text-gray-600 mb-6">
              If you have questions about this Privacy Policy or want to exercise your rights, please contact our privacy team:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-coral" />
                <span className="text-gray-700">privacy@elitedrive.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-coral" />
                <span className="text-gray-700">+63 912 345 6789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-coral" />
                <span className="text-gray-700">Naval, Biliran, Philippines</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Response Time</h4>
                  <p className="text-yellow-700 text-sm">
                    We will respond to privacy requests within 30 days, as required by applicable data protection laws.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-2xl font-bold text-center mb-12 text-charcoal">
            Related <span className="text-coral">Documents</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/terms" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <FileText className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">Terms & Conditions</h3>
              <p className="text-gray-600 text-sm">Service terms and user agreements</p>
            </Link>
            <Link to="/help" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <Shield className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm">Get support and find answers</p>
            </Link>
            <Link to="/faq" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <HelpCircle className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">FAQ</h3>
              <p className="text-gray-600 text-sm">Frequently asked questions</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
