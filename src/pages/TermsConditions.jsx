import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Shield, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Users,
  Car,
  CreditCard,
  MapPin,
  HelpCircle,
  Mail,
  Phone
} from 'lucide-react';

const TermsConditions = () => {
  const lastUpdated = "November 17, 2025";

  const sections = [
    {
      icon: Users,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using Elite Drive's services, you accept and agree to be bound by the terms and provision of this agreement.",
        "These Terms and Conditions apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.",
        "If you do not agree to abide by the above, please do not use this service."
      ]
    },
    {
      icon: Car,
      title: "2. Service Description",
      content: [
        "Elite Drive is a car rental platform that connects vehicle owners with customers seeking rental services in Biliran, Philippines.",
        "We facilitate the booking, payment, and management of car rentals through our website and mobile application.",
        "Elite Drive acts as an intermediary between car owners and renters, providing a secure platform for transactions.",
        "Vehicle owners are independent contractors and not employees of Elite Drive."
      ]
    },
    {
      icon: Users,
      title: "3. User Accounts",
      content: [
        "You must create an account to access certain features of our service.",
        "You must provide accurate, complete, and current information when creating your account.",
        "You are responsible for safeguarding the password and all activities that occur under your account.",
        "You must be at least 18 years old and possess a valid driver's license to create an account.",
        "Elite Drive reserves the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      icon: Shield,
      title: "4. Vehicle Requirements and Standards",
      content: [
        "All vehicles listed on our platform must meet safety and quality standards established by Elite Drive.",
        "Vehicle owners must provide accurate information about their vehicles, including make, model, year, and condition.",
        "Vehicles must be properly registered, insured, and undergo regular safety inspections.",
        "Elite Drive reserves the right to remove vehicles that do not meet our standards."
      ]
    },
    {
      icon: Clock,
      title: "5. Booking and Reservations",
      content: [
        "Bookings are subject to vehicle availability and owner approval.",
        "Customers must provide valid payment information and a valid driver's license at the time of booking.",
        "Reservation changes or cancellations must follow our cancellation policy.",
        "Pickup and return times must be strictly adhered to unless mutually agreed upon by both parties.",
        "Late returns may incur additional charges as specified in the rental agreement."
      ]
    },
    {
      icon: DollarSign,
      title: "6. Payment and Fees",
      content: [
        "Rental prices are set by vehicle owners and are clearly displayed before booking.",
        "Elite Drive charges a service fee for each successful transaction, which is included in the total price.",
        "Payment processing is handled securely through our payment partners.",
        "Additional charges may apply for mileage limits, fuel, late returns, or damages.",
        "All prices are quoted in Philippine Pesos (PHP) unless otherwise specified."
      ]
    },
    {
      icon: CreditCard,
      title: "7. Refund Policy",
      content: [
        "Refunds are processed according to our cancellation policy and the specific terms of each rental.",
        "Full refunds are available for cancellations made at least 48 hours before the rental start time.",
        "Cancellations made within 48 hours may be subject to partial or no refund.",
        "Refunds for service issues will be evaluated on a case-by-case basis.",
        "Refund processing typically takes 5-7 business days."
      ]
    },
    {
      icon: Shield,
      title: "8. Insurance and Liability",
      content: [
        "Vehicle owners must maintain comprehensive insurance coverage for their vehicles.",
        "Customers may be required to provide proof of personal insurance or purchase additional coverage.",
        "Elite Drive is not responsible for accidents, injuries, or damages occurring during rental periods.",
        "Users agree to indemnify and hold Elite Drive harmless from any claims or liabilities.",
        "Both parties should review their respective insurance policies before entering into rental agreements."
      ]
    },
    {
      icon: AlertCircle,
      title: "9. Prohibited Uses",
      content: [
        "Vehicles may not be used for illegal activities, racing, or off-road driving.",
        "Smoking is prohibited in all rental vehicles unless explicitly permitted by the owner.",
        "Vehicles may not be used to transport hazardous materials.",
        "Subletting or unauthorized sharing of rental vehicles is strictly prohibited.",
        "Violations may result in immediate termination of the rental and additional charges."
      ]
    },
    {
      icon: Users,
      title: "10. User Conduct",
      content: [
        "Users must treat each other with respect and professionalism.",
        "Harassment, discrimination, or abusive behavior will not be tolerated.",
        "Users must communicate honestly and accurately about rental arrangements.",
        "False or misleading information may result in account suspension or termination.",
        "Elite Drive reserves the right to remove users who violate community standards."
      ]
    },
    {
      icon: Shield,
      title: "11. Privacy and Data Protection",
      content: [
        "We collect and use personal information as described in our Privacy Policy.",
        "User data is protected using industry-standard security measures.",
        "We may share information with law enforcement when required by law.",
        "Users have the right to access, update, or delete their personal information.",
        "By using our service, you consent to the collection and use of your data as outlined."
      ]
    },
    {
      icon: FileText,
      title: "12. Intellectual Property",
      content: [
        "All content on Elite Drive's platform, including logos, text, graphics, and software, is owned by Elite Drive or our licensors.",
        "Users may not use, copy, reproduce, or distribute our intellectual property without permission.",
        "User-generated content remains the property of the user but grants Elite Drive a license to use it for service purposes.",
        "Trademark and copyright laws protect our brand and content."
      ]
    },
    {
      icon: AlertCircle,
      title: "13. Dispute Resolution",
      content: [
        "Users should attempt to resolve disputes directly with each other first.",
        "Elite Drive provides mediation services for unresolved disputes.",
        "If mediation fails, disputes will be resolved through arbitration in accordance with Philippine law.",
        "Users waive their right to participate in class action lawsuits.",
        "Legal proceedings must be conducted in the appropriate courts of Biliran, Philippines."
      ]
    },
    {
      icon: AlertCircle,
      title: "14. Limitation of Liability",
      content: [
        "Elite Drive's liability is limited to the service fees paid by the user.",
        "We are not liable for indirect, incidental, or consequential damages.",
        "Our total liability shall not exceed the amount paid by the user in the preceding 12 months.",
        "Elite Drive makes no warranties about the accuracy or reliability of user-provided information.",
        "Users use the service at their own risk."
      ]
    },
    {
      icon: FileText,
      title: "15. Service Modifications",
      content: [
        "Elite Drive reserves the right to modify, suspend, or discontinue any part of our service.",
        "We may update these terms periodically, with changes effective upon posting.",
        "Continued use of the service after changes constitutes acceptance of the new terms.",
        "Users will be notified of significant changes via email or platform notifications.",
        "Elite Drive may discontinue the service with reasonable notice to users."
      ]
    },
    {
      icon: AlertCircle,
      title: "16. Termination",
      content: [
        "Users may terminate their accounts at any time through their account settings.",
        "Elite Drive may suspend or terminate accounts for violations of these terms.",
        "Termination does not relieve users of obligations incurred prior to termination.",
        "Upon termination, users lose access to their account and associated data.",
        "Elite Drive retains the right to remove inactive accounts after 12 months."
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
              <FileText className="w-10 h-10 text-coral" />
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
              Terms & <span className="text-coral">Conditions</span>
            </h1>
            <p className="text-xl text-silver-100 max-w-3xl mx-auto">
              Please read these terms carefully before using Elite Drive's services.
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

      {/* Terms Content */}
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

          {/* Contact Information */}
          <div className="mt-16 p-8 bg-softwhite rounded-xl border border-gray-200">
            <h3 className="font-poppins text-xl font-bold text-charcoal mb-4">Questions About Our Terms?</h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms and Conditions, please contact our legal team:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-coral" />
                <span className="text-gray-700">legal@elitedrive.com</span>
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
            <Link to="/privacy" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <Shield className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">Privacy Policy</h3>
              <p className="text-gray-600 text-sm">How we collect and protect your data</p>
            </Link>
            <Link to="/help" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <HelpCircle className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm">Get support and find answers</p>
            </Link>
            <Link to="/faq" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <FileText className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">FAQ</h3>
              <p className="text-gray-600 text-sm">Frequently asked questions</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
