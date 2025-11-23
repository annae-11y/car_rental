import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  Star,
  Car,
  Target,
  Zap,
  Heart,
  Lightbulb,
  CheckCircle,
  Globe
} from 'lucide-react';
import logo from '../assets/logos/final logo EliteDrive.png';
import posterImage from '../assets/images/poster elite drive.png';

const AboutUs = () => {
  const team = [
    {
      name: "Antonio Martinez",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Visionary leader with 15+ years in automotive industry"
    },
    {
      name: "Sarah Chen",
      role: "COO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      description: "Operations expert focused on customer experience excellence"
    },
    {
      name: "Miguel Santos",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Tech innovator driving digital transformation"
    },
    {
      name: "Lisa Rodriguez",
      role: "Head of Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Dedicated to ensuring exceptional customer service"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Vehicle Fleet", icon: Car },
    { number: "50+", label: "Local Partners", icon: Globe },
    { number: "4.9/5", label: "Average Rating", icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Every vehicle undergoes rigorous safety inspections and regular maintenance to ensure your peace of mind."
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "We put our customers at the heart of everything we do, providing personalized service and support."
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description: "Leveraging technology to make car rental seamless, efficient, and enjoyable for everyone."
    },
    {
      icon: Award,
      title: "Excellence Guaranteed",
      description: "Committed to delivering premium service quality that exceeds expectations every time."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-800 to-charcoal text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-coral rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl">
                  <img 
                    src={logo} 
                    alt="Elite Drive logo" 
                    className="w-full h-full object-cover scale-125 transition-transform duration-300" 
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-coral rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="font-poppins text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg">
              About <span className="text-coral">Elite Drive</span>
            </h1>
            <p className="text-xl text-silver-100 max-w-3xl mx-auto">
              Transforming car rental experience in Biliran through innovation, trust, and exceptional service since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Poster Section */}
      <section className="py-20 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-coral/10 px-4 py-2 rounded-full mb-4">
              <Zap className="w-5 h-5 text-coral" />
              <span className="font-semibold text-coral">Special Promotion</span>
            </div>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold leading-tight text-charcoal mb-4">
              Elite Drive <span className="text-coral">Exclusive Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our premium services with this limited-time promotion
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Poster on the left */}
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-coral to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img 
                    src={posterImage}
                    alt="Elite Drive Professional Car Service Poster"
                    className="w-full h-auto object-contain"
                  />
                  
                  {/* Promotion Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span className="font-bold">LIMITED TIME</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description on the right */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-4">
                <h3 className="font-poppins text-3xl font-bold text-charcoal">
                  Drive Your Dreams with <span className="text-coral">Elite Drive</span>
                </h3>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Experience luxury car rental at its finest. Our premium fleet features the latest models equipped with cutting-edge technology, ensuring your journey is both comfortable and memorable.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal mb-1">Premium Quality Guarantee</h4>
                      <p className="text-gray-600">All vehicles undergo 50+ point inspection and regular maintenance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal mb-1">Award-Winning Service</h4>
                      <p className="text-gray-600">Recognized as Biliran's #1 car rental service for 3 consecutive years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal mb-1">24/7 Customer Support</h4>
                      <p className="text-gray-600">Round-the-clock assistance for all your rental needs</p>
                    </div>
                  </div>
                </div>
                
                {/* Special Offer Box */}
                <div className="bg-gradient-to-r from-coral to-red-500 p-6 rounded-xl text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-xl">Special Offer</h4>
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold">EXCLUSIVE</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">10% OFF</div>
                  <p className="text-white/90 mb-4">On your first rental with us</p>
                  <div className="text-sm text-white/80 mb-4">
                    Use code: <span className="font-mono bg-white/20 px-2 py-1 rounded">ELITE10</span>
                  </div>
                  <p className="text-xs text-white/70">*Valid until December 31, 2025. Terms and conditions apply.</p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/cars"
                    className="inline-flex items-center justify-center bg-coral text-white font-semibold px-8 py-4 rounded-xl hover:bg-red-500 transition-all shadow-lg"
                  >
                    <Car className="w-5 h-5 mr-2" />
                    Book Now & Save 10%
                  </Link>
                  <Link 
                    to="/register"
                    className="inline-flex items-center justify-center bg-white text-coral border-2 border-coral font-semibold px-8 py-4 rounded-xl hover:bg-coral hover:text-white transition-all"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Elite Club
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-coral bg-opacity-10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-coral" />
                </div>
                <div className="font-poppins text-3xl font-bold text-charcoal mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-poppins text-4xl font-bold text-charcoal">
                Our <span className="text-coral">Story</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Elite Drive was born from a simple observation: car rental in Biliran was fragmented, unreliable, and lacked the modern touch that customers deserved. Our founder, Antonio Martinez, experienced firsthand the frustrations of renting vehicles for business trips and family vacations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In 2020, we set out to revolutionize the industry by creating a platform that connects trusted vehicle owners with customers needing reliable transportation. We've grown from a small startup with just 10 vehicles to Biliran's premier car rental service, serving thousands of satisfied customers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Elite Drive stands as a testament to what's possible when you combine cutting-edge technology with genuine care for customers and community.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="Modern car rental service"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-coral text-white p-6 rounded-xl shadow-xl">
                <div className="font-poppins text-2xl font-bold mb-2">4+ Years</div>
                <div className="text-sm">Of Excellence in Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-r from-coral to-red-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins text-3xl font-bold">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                To provide exceptional car rental experiences by connecting customers with verified, high-quality vehicles while empowering local vehicle owners to generate sustainable income.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins text-3xl font-bold">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To become the most trusted and innovative car rental platform in the Philippines, setting new standards for quality, convenience, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-4xl font-bold text-center mb-12 text-charcoal">
            Our Core <span className="text-coral">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-coral bg-opacity-10 rounded-full">
                  <value.icon className="w-8 h-8 text-coral" />
                </div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-4xl font-bold text-center mb-12 text-charcoal">
            Meet Our <span className="text-coral">Leadership Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal">{member.name}</h3>
                <p className="text-coral font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-charcoal via-gray-800 to-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Elite Drive?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-silver-100">
            Join thousands of satisfied customers who trust us for their transportation needs in Biliran.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/cars"
              className="inline-block bg-coral text-white font-semibold px-8 py-4 rounded-xl hover:bg-red-500 transition-all shadow-lg"
            >
              Browse Our Fleet
            </Link>
            <Link 
              to="/register"
              className="inline-block bg-white text-charcoal font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="font-poppins text-3xl font-bold text-charcoal">
              Get in <span className="text-coral">Touch</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or want to learn more about Elite Drive? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-coral" />
                <span className="text-gray-700">Naval, Biliran, Philippines</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-coral" />
                <span className="text-gray-700">+63 912 345 6789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-coral" />
                <span className="text-gray-700">info@elitedrive.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
