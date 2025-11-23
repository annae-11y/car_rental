import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Car, 
  CreditCard, 
  Shield, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  FileText,
  AlertCircle,
  CheckCircle,
  Star
} from 'lucide-react';

const FAQ = () => {
  const [expandedCategory, setExpandedCategory] = useState('general');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const categories = [
    { id: 'general', name: 'General Questions', icon: HelpCircle, color: 'bg-blue-500' },
    { id: 'booking', name: 'Booking & Rentals', icon: Car, color: 'bg-coral' },
    { id: 'payment', name: 'Payment & Pricing', icon: CreditCard, color: 'bg-green-500' },
    { id: 'account', name: 'Account & Profile', icon: Users, color: 'bg-purple-500' },
    { id: 'safety', name: 'Safety & Insurance', icon: Shield, color: 'bg-red-500' },
    { id: 'support', name: 'Support & Help', icon: Phone, color: 'bg-orange-500' }
  ];

  const faqData = {
    general: [
      {
        question: "What is Elite Drive?",
        answer: "Elite Drive is a premier car rental platform in Biliran, Philippines that connects vehicle owners with customers seeking reliable transportation. We provide a secure, convenient, and transparent way to rent cars for various purposes including business, leisure, and local transportation."
      },
      {
        question: "How does Elite Drive work?",
        answer: "Elite Drive works as a marketplace where car owners can list their vehicles and customers can browse, book, and rent cars. Simply search for available cars, select your preferred vehicle, book it for your desired dates, and pick it up from the owner. We handle the payment processing and provide support throughout the rental period."
      },
      {
        question: "Where does Elite Drive operate?",
        answer: "Elite Drive currently operates throughout Biliran province, including Naval and surrounding areas. We're continuously expanding our service areas to better serve our customers across the Philippines."
      },
      {
        question: "Is Elite Drive available 24/7?",
        answer: "Our platform is available 24/7 for browsing and booking. However, vehicle pickup and return times depend on the individual owner's availability. Customer support is available daily from 7 AM to 10 PM."
      }
    ],
    booking: [
      {
        question: "How do I book a car?",
        answer: "To book a car: 1) Search for available vehicles on our platform, 2) Filter by your preferences (dates, location, car type), 3) Select your desired car, 4) Review the details and pricing, 5) Provide necessary information and payment, 6) Confirm your booking and receive pickup instructions."
      },
      {
        question: "What do I need to rent a car?",
        answer: "To rent a car, you need: 1) A valid Elite Drive account, 2) A valid driver's license (at least 1 year old), 3) A valid government-issued ID, 4) A credit/debit card for payment, 5) You must be at least 18 years old (21 for premium vehicles)."
      },
      {
        question: "Can I cancel my booking?",
        answer: "Yes, you can cancel your booking. Cancellation policies vary by owner: Full refund for cancellations 48+ hours before pickup, 50% refund for 24-48 hours, no refund for less than 24 hours. Some owners may have different policies, so always check the specific terms."
      },
      {
        question: "How do I pick up and return the car?",
        answer: "Pickup and return arrangements are made directly with the car owner. Common options include: 1) Owner delivers to your location, 2) You pick up from owner's address, 3) Meet at a mutually convenient location. The owner will provide specific instructions after booking confirmation."
      },
      {
        question: "What if I'm late returning the car?",
        answer: "Late returns may incur additional charges. Most owners allow a 30-minute grace period. After that, hourly late fees apply (typically ₱200-500 per hour). Always communicate with the owner if you anticipate being late to avoid penalties."
      }
    ],
    payment: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept: 1) Credit cards (Visa, Mastercard, American Express), 2) Debit cards, 3) Digital wallets (GCash, PayMaya), 4) Bank transfers for long-term rentals. All payments are processed securely through our payment partners."
      },
      {
        question: "How is pricing determined?",
        answer: "Car owners set their own daily rates based on factors like: 1) Vehicle type and model, 2) Age and condition of the car, 3) Location and demand, 4) Seasonal factors. Elite Drive adds a service fee (10-20%) to cover platform costs and support."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No, we believe in transparent pricing. The total price you see includes: 1) Daily rental rate, 2) Elite Drive service fee, 3) Insurance coverage (if selected). Additional charges only apply for: 1) Late returns, 2) Mileage overages, 3) Fuel refueling, 4) Damage repairs."
      },
      {
        question: "When am I charged for my booking?",
        answer: "Payment is processed at the time of booking confirmation. The amount is held securely and released to the car owner 24 hours after the rental period ends, ensuring time for any issue resolution."
      },
      {
        question: "Can I get a refund?",
        answer: "Refunds are available according to the cancellation policy. If you need to cancel, the refund amount depends on how much notice you provide. Service fees are non-refundable. Refund processing typically takes 5-7 business days."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Creating an account is simple: 1) Click 'Sign Up' on our website or app, 2) Enter your email and create a password, 3) Fill in your personal information, 4) Upload your driver's license and ID, 5) Verify your email address, 6) Complete profile verification."
      },
      {
        question: "Why do I need to verify my account?",
        answer: "Account verification ensures: 1) Safety and security for all users, 2) Compliance with legal requirements, 3) Prevention of fraud and misuse, 4) Trust and reliability in our community. Verification typically takes 1-2 business hours."
      },
      {
        question: "Can I list my car on Elite Drive?",
        answer: "Yes! If you own a car, you can become a host. Requirements: 1) Valid vehicle registration, 2) Comprehensive insurance, 3) Vehicle in good condition, 4) Clean driving record. List your car in minutes and start earning extra income."
      },
      {
        question: "How do I update my profile information?",
        answer: "You can update your profile by: 1) Logging into your account, 2) Going to 'Profile Settings', 3) Editing the information you want to change, 4) Saving your changes. Some changes like ID updates may require re-verification."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account anytime. Go to Account Settings and select 'Delete Account'. Note: 1) Active bookings will be completed first, 2) Some data may be retained for legal purposes, 3) You'll lose access to your booking history and ratings."
      }
    ],
    safety: [
      {
        question: "Are the cars safe and insured?",
        answer: "All cars on Elite Drive must: 1) Pass our safety inspection, 2) Have valid comprehensive insurance, 3) Be properly maintained, 4) Meet safety standards. Additional insurance coverage is available for renters at checkout."
      },
      {
        question: "What happens if I have an accident?",
        answer: "In case of an accident: 1) Ensure everyone's safety first, 2) Call emergency services if needed (911), 3) Contact Elite Drive support immediately, 4) Document the incident with photos, 5) Exchange information with other parties, 6) File an insurance claim as directed."
      },
      {
        question: "What if the car breaks down?",
        answer: "If the car breaks down: 1) Pull over safely, 2) Contact the car owner immediately, 3) Call Elite Drive 24/7 roadside assistance at +63 923 456 7890, 4) We'll arrange towing and replacement if needed. Don't attempt major repairs yourself."
      },
      {
        question: "How do you ensure user safety?",
        answer: "We ensure safety through: 1) Identity verification for all users, 2) Driver's license validation, 3) Vehicle safety inspections, 4) User ratings and reviews, 5) Secure payment processing, 6) 24/7 customer support and emergency assistance."
      },
      {
        question: "What insurance coverage is included?",
        answer: "Basic coverage includes: 1) Third-party liability insurance, 2) Comprehensive vehicle insurance. Optional add-ons: 1) Personal accident insurance, 2) Zero deductible coverage, 3) Theft protection. Always review specific coverage details before booking."
      }
    ],
    support: [
      {
        question: "How can I contact customer support?",
        answer: "You can reach us through: 1) Live chat on our website/app (7 AM-10 PM daily), 2) Email at support@elitedrive.com (24-hour response), 3) Phone at +63 912 345 6789 (8 AM-8 PM weekdays, 9 AM-6 PM weekends), 4) Help Center with self-service resources."
      },
      {
        question: "What if I have a dispute with the car owner?",
        answer: "For disputes: 1) First try to resolve directly with the owner, 2) If unresolved, contact Elite Drive support, 3) We'll mediate and help find a solution, 4) Our dispute resolution process aims for fair outcomes for both parties."
      },
      {
        question: "How do I report a problem with my rental?",
        answer: "Report issues by: 1) Using the in-app reporting feature, 2) Contacting support via chat or phone, 3) Emailing support@elitedrive.com with details, 4) Include photos/videos if applicable. We'll respond within 24 hours and work to resolve the issue."
      },
      {
        question: "Is there emergency assistance available?",
        answer: "Yes, 24/7 emergency assistance is available: 1) Roadside assistance: +63 923 456 7890, 2) Accident reporting: +63 934 567 8901, 3) Medical emergency: 911. These numbers are also available in your booking confirmation and app."
      },
      {
        question: "How quickly will support respond?",
        answer: "Response times: 1) Live chat: Immediate during business hours, 2) Phone: Immediate during business hours, 3) Email: Within 24 hours, 4) Emergency calls: Immediate 24/7. Priority support is available for active rentals."
      }
    ]
  };

  const toggleQuestion = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const popularQuestions = [
    "What do I need to rent a car?",
    "How do I book a car?",
    "Are the cars safe and insured?",
    "What payment methods are accepted?",
    "How can I contact customer support?"
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
              <HelpCircle className="w-10 h-10 text-coral" />
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
              Frequently Asked <span className="text-coral">Questions</span>
            </h1>
            <p className="text-xl text-silver-100 max-w-3xl mx-auto">
              Find answers to common questions about Elite Drive's car rental services.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-12 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-2xl font-bold text-center mb-8 text-charcoal">
            Popular <span className="text-coral">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularQuestions.map((question, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories and Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Navigation */}
            <div className="lg:col-span-1">
              <h3 className="font-poppins text-lg font-semibold mb-6 text-charcoal">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setExpandedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      expandedCategory === category.id
                        ? 'bg-coral bg-opacity-10 text-coral border-l-4 border-coral'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`inline-flex items-center justify-center w-8 h-8 ${category.color} bg-opacity-10 rounded-full`}>
                        <category.icon className={`w-4 h-4 ${category.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Questions and Answers */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {faqData[expandedCategory].map((faq, index) => {
                  const isExpanded = expandedQuestions[`${expandedCategory}-${index}`];
                  return (
                    <div key={index} className="bg-softwhite rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(expandedCategory, index)}
                        className="w-full p-6 text-left hover:bg-white transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-poppins text-lg font-semibold text-charcoal pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-coral" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-coral" />
                            )}
                          </div>
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gradient-to-r from-coral to-red-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <Phone className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-white/80 text-sm mb-3">+63 912 345 6789</p>
              <p className="text-white/60 text-xs">Daily: 7AM-10PM</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <Mail className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-white/80 text-sm mb-3">support@elitedrive.com</p>
              <p className="text-white/60 text-xs">Response within 24 hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <HelpCircle className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-white/80 text-sm mb-3">Available on app & website</p>
              <p className="text-white/60 text-xs">Daily: 7AM-10PM</p>
            </div>
          </div>
          <Link 
            to="/help"
            className="inline-block bg-white text-coral font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Visit Help Center
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-2xl font-bold text-center mb-12 text-charcoal">
            Related <span className="text-coral">Resources</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/about" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <Users className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">About Us</h3>
              <p className="text-gray-600 text-sm">Learn more about Elite Drive</p>
            </Link>
            <Link to="/help" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <Phone className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm">Comprehensive support resources</p>
            </Link>
            <Link to="/terms" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <FileText className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">Terms & Conditions</h3>
              <p className="text-gray-600 text-sm">Service terms and policies</p>
            </Link>
            <Link to="/privacy" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <Shield className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">Privacy Policy</h3>
              <p className="text-gray-600 text-sm">How we protect your data</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
