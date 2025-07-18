"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ContactModal from '@/components/ContactModal';
import { 
  Calculator, 
  Home as HomeIcon, 
  Shield, 
  Clock, 
  Award, 
  Users,
  Star,
  TrendingUp,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';

export default function HomePage() {
  const [loanAmount, setLoanAmount] = useState('400000');
  const [zipCode, setZipCode] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#004733] flex items-center">
                <HomeIcon className="w-8 h-8 mr-2" />
                HomeLend
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#004733] transition-colors">Home</Link>
              <Link href="/about-us" className="text-gray-700 hover:text-[#004733] transition-colors">About Us</Link>
              <Link href="/mortgage-calculator" className="text-gray-700 hover:text-[#004733] transition-colors">Calculator</Link>
              <Link href="/start" className="text-gray-700 hover:text-[#004733] transition-colors">Get Started</Link>
            </div>
            <div className="flex items-center space-x-4">
              <ContactModal>
                <Button variant="outline" className="border-[#004733] text-[#004733] hover:bg-[#004733] hover:text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 123-HOME
                </Button>
              </ContactModal>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                The smartest way to buy your home
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Get pre-approved in as little as 3 minutes with our digital mortgage experience. 
                Lower rates, faster closings, and a team of experts ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/start">
                  <Button size="lg" className="bg-white text-[#004733] hover:bg-gray-100 font-semibold px-8">
                    Get Started
                  </Button>
                </Link>
                <Link href="/mortgage-calculator">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#004733] px-8">
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Payment
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Quick Rate Check</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Amount</label>
                  <Input
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    placeholder="$400,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    placeholder="Enter ZIP code"
                  />
                </div>
                <Button className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white">
                  See My Rate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why choose HomeLend?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the mortgage industry with technology, transparency, and exceptional service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-[#004733] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3-Minute Pre-approval</h3>
                <p className="text-gray-600">
                  Get pre-approved in minutes, not days. Our streamlined process gets you answers fast.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-[#017848] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lower Rates</h3>
                <p className="text-gray-600">
                  Save thousands with our competitive rates and low fees. No hidden costs, ever.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Support</h3>
                <p className="text-gray-600">
                  Our team of mortgage experts is here to guide you through every step of the process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#004733] mb-2">$50B+</div>
              <div className="text-gray-600">Funded in loans</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#004733] mb-2">100K+</div>
              <div className="text-gray-600">Happy customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#004733] mb-2">4.8★</div>
              <div className="text-gray-600">Customer rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#004733] mb-2">20 Days</div>
              <div className="text-gray-600">Average close time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What our customers say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "HomeLend made buying our first home so easy. The process was smooth, 
                    rates were competitive, and the team was incredibly helpful."
                  </p>
                  <div className="font-semibold">Sarah & Mike Johnson</div>
                  <div className="text-sm text-gray-500">San Francisco, CA</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#004733] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of happy homeowners who chose HomeLend for their mortgage needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start">
              <Button size="lg" className="bg-white text-[#004733] hover:bg-gray-100 font-semibold px-8">
                Get Pre-approved
              </Button>
            </Link>
            <Link href="/mortgage-calculator">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#004733] px-8">
                Calculate Payment
              </Button>
            </Link>
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
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                <li><Link href="/start" className="hover:text-white transition-colors">Get Pre-approved</Link></li>
                <li><Link href="/refinance" className="hover:text-white transition-colors">Refinance</Link></li>
                <li><Link href="/heloc" className="hover:text-white transition-colors">HELOC</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal" className="hover:text-white transition-colors">Legal</Link></li>
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