"use client";

import { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import ContactModal from '@/components/ContactModal';
import { 
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Home as HomeIcon,
  DollarSign,
  User,
  MapPin,
  CheckCircle,
  Clock
} from 'lucide-react';

// Validation schemas for each step
const step1Schema = z.object({
  homePrice: z.string().min(1, "Home price is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, "Must be a valid positive number"),
  downPayment: z.string().min(1, "Down payment is required").refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Must be a valid number"),
  loanPurpose: z.string().min(1, "Please select loan purpose"),
  propertyType: z.string().min(1, "Please select property type"),
  occupancy: z.string().min(1, "Please select occupancy type"),
});

const step2Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(9, "SSN must be at least 9 characters"),
});

const step3Schema = z.object({
  annualIncome: z.string().min(1, "Annual income is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, "Must be a valid positive number"),
  monthlyDebt: z.string().refine(val => val === '' || (!isNaN(Number(val)) && Number(val) >= 0), "Must be a valid number"),
  employmentStatus: z.string().min(1, "Please select employment status"),
  employer: z.string().min(1, "Employer is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  yearsEmployed: z.string().min(1, "Years employed is required").refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Must be a valid number"),
});

const step4Schema = z.object({
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
  agreeCreditCheck: z.boolean().refine(val => val === true, "You must authorize credit check"),
});

export default function StartPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Step 1: Home & Loan Details
    homePrice: '',
    downPayment: '',
    loanPurpose: '',
    propertyType: '',
    occupancy: '',
    
    // Step 2: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    
    // Step 3: Financial Information
    annualIncome: '',
    monthlyDebt: '',
    employmentStatus: '',
    employer: '',
    jobTitle: '',
    yearsEmployed: '',
    
    // Step 4: Property & Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Agreements
    agreeTerms: false,
    agreeCreditCheck: false,
    agreeMarketing: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | boolean) => {
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number) => {
    let schema;
    let dataToValidate;
    
    switch (step) {
      case 1:
        schema = step1Schema;
        dataToValidate = {
          homePrice: formData.homePrice,
          downPayment: formData.downPayment,
          loanPurpose: formData.loanPurpose,
          propertyType: formData.propertyType,
          occupancy: formData.occupancy,
        };
        break;
      case 2:
        schema = step2Schema;
        dataToValidate = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          ssn: formData.ssn,
        };
        break;
      case 3:
        schema = step3Schema;
        dataToValidate = {
          annualIncome: formData.annualIncome,
          monthlyDebt: formData.monthlyDebt,
          employmentStatus: formData.employmentStatus,
          employer: formData.employer,
          jobTitle: formData.jobTitle,
          yearsEmployed: formData.yearsEmployed,
        };
        break;
      case 4:
        schema = step4Schema;
        dataToValidate = {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          agreeTerms: formData.agreeTerms,
          agreeCreditCheck: formData.agreeCreditCheck,
        };
        break;
      default:
        return true;
    }
    
    try {
      schema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) {
      return;
    }
    
    // In a real app, this would submit to an API
    console.log('Form submitted:', formData);
    alert('Pre-approval application submitted successfully! Our team will contact you within 24 hours.');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's start with your home</h2>
        <p className="text-gray-600">Tell us about the home you want to buy</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="homePrice">Home Price</Label>
          <Input
            id="homePrice"
            type="number"
            placeholder="400,000"
            value={formData.homePrice}
            onChange={(e) => handleInputChange('homePrice', e.target.value)}
            className={`text-lg ${errors.homePrice ? 'border-red-500' : ''}`}
          />
          {errors.homePrice && <p className="text-red-500 text-sm mt-1">{errors.homePrice}</p>}
        </div>

        <div>
          <Label htmlFor="downPayment">Down Payment</Label>
          <Input
            id="downPayment"
            type="number"
            placeholder="80,000"
            value={formData.downPayment}
            onChange={(e) => handleInputChange('downPayment', e.target.value)}
            className={`text-lg ${errors.downPayment ? 'border-red-500' : ''}`}
          />
          {errors.downPayment && <p className="text-red-500 text-sm mt-1">{errors.downPayment}</p>}
        </div>

        <div>
          <Label>What's the purpose of this loan?</Label>
          <RadioGroup 
            value={formData.loanPurpose} 
            onValueChange={(value) => handleInputChange('loanPurpose', value)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="purchase" id="purchase" />
              <Label htmlFor="purchase">Purchase a home</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="refinance" id="refinance" />
              <Label htmlFor="refinance">Refinance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cashout" id="cashout" />
              <Label htmlFor="cashout">Cash-out refinance</Label>
            </div>
          </RadioGroup>
          {errors.loanPurpose && <p className="text-red-500 text-sm mt-1">{errors.loanPurpose}</p>}
        </div>

        <div>
          <Label>Property Type</Label>
          <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single-family">Single Family Home</SelectItem>
              <SelectItem value="condo">Condominium</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="multi-family">Multi-Family (2-4 units)</SelectItem>
            </SelectContent>
          </Select>
          {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
        </div>

        <div>
          <Label>How will you use this property?</Label>
          <RadioGroup 
            value={formData.occupancy} 
            onValueChange={(value) => handleInputChange('occupancy', value)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="primary" id="primary" />
              <Label htmlFor="primary">Primary residence</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="secondary" id="secondary" />
              <Label htmlFor="secondary">Secondary/vacation home</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="investment" id="investment" />
              <Label htmlFor="investment">Investment property</Label>
            </div>
          </RadioGroup>
          {errors.occupancy && <p className="text-red-500 text-sm mt-1">{errors.occupancy}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">We need some basic information about you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="John"
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Smith"
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="john.smith@email.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className={errors.dateOfBirth ? 'border-red-500' : ''}
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
      </div>

      <div>
        <Label htmlFor="ssn">Social Security Number</Label>
        <Input
          id="ssn"
          type="password"
          value={formData.ssn}
          onChange={(e) => handleInputChange('ssn', e.target.value)}
          placeholder="XXX-XX-XXXX"
          className={errors.ssn ? 'border-red-500' : ''}
        />
        {errors.ssn && <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>}
        <p className="text-sm text-gray-500 mt-1">We use bank-level security to protect your information</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Information</h2>
        <p className="text-gray-600">Help us understand your financial situation</p>
      </div>

      <div>
        <Label htmlFor="annualIncome">Annual Income</Label>
        <Input
          id="annualIncome"
          type="number"
          value={formData.annualIncome}
          onChange={(e) => handleInputChange('annualIncome', e.target.value)}
          placeholder="75,000"
          className={errors.annualIncome ? 'border-red-500' : ''}
        />
        {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>}
      </div>

      <div>
        <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
        <Input
          id="monthlyDebt"
          type="number"
          value={formData.monthlyDebt}
          onChange={(e) => handleInputChange('monthlyDebt', e.target.value)}
          placeholder="1,200"
          className={errors.monthlyDebt ? 'border-red-500' : ''}
        />
        {errors.monthlyDebt && <p className="text-red-500 text-sm mt-1">{errors.monthlyDebt}</p>}
        <p className="text-sm text-gray-500 mt-1">Include credit cards, auto loans, student loans, etc.</p>
      </div>

      <div>
        <Label>Employment Status</Label>
        <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select employment status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="employed">Employed</SelectItem>
            <SelectItem value="self-employed">Self-Employed</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="unemployed">Unemployed</SelectItem>
          </SelectContent>
        </Select>
        {errors.employmentStatus && <p className="text-red-500 text-sm mt-1">{errors.employmentStatus}</p>}
      </div>

      <div>
        <Label htmlFor="employer">Employer</Label>
        <Input
          id="employer"
          value={formData.employer}
          onChange={(e) => handleInputChange('employer', e.target.value)}
          placeholder="Company Name"
          className={errors.employer ? 'border-red-500' : ''}
        />
        {errors.employer && <p className="text-red-500 text-sm mt-1">{errors.employer}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            placeholder="Software Engineer"
            className={errors.jobTitle ? 'border-red-500' : ''}
          />
          {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
        </div>
        <div>
          <Label htmlFor="yearsEmployed">Years at Current Job</Label>
          <Input
            id="yearsEmployed"
            type="number"
            value={formData.yearsEmployed}
            onChange={(e) => handleInputChange('yearsEmployed', e.target.value)}
            placeholder="3"
            className={errors.yearsEmployed ? 'border-red-500' : ''}
          />
          {errors.yearsEmployed && <p className="text-red-500 text-sm mt-1">{errors.yearsEmployed}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Location</h2>
        <p className="text-gray-600">Where is the property located?</p>
      </div>

      <div>
        <Label htmlFor="address">Property Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="123 Main Street"
          className={errors.address ? 'border-red-500' : ''}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="San Francisco"
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
              <SelectItem value="WA">Washington</SelectItem>
              {/* Add more states as needed */}
            </SelectContent>
          </Select>
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="94102"
            className={errors.zipCode ? 'border-red-500' : ''}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>
      </div>

      {/* Agreements */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Terms & Agreements</h3>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeTerms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
          />
          <Label htmlFor="agreeTerms" className="text-sm leading-5">
            I agree to the <a href="#" className="text-[#004733] hover:underline">Terms of Service</a> and 
            <a href="#" className="text-[#004733] hover:underline"> Privacy Policy</a>
          </Label>
        </div>
        {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}

        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeCreditCheck"
            checked={formData.agreeCreditCheck}
            onCheckedChange={(checked) => handleInputChange('agreeCreditCheck', checked as boolean)}
          />
          <Label htmlFor="agreeCreditCheck" className="text-sm leading-5">
            I authorize Better to check my credit and verify my information
          </Label>
        </div>
        {errors.agreeCreditCheck && <p className="text-red-500 text-sm mt-1">{errors.agreeCreditCheck}</p>}

        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeMarketing"
            checked={formData.agreeMarketing}
            onCheckedChange={(checked) => handleInputChange('agreeMarketing', checked as boolean)}
          />
          <Label htmlFor="agreeMarketing" className="text-sm leading-5">
            I'd like to receive updates about my application and Better's services
          </Label>
        </div>
      </div>
    </div>
  );

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
              <Link href="/start" className="text-[#004733] font-semibold">Get Started</Link>
            </div>
            <div className="flex items-center space-x-4">
              <ContactModal>
                <Button variant="outline" className="border-[#004733] text-[#004733] hover:bg-[#004733] hover:text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 123-HOME
                </Button>
              </ContactModal>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#004733] to-[#017848] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Get Pre-approved in Minutes
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Start your journey to homeownership with our quick and secure pre-approval process.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#004733]">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="bg-[#004733] text-white hover:bg-[#017848] flex items-center"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.agreeTerms || !formData.agreeCreditCheck}
                    className="bg-[#FF6B35] text-white hover:bg-[#E55A2B] flex items-center"
                  >
                    Submit Application
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Start with HomeLend?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-[#004733] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Approval</h3>
                <p className="text-gray-600">
                  Get pre-approved in as little as 3 minutes with our streamlined digital process.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-[#017848] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Competitive Rates</h3>
                <p className="text-gray-600">
                  Access to some of the most competitive rates in the market with no hidden fees.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
                <p className="text-gray-600">
                  Our team of mortgage experts will guide you through every step of the process.
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