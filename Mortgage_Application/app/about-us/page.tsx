"use client";
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp,
  Phone,
  Mail,
  Linkedin,
  Shield,
  Heart,
  Lightbulb
} from 'lucide-react';

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      bio: "Former Goldman Sachs executive with 15+ years in financial services."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      bio: "Tech veteran who previously led engineering at Stripe and Airbnb."
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      bio: "Operations expert focused on streamlining the mortgage process."
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      bio: "Product leader passionate about creating exceptional user experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#004733] flex items-center">
                <Home className="w-8 h-8 mr-2" />
                HomeLend
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#004733] transition-colors">Home</Link>
              <Link href="/about-us" className="text-[#004733] font-semibold">About Us</Link>
              <Link href="/mortgage-calculator" className="text-gray-700 hover:text-[#004733] transition-colors">Calculator</Link>
              <Link href="/start" className="text-gray-700 hover:text-[#004733] transition-colors">Get Started</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-[#004733] text-[#004733] hover:bg-[#004733] hover:text-white">
                <Phone className="w-4 h-4 mr-2" />
                (555) 123-HOME
              </Button>
              <Link href="/start">
                <Button className="bg-[#004733] text-white hover:bg-[#017848]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#004733] to-[#017848] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            About HomeLend
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            We're on a mission to make homeownership accessible to everyone through 
            technology, transparency, and exceptional service.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At HomeLend, we believe that everyone deserves a fair shot at homeownership. That's why we've 
                built a digital-first mortgage experience that eliminates the traditional barriers 
                and frustrations of getting a home loan.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our technology-driven approach means faster approvals, lower costs, and a 
                transparent process that puts you in control of your homebuying journey.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#004733] mb-2">$50B+</div>
                  <div className="text-gray-600">Loans Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#004733] mb-2">100K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#004733] mb-2">4.8★</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <img 
                src="https://images.pexels.com/photos/7821513/pexels-photo-7821513.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Team collaboration" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-[#004733] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Transparency</h3>
                <p className="text-gray-600">
                  No hidden fees, no surprises. We believe in complete transparency 
                  throughout the entire mortgage process.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-[#017848] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge technology to simplify and improve 
                  the traditional mortgage experience.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Customer-First</h3>
                <p className="text-gray-600">
                  Every decision we make is guided by what's best for our customers 
                  and their homeownership dreams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the experts behind HomeLend</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                  <p className="text-[#004733] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">HomeLend's Journey</h2>
          </div>
          <div className="space-y-8">
            <div className="flex items-center space-x-8">
              <div className="bg-[#004733] text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
                2016
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Company Founded</h3>
                <p className="text-gray-600">HomeLend was founded with a vision to digitize the mortgage industry.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="bg-[#017848] text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
                2018
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">$1B in Loans</h3>
                <p className="text-gray-600">Reached our first billion dollars in funded loans.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="bg-[#FF6B35] text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
                2021
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">National Expansion</h3>
                <p className="text-gray-600">Expanded to serve customers in all 50 states.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="bg-[#004733] text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
                2025
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">$50B+ Funded</h3>
                <p className="text-gray-600">Celebrating over $50 billion in loans funded and 100,000+ happy customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#004733] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to experience HomeLend?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of satisfied customers who chose HomeLend for their mortgage needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start">
              <Button size="lg" className="bg-white text-[#004733] hover:bg-gray-100 font-semibold px-8">
                Get Pre-approved
              </Button>
            </Link>
            <ContactModal>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#004733] px-8">
                <Phone className="w-5 h-5 mr-2" />
                Talk to an Expert
              </Button>
            </ContactModal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">HomeLend</div>
              <p className="text-gray-400 mb-4">
                Making homeownership simpler, faster, and more accessible for everyone.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                <li><Link href="/start" className="hover:text-white transition-colors">Get Pre-approved</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Refinance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HELOC</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HomeLend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}