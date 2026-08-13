import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen px-4 py-12 bg-slate-50 text-slate-800 sm:py-16">
      <div className="max-w-4xl p-8 mx-auto space-y-10 bg-white border shadow-sm sm:p-12 rounded-3xl border-slate-200">
        
        {/* Main Title */}
        <div className="pb-6 text-center border-b border-slate-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0284c7]">
            Terms and Conditions
          </h1>
        </div>

        {/* SECTION 1: About this Agreement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0284c7]">1. About this Agreement</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">1.1. Overview</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              This Agreement sets out the terms and conditions that apply to your donation subscription (subscription fees) with Cambodian Amanah Takaful Association (CATA). The following terms also apply to your Subscription:
            </p>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>The terms of use for any websites or mobile apps covered by your Subscription;</li>
              <li>
                our Privacy Policy (
                <a href="https://takafulcambodia.org/privacy-policy-2/" target="_blank" rel="noopener noreferrer" className="text-[#0284c7] underline hover:text-[#0369a1]">
                  https://takafulcambodia.org/privacy-policy-2/
                </a>
                ).
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">1.2. This Agreement is Binding</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>You warrant that you are of legal age, and are authorised to, enter into this agreement and be bound by it.</li>
              <li>
                If you are entering into this agreement on behalf of a company or other legal entity, you warrant that:
                <ul className="pl-6 mt-1 space-y-1 list-lower-roman">
                  <li>you have full legal authority to bind that legal entity; and</li>
                  <li>both you and the relevant legal entity will be bound by the terms set out under this agreement.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">1.3. Duration</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              This agreement commences on the subscription Activation Date and continues until:
            </p>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>you terminate this Agreement under clause 1.4; or</li>
              <li>CATA terminates this Agreement under clause 12.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">1.4. Termination/Cancellation by Subscriber</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              You can terminate this Agreement at any time by:
            </p>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>
                Cancelling your subscription online by visiting: {' '}
                <a href="https://takafulcambodia.org/cancel" target="_blank" rel="noopener noreferrer" className="text-[#0284c7] underline hover:text-[#0369a1]">
                  https://takafulcambodia.org/cancel
                </a> {' '}
                and following the prompts for immediate cancellation; or
              </li>
              <li>
                By contacting CATA via email: {' '}
                <a href="mailto:info@takafulcambodia.org" className="text-[#0284c7] underline hover:text-[#0369a1]">
                  info@takafulcambodia.org
                </a>
                , please note, cancellation will take between 2-7 business days through this method;
              </li>
              <li>Once you have successfully unsubscribed, you will receive an email confirmation to the email address registered under the Subscription, that you have successfully been unsubscribed. Your subscription will remain active until you opt out from the subscription voluntarily.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: Managing your Subscription */}
        <section className="pt-4 space-y-4 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">2. Managing your Subscription</h2>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">2.1 Automatic Renewal of Subscribed Donation Products</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>If you pay CATA the applicable donation amount, the subscribed donation or project will be assigned accordingly during the Subscription Term as set out in this agreement.</li>
              <li>Your Subscription for the Subscribed Donation Product (donation) will be automatically renewed every Subscription Period according to the Subscription Period nominated by you at the commencement of your subscription (except as set out in clauses 1.4, 11 and 12).</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">2.2 Subscribing to Other Donation Products</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>
                During the Term, you can subscribe to other Donation Products by:
                <ul className="pl-6 mt-1 space-y-1 list-lower-roman">
                  <li>adding the Donation Product to your Subscription via the MATW website (or by contacting MATW via email and confirming in writing that you wish to subscribe to an additional Donation Product of your choice); and</li>
                  <li value={3}>paying MATW the fees for that Donation Product.</li>
                </ul>
              </li>
              <li>The Donation Product will become a Subscribed Product from the date MATW confirms in writing the acceptance of your Subscription for that Donation Product.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">2.3 Un-subscribing from a Subscribed Product</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              You can unsubscribe from any Subscribed Donation Product at any time through the steps outlined in clause 1.4 above.
            </p>
          </div>
        </section>

        {/* SECTION 3: Website Access and Email Alerts */}
        <section className="pt-4 space-y-4 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">3. Website Access and Email Alerts</h2>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">3.1 Application of this Clause</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">This clause 3 applies to any:</p>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>email alerts, that form part of any Subscribed Donation, and</li>
              <li>access to Secure Areas of the Websites.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">3.2 Email Alerts</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>You will receive emails alerts relating to your Subscription, including receipts and project updates, as well as promotional information unless you have requested otherwise.</li>
              <li>Your email alerts will be emailed to the email addresses that you provide us with while completing your Subscription.</li>
              <li>
                To change the email addresses for receiving email alerts, please contact {' '}
                <a href="mailto:info@takafulcambodia.org" className="text-[#0284c7] underline hover:text-[#0369a1]">
                  info@takafulcambodia.org
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">3.3 Access to Websites</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>We will provide you secure access to the MATW Website where you will be able to register your details subscribe to donation products of your choice.</li>
              <li>
                If we provide you with any credentials or you register a username and password:
                <ul className="pl-6 mt-1 space-y-1 list-lower-roman">
                  <li>you must keep them confidential, and not disclose them to any person,</li>
                  <li>you are responsible for all acts and omissions in connection with the Websites, the Subscribed Products and this agreement that are carried out using your credentials as if they were your acts and omissions.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">3.4 No Guaranteed Access</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>By its nature, the internet is not uninterrupted or error-free, and so there may be times when the Websites are unavailable or do not work properly due to technical difficulties, or when our email alerts are delayed.</li>
              <li>
                We cannot guarantee that:
                <ul className="pl-6 mt-1 space-y-1 list-lower-roman">
                  <li value={2}>The relevant Websites will be available or working correctly at all times; or</li>
                  <li>Email alerts will always be sent out on time.</li>
                </ul>
              </li>
              <li>We cannot guarantee that the Websites or email alerts will be free from computer viruses or other defects or errors which may affect your software or systems. To protect your software and systems we suggest you install and implement your own system protection software.</li>
              <li>You acknowledge that some of our content may not be viewable or accessible outside of Cambodia.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">3.5 Our Right to Change Subscribed Products</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              We reserve the right to modify the donation product and the availability of any subscribed products at any time. In the event your subscription changes, you will be given 14 days’ notice prior to when you would need to make a decision either to cancel or continue with the updated donation subscription and not be affected. Your subscription change will automatically take place from your next subscription period.
            </p>
          </div>
        </section>

        {/* SECTION 4: Fees and Payments */}
        <section className="pt-4 space-y-4 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">4. Fees and Payments</h2>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">4.1 Fees</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">You agree to pay CATA:</p>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>the Subscription Fees for the Subscription Period for each subscribed Donation Product, payable in advance.</li>
              <li>Payments can me made online either using Debit/Credit card.</li>
              <li>You must advise us promptly of any changes to your payment details during the Subscription Term.</li>
              <li>The Subscription options are daily, weekly and monthly. Donation Subscription fees will be collected on the same day/date of their initial payment.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">4.2 Refunds</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              All donation subscription fees are non-refundable, except that a refund of the subscription fee paid is available:
            </p>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>where required by law; or</li>
              <li>
                when a Subscriber serves written notice by emailing {' '}
                <a href="mailto:info@takafulcambodia.org" className="text-[#0284c7] underline hover:text-[#0369a1]">
                  info@takafulcambodia.org
                </a> {' '}
                with evidence of any additional or unauthorised payment that has been paid, aside from the nominated Donation Subscription; or
              </li>
              <li>Change of mind refunds will only be processed under extenuating circumstances and the sole discretion of which rests with CATA;</li>
              <li>For general refunds, refunds not associated with subscriptions, please visit our Refund Statement and Procedure, which can be found at the bottom of this page.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">4.3 Acceptance of Terms</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              Payment of Subscription Fees is full acceptance of these terms and conditions and enters you into a binding agreement.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">4.4 Fees – Nominated Payment Method</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>You agree to pay the subscription fees for each subscribed donation product during the subscription term.</li>
              <li>You are responsible for timely payment of Subscription Fees and for providing us with valid credit card or other Nominated payment method details for the above-mentioned subscription fees to be processed.</li>
              <li>
                We will charge your credit card or nominated payment method for the Donation Product Subscription Fees :
                <ul className="pl-6 mt-1 space-y-1 list-lower-roman">
                  <li>on or after the Activation Date when your Subscription for that Subscribed Donation Product first starts; and</li>
                  <li>After that, at the start of each Subscription Period during the Subscription Term.</li>
                </ul>
              </li>
              <li>We may also charge your credit card or nominated payment method with any missed payments during the Subscription Period.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 5: Ownership of Intellectual Property Rights */}
        <section className="pt-4 space-y-2 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">5. Ownership of Intellectual Property Rights</h2>
          <p className="text-sm leading-relaxed sm:text-base text-slate-600">
            You agree that all rights, titles, and interests (including all intellectual property rights) in the Products and the Websites are owned or licensed by us. The only right that you have in respect of the Products and the Websites is the right to use the Subscribed Products in accordance with this agreement.
          </p>
        </section>

        {/* SECTION 6: Confidentiality */}
        <section className="pt-4 space-y-2 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">6. Confidentiality</h2>
          <p className="text-sm leading-relaxed sm:text-base text-slate-600">
            These terms and conditions and any information that we exchange under them (other than Subscribed Products) are confidential. You must not disclose them except
          </p>
          <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
            <li>to the extent required by law or applicable tax purposes</li>
            <li>to the extent strictly required in connection with legal proceedings or a dispute resolution procedure relating to these terms and conditions; or</li>
            <li>if the information is generally and publicly available otherwise than as a result of a breach of this agreement or another obligation of confidence</li>
          </ul>
        </section>

        {/* SECTION 7: Privacy */}
        <section className="pt-4 space-y-2 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">7. Privacy</h2>
          <p className="text-sm leading-relaxed sm:text-base text-slate-600">
            We may collect some of your personal details, and some of the personal details of Users, and use them to fulfil your Subscription. Unless you notify us otherwise, we may also use those personal details to communicate with you about renewing your Subscription and to notify you of any associated donation products and offers, or future Subscriptions. Our Privacy Policy sets out more information about how we handle personal information of any donors. You may access our privacy policy here – (
            <a href="https://takafulcambodia.org/privacypolicy-2/" target="_blank" rel="noopener noreferrer" className="text-[#0284c7] underline hover:text-[#0369a1]">
              https://takafulcambodia.org/privacypolicy-2/
            </a>
            ).
          </p>
        </section>

        {/* SECTION 8: Accuracy of Information */}
        <section className="pt-4 space-y-2 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">8. Accuracy of Information</h2>
          <p className="text-sm leading-relaxed sm:text-base text-slate-600">
            You are responsible for ensuring that all information you provide to us is accurate and up to date. If there are any errors in your contact information or other details, we are not liable for the consequences that may arise as a result of such errors or incorrect information, including sending any subscribed product to the incorrect address you tell us. To change or update your contact details or other information, please contact the CATA Team via {' '}
            <a href="mailto:info@takafulcambodia.org" className="text-[#0284c7] underline hover:text-[#0369a1]">
              info@takafulcambodia.org
            </a>
            .
          </p>
        </section>

        {/* SECTION 9: Our Liability */}
        <section className="pt-4 space-y-4 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">9. Our Liability</h2>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">9.1 Availability of Donation Products</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>Donation Products are provided to you “as is” and on an “as available” basis and on the condition that you undertake all responsibility for assessing the accuracy and completeness of such products and rely on it at your own risk. All content and information which you access through the Websites may be changed at our sole discretion.</li>
              <li>We are not liable for any indirect or consequential losses or any loss of revenue, loss of profit, loss of business opportunity, economic loss, loss of data or systems, loss of use, or payment of liquidated sums, penalties or damages under any agreement sustained by you or any other person arising from or in connection with this agreement; and</li>
              <li>Our total aggregate liability under or in any way connected with this agreement is limited to the amounts paid by you to us under this agreement in the six months immediately preceding the date on which the claim arose</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">9.2 Exclusions</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>To the extent that you acquire goods or services from us as a consumer within the meaning of the Cambodian Consumer Law, you may have certain rights and remedies (including consumer guarantee rights) that cannot be excluded, restricted, or modified by agreement.</li>
              <li>
                Nothing in this clause 9 operates to exclude, restrict, or modify the application of any implied condition or warranty, provision, the exercise of any right or remedy, or the imposition of any liability under the Cambodian Consumer Law or any other statute where to do so would:
                <ul className="pl-6 mt-1 space-y-1 list-lower-roman">
                  <li>contravene that statute; or</li>
                  <li>cause any term of this agreement to be void, (non-excludable obligation).</li>
                </ul>
              </li>
              <li>Except in relation to non-excludable obligations, all conditions, warranties, guarantees, rights, remedies, liabilities, or other terms that may be implied by custom, under the general law or by statute are expressly excluded under this agreement.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 10: Suspension of Subscription */}
        <section className="pt-4 space-y-2 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">10. Suspension of Subscription</h2>
          <p className="text-sm leading-relaxed sm:text-base text-slate-600">
            We may suspend or cancel your subscription without notice to you if:
          </p>
          <ul className="pl-6 space-y-1 text-sm list-lower-roman sm:text-base text-slate-600">
            <li>You fail to pay the subscribed amount in accordance with this agreement.</li>
            <li>the access or availability of a Subscribed Product becomes unavailable or is no longer possible; or</li>
            <li>we reasonably believe that, during the Subscription Term, the payment is coming from an unlawful source that could induce a potential threat to our organization.</li>
          </ul>
        </section>

        {/* SECTION 11: Termination of Agreement */}
        <section className="pt-4 space-y-4 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">11. Termination of Agreement</h2>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">11.1 Termination</h3>
            <p className="text-sm leading-relaxed sm:text-base text-slate-600">
              We may terminate this agreement immediately by notice in writing if you:
            </p>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>breach any term of this agreement; or</li>
              <li>are no longer subscribed to any Subscribed Product; or</li>
              <li>are part of an unlawful organisation; or</li>
              <li>are making a payment from an unlawful source.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0284c7]">11.2 Effect of Termination</h3>
            <ul className="pl-6 space-y-1 text-sm list-lower-alpha sm:text-base text-slate-600">
              <li>Termination of this agreement will automatically result in the termination of all then-current subscription terms.</li>
              <li>Upon termination of this agreement, you will not be entitled to receive any refund of any part of any subscription fees or other fees paid by you under this agreement.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 12: General */}
        <section className="pt-4 space-y-2 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-[#0284c7]">12. General</h2>
          <ul className="pl-6 space-y-2 text-sm list-lower-alpha sm:text-base text-slate-600">
            <li>This agreement is made up of the Subscription Details and these terms and conditions.</li>
            <li>The law that applies to this agreement and to disputes arising from or in connection with it or the websites is the law of Cambodia. You irrevocably submit to the exclusive jurisdiction of the courts of any Cambodia</li>
            <li>If any provision of these terms and conditions is invalid under the law of any jurisdiction, the provision is enforceable in that jurisdiction to the extent that it is not invalid, whether it is in severable terms or not.</li>
            <li>This does not apply where enforcement of the modified provision would materially affect the nature or effect of the parties’ obligations under these terms and conditions.</li>
            <li>You may not assign your rights under this agreement, or attempt to do so, without our prior written consent (which we may give or withhold at our absolute discretion).</li>
            <li>These terms and conditions cannot be changed except in writing signed by CATA.</li>
            <li>Neither party is liable for any failure to perform or delay in fulfilling its obligations under this agreement if that failure or delay is due to anything beyond that party’s control. This clause does not apply to any obligation to pay money.</li>
          </ul>
        </section>

        {/* REFUNDS POLICY SECTION */}
        <section className="pt-8 space-y-6 border-t-2 border-slate-200">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-[#0284c7]">
              Refunds Policy
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              CATA accepts all donations in good faith, including subscriptions made via our website.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0284c7]">General Refunds</h2>

            {/* Sub-item 1 */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#0284c7]">1. Error (not made by CATA)</h3>
              <ul className="pl-6 space-y-2 text-sm list-lower-alpha sm:text-base text-slate-600">
                <li>
                  Should an error occur relating to the amount of a donation, our valued donors have 60 days in which to notify Cambodian Amanah Takaful Association (CATA) of the error in question, in writing. This can be done by emailing {' '}
                  <a href="mailto:info@takafulcambodia.org" className="text-[#0284c7] underline hover:text-[#0369a1]">
                    info@takafulcambodia.org
                  </a>
                  . The following information must be included in the refund request:
                  <ul className="pl-6 mt-2 space-y-1 list-disc">
                    <li>Date the donation was initiated;</li>
                    <li>Donation Amount;</li>
                    <li>Full Name of the Donor;</li>
                    <li>Tax Invoice Number/Donation ID;</li>
                    <li>Donation Details</li>
                    <li>Refund Amount being requested;</li>
                    <li>Description/details of the error.</li>
                  </ul>
                </li>
                <li>Upon receipt of the request we will review your application and respond within 2-7 business days with the outcome of your request.</li>
                <li>The tax invoice with the incorrect amount immediately deemed invalid and a new tax invoice will need to be issued for the corrected donation amount, subject to the outcome of the refund request.</li>
                <li>Please note, CATA is under no obligation to provide a refund if an error has been made by the donor or the donor’s associates, however, we will endeavour to rectify genuine errors, at CATA’s sole discretion.</li>
                <li>Should an error in the donation amount be detected and requested outside of the 60-day period from the date the donation was made, CATA regrets that we are unable to issue a refund.</li>
              </ul>
            </div>

            {/* Sub-item 2 */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#0284c7]">2. Error (made by CATA)</h3>
              <ul className="pl-6 space-y-2 text-sm list-lower-alpha sm:text-base text-slate-600">
                <li>
                  In the event of an error being made by CATA or its authorised financial institutions, CATA will issue an immediate full refund upon being notified of and confirmation of the error.
                  <br />
                  This can be done by emailing {' '}
                  <a href="mailto:info@takafulcambodia.org" className="text-[#0284c7] underline hover:text-[#0369a1]">
                    info@takafulcambodia.org
                  </a>
                  . The following information must be included in the error notification:
                  <ul className="pl-6 mt-2 space-y-1 list-disc">
                    <li>Date the donation was initiated;</li>
                    <li>Donation Amount;</li>
                    <li>Full Name of the Donor;</li>
                    <li>Tax Invoice Number/Donation ID;</li>
                    <li>Donation Details</li>
                    <li>Description/details of the error.</li>
                  </ul>
                </li>
                <li>The tax invoice with the incorrect amount is immediately deemed invalid and either a new tax invoice will be issued for the corrected donation amount or the tax invoice will be cancelled upon the error being resolved.</li>
                <li>Should an error in the donation amount be detected and requested outside of the 60-day period from the date the donation was made, CATA regrets that we are unable to issue a refund.</li>
              </ul>
            </div>

            {/* Sub-item 3 */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#0284c7]">3. Change of Mind</h3>
              <ul className="pl-6 space-y-2 text-sm list-lower-alpha sm:text-base text-slate-600">
                <li>As a charitable organisation, CATA is under no obligation to provide a refund if a donor has had a change of mind; we therefore ask that you carefully consider your choice of donation before donating.</li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}