import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="max-padd-container py-24">
      
      {/* TITLE */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Privacy <span className="text-secondary">Policy</span>
        </h1>
        <p className="text-gray-600">
          Your privacy is important to us. This policy explains how VC Tutor collects, uses and protects your information.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700">

        {/* SECTION 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            We collect personal information such as your name, email address,
            phone number, and learning preferences when you register on VC Tutor.
          </p>
        </div>

        {/* SECTION 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>
            Your information is used to provide personalized tutoring services,
            improve our platform, and communicate important updates regarding your sessions.
          </p>
        </div>

        {/* SECTION 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">3. Data Protection</h2>
          <p>
            We implement security measures to protect your personal data from unauthorized access,
            disclosure, or misuse.
          </p>
        </div>

        {/* SECTION 4 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
          <p>
            We do not sell or share your personal information with third parties,
            except when required by law or to provide our services.
          </p>
        </div>

        {/* SECTION 5 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
          <p>
            Our platform may use cookies to enhance user experience and analyze site traffic.
          </p>
        </div>

        {/* SECTION 6 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information at any time.
          </p>
        </div>

        {/* SECTION 7 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
          <p>
            VC Tutor reserves the right to update this privacy policy at any time.
            Changes will be posted on this page.
          </p>
        </div>

        {/* SECTION 8 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            If you have any questions regarding this policy, please contact us at:
          </p>
          <p className="mt-2 font-medium">support@vctutor.com</p>
        </div>

      </div>

    </section>
  );
};

export default PrivacyPolicy;