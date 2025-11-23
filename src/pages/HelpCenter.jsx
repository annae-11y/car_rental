import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Car,
  Shield,
  CreditCard,
  FileText,
  Search,
  ChevronRight,
  HelpCircle,
  Headphones,
  BookOpen,
  Users
} from 'lucide-react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle, color: 'bg-gray-500' },
    { id: 'booking', name: 'Booking & Reservations', icon: Car, color: 'bg-coral' },
    { id: 'payment', name: 'Payment & Billing', icon: CreditCard, color: 'bg-green-500' },
    { id: 'account', name: 'Account Management', icon: Users, color: 'bg-blue-500' },
    { id: 'safety', name: 'Safety & Insurance', icon: Shield, color: 'bg-purple-500' },
    { id: 'technical', name: 'Technical Support', icon: BookOpen, color: 'bg-orange-500' }
  ];

  const helpArticles = [
    {
      id: 1,
      category: 'booking',
      title: 'How to Book a Car',
      description: 'Step-by-step guide to reserving your perfect vehicle',
      content: 'Learn how to search, select, and book cars on our platform with ease.',
      views: 1234
    },
    {
      id: 2,
      category: 'booking',
      title: 'Canceling Your Reservation',
      description: 'Understanding our cancellation policy and process',
      content: 'Find out how to cancel your booking and what refund options are available.',
      views: 892
    },
    {
      id: 3,
      category: 'payment',
      title: 'Payment Methods Accepted',
      description: 'All payment options and processing times',
      content: 'Discover which payment methods we accept and how transactions are processed.',
      views: 1567
    },
    {
      id: 4,
      category: 'payment',
      title: 'Understanding Service Fees',
      description: 'Breakdown of all costs and charges',
      content: 'Learn about our transparent pricing structure and what each fee covers.',
      views: 743
    },
    {
      id: 5,
      category: 'account',
      title: 'Updating Your Profile',
      description: 'How to manage your personal information',
      content: 'Step-by-step instructions for updating your account details and preferences.',
      views: 612
    },
    {
      id: 6,
      category: 'account',
      title: 'Verifying Your Account',
      description: 'Complete verification process for enhanced features',
      content: 'Learn about account verification benefits and how to complete the process.',
      views: 890
    },
    {
      id: 7,
      category: 'safety',
      title: 'Vehicle Safety Standards',
      description: 'How we ensure vehicle quality and safety',
      content: 'Discover our rigorous inspection and maintenance protocols.',
      views: 2103
    },
    {
      id: 8,
      category: 'safety',
      title: 'Insurance Coverage',
      description: 'Understanding protection and coverage options',
      content: 'Learn about insurance options and what coverage is included in your rental.',
      views: 1876
    },
    {
      id: 9,
      category: 'technical',
      title: 'Mobile App Troubleshooting',
      description: 'Common issues and solutions for our app',
      content: 'Find solutions to common technical problems with our mobile application.',
      views: 543
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactOptions = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+63 912 345 6789',
      hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM',
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed inquiries',
      contact: 'support@elitedrive.com',
      hours: 'Response within 24 hours',
      color: 'bg-blue-500'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant help from our team',
      contact: 'Available on website and app',
      hours: 'Daily: 7AM-10PM',
      color: 'bg-purple-500'
    }
  ];

  const emergencyContacts = [
    {
      title: 'Roadside Assistance',
      number: '+63 923 456 7890',
      description: '24/7 emergency vehicle assistance'
    },
    {
      title: 'Accident Reporting',
      number: '+63 934 567 8901',
      description: 'Report accidents immediately'
    },
    {
      title: 'Medical Emergency',
      number: '911',
      description: 'Call for medical emergencies'
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
              <Headphones className="w-10 h-10 text-coral" />
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
              Help <span className="text-coral">Center</span>
            </h1>
            <p className="text-xl text-silver-100 max-w-3xl mx-auto">
              Find answers, get support, and access resources to make your Elite Drive experience seamless.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 bg-softwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-2xl font-bold text-charcoal mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-coral bg-coral bg-opacity-10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${category.color} bg-opacity-10 rounded-full mb-3`}>
                  <category.icon className={`w-6 h-6 ${category.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="text-sm font-medium text-charcoal">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Help Articles */}
      <section className="py-12 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-2xl font-bold text-charcoal mb-8">
            {selectedCategory === 'all' ? 'All Help Articles' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center w-10 h-10 ${
                      categories.find(c => c.id === article.category)?.color || 'bg-gray-500'
                    } bg-opacity-10 rounded-full`}>
                      {React.createElement(
                        categories.find(c => c.id === article.category)?.icon || HelpCircle,
                        { className: `w-5 h-5 ${(categories.find(c => c.id === article.category)?.color || 'bg-gray-500').replace('bg-', 'text-')}` }
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins text-lg font-semibold text-charcoal mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.views} views</span>
                      <button className="text-coral hover:text-coral-600 font-medium text-sm flex items-center space-x-1">
                        <span>Read more</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl font-bold text-center mb-12 text-charcoal">
            Contact <span className="text-coral">Support</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div key={index} className="text-center space-y-4 p-8 bg-softwhite rounded-xl">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${option.color} bg-opacity-10 rounded-full`}>
                  <option.icon className={`w-8 h-8 ${option.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
                <div className="space-y-2">
                  <p className="font-medium text-charcoal">{option.contact}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{option.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl font-bold text-center mb-12">
            Emergency <span className="text-white">Contacts</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((emergency, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="font-poppins text-xl font-semibold mb-2">{emergency.title}</h3>
                <p className="text-2xl font-bold mb-2">{emergency.number}</p>
                <p className="text-white/80 text-sm">{emergency.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-white/80 text-sm">
              For non-urgent matters, please use our regular support channels above.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-2xl font-bold text-center mb-12 text-charcoal">
            Quick <span className="text-coral">Links</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/faq" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <HelpCircle className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">FAQ</h3>
              <p className="text-gray-600 text-sm">Frequently asked questions</p>
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
            <Link to="/about" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <Users className="w-8 h-8 text-coral mx-auto mb-3" />
              <h3 className="font-poppins font-semibold text-charcoal mb-2">About Us</h3>
              <p className="text-gray-600 text-sm">Learn more about Elite Drive</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
