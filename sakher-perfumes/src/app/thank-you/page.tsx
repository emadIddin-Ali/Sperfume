import Link from 'next/link';
import Header from '@/components/Header';
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          </div>

          {/* Thank You Message */}
          <h1 className="font-display text-4xl font-semibold text-text-primary mb-4">
            Thank You for Your Order!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            We have received your order and are processing it. You will receive a confirmation email shortly.
          </p>

          {/* Email Notification */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Mail className="h-6 w-6 text-blue-600" />
              <h3 className="font-medium text-blue-900">Email Confirmation</h3>
            </div>
            <p className="text-blue-800">
              We've sent a confirmation email with your order details. 
              Please check your inbox (and spam folder) for the confirmation.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-display text-lg font-semibold text-text-primary mb-4">
              What happens next?
            </h3>
            <div className="text-left space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-gray-700">
                  We'll review your order and prepare it for processing
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-700">
                  You'll receive updates about your order status via email
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-gray-700">
                  Our team will contact you to arrange delivery details
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
            
            <a
              href="mailto:info@sakherperfumes.com"
              className="inline-flex items-center space-x-2 border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Demo Note */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Demo Note:</strong> This is a demonstration website. No actual orders will be processed or products shipped.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 