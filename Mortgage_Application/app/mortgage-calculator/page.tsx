"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ContactModal from '@/components/ContactModal';
import { 
  Calculator, 
  Phone,
  Mail,
  Home as HomeIcon,
  DollarSign,
  Percent,
  Calendar,
  PieChart
} from 'lucide-react';

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(4800);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [pmi, setPmi] = useState(200);
  const [hoaFees, setHoaFees] = useState(0);
  const [zipCode, setZipCode] = useState('421005');

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principalAndInterest, setPrincipalAndInterest] = useState(0);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const [monthlyPmi, setMonthlyPmi] = useState(0);
  const [monthlyHoa, setMonthlyHoa] = useState(0);

  // Calculate mortgage payments
  useEffect(() => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate principal and interest
    const pi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
               (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const monthlyTaxAmount = propertyTax / 12;
    const monthlyInsuranceAmount = homeInsurance / 12;
    const monthlyPmiAmount = downPaymentPercent < 20 ? pmi : 0;
    const monthlyHoaAmount = hoaFees;

    setPrincipalAndInterest(pi);
    setMonthlyTax(monthlyTaxAmount);
    setMonthlyInsurance(monthlyInsuranceAmount);
    setMonthlyPmi(monthlyPmiAmount);
    setMonthlyHoa(monthlyHoaAmount);

    const totalMonthly = pi + monthlyTaxAmount + monthlyInsuranceAmount + monthlyPmiAmount + monthlyHoaAmount;
    setMonthlyPayment(totalMonthly);
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, pmi, hoaFees, downPaymentPercent]);

  // Update down payment when percentage changes
  const handleDownPaymentPercentChange = (value: number[]) => {
    const percent = value[0];
    setDownPaymentPercent(percent);
    setDownPayment(homePrice * (percent / 100));
  };

  // Update percentage when down payment amount changes
  const handleDownPaymentAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    setDownPayment(amount);
    setDownPaymentPercent((amount / homePrice) * 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
              <Link href="/mortgage-calculator" className="text-[#004733] font-semibold">Calculator</Link>
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
      <section className="bg-gradient-to-br from-[#004733] to-[#017848] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Mortgage Calculator
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Calculate your monthly mortgage payment and see how different factors affect your costs.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Inputs */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#004733]">
                    <Calculator className="w-6 h-6 mr-2" />
                    Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Home Price */}
                  <div className="space-y-2">
                    <Label htmlFor="homePrice">Home Price</Label>
                    <Input
                      id="homePrice"
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(parseFloat(e.target.value) || 0)}
                      className="text-lg"
                    />
                  </div>

                  {/* Down Payment */}
                  <div className="space-y-4">
                    <Label>Down Payment</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="downPaymentAmount" className="text-sm text-gray-600">Amount</Label>
                        <Input
                          id="downPaymentAmount"
                          type="number"
                          value={downPayment}
                          onChange={(e) => handleDownPaymentAmountChange(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="downPaymentPercent" className="text-sm text-gray-600">Percentage</Label>
                        <div className="space-y-2">
                          <Slider
                            value={[downPaymentPercent]}
                            onValueChange={handleDownPaymentPercentChange}
                            max={50}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                          <div className="text-center text-sm text-gray-600">{downPaymentPercent.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loan Term and Interest Rate */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term</Label>
                      <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="25">25 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {/* ZIP Code */}
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Enter ZIP code for tax estimates"
                    />
                  </div>

                  {/* Additional Costs */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#004733]">Additional Monthly Costs</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyTax">Property Tax (Annual)</Label>
                        <Input
                          id="propertyTax"
                          type="number"
                          value={propertyTax}
                          onChange={(e) => setPropertyTax(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="homeInsurance">Home Insurance (Annual)</Label>
                        <Input
                          id="homeInsurance"
                          type="number"
                          value={homeInsurance}
                          onChange={(e) => setHomeInsurance(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pmi">PMI (Monthly)</Label>
                        <Input
                          id="pmi"
                          type="number"
                          value={pmi}
                          onChange={(e) => setPmi(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hoaFees">HOA Fees (Monthly)</Label>
                        <Input
                          id="hoaFees"
                          type="number"
                          value={hoaFees}
                          onChange={(e) => setHoaFees(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Monthly Payment Summary */}
              <Card className="bg-[#004733] text-white">
                <CardHeader>
                  <CardTitle className="text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-2" />
                    Monthly Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {formatCurrency(monthlyPayment)}
                    </div>
                    <p className="text-green-100">Total monthly payment</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#004733]">
                    <PieChart className="w-5 h-5 mr-2" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Principal & Interest</span>
                    <span className="font-semibold">{formatCurrency(principalAndInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Property Tax</span>
                    <span className="font-semibold">{formatCurrency(monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Home Insurance</span>
                    <span className="font-semibold">{formatCurrency(monthlyInsurance)}</span>
                  </div>
                  {monthlyPmi > 0 && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">PMI</span>
                      <span className="font-semibold">{formatCurrency(monthlyPmi)}</span>
                    </div>
                  )}
                  {monthlyHoa > 0 && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">HOA Fees</span>
                      <span className="font-semibold">{formatCurrency(monthlyHoa)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Loan Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#004733]">Loan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-semibold">{formatCurrency(homePrice - downPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Down Payment</span>
                    <span className="font-semibold">{formatCurrency(downPayment)} ({downPaymentPercent.toFixed(1)}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-semibold">{formatCurrency((principalAndInterest * loanTerm * 12) - (homePrice - downPayment))}</span>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Ready to get started?</h3>
                  <p className="text-sm mb-4 text-orange-100">Get pre-approved with HomeLend in minutes</p>
                  <Link href="/start">
                    <Button className="w-full bg-white text-[#FF6B35] hover:bg-gray-100">
                      Get Pre-approved
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Your Mortgage Payment</h2>
            <p className="text-lg text-gray-600">Learn what goes into your monthly payment and how to optimize it.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#004733]">Principal & Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This is the core of your mortgage payment. Principal pays down your loan balance, 
                  while interest is the cost of borrowing money. Early in your loan, more goes to interest.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#004733]">Property Taxes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Property taxes are typically collected monthly and held in escrow. The amount varies 
                  by location and is based on your home's assessed value.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#004733]">Home Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Homeowners insurance protects your investment. Lenders require it, and it's typically 
                  paid monthly into escrow along with your mortgage payment.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#004733]">PMI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Private Mortgage Insurance (PMI) is required when you put down less than 20%. 
                  It can be removed once you reach 20% equity in your home.
                </p>
              </CardContent>
            </Card>
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
            <p>&copy; 2025 Better. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}