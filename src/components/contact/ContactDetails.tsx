import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactDetails() {
  return (
    <div className="space-y-6">
      <div className="bg-plum-surface-low rounded-2xl p-6 border border-[rgba(203,160,198,0.15)]">
        <h3 className="font-display font-bold text-plum-on-surface text-lg mb-5">Get In Touch</h3>

        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-plum-surface-mid border border-[rgba(203,160,198,0.20)] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-plum-primary" />
            </div>
            <div>
              <p className="font-semibold text-plum-on-surface text-sm mb-1">Address</p>
              <p className="text-plum-on-surface-variant text-sm leading-relaxed">
                Unit 12, Holt Industrial Estate<br />
                Birmingham, B6 7AP<br />
                United Kingdom
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-plum-surface-mid border border-[rgba(203,160,198,0.20)] flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-plum-primary" />
            </div>
            <div>
              <p className="font-semibold text-plum-on-surface text-sm mb-1">Phone</p>
              <a href="tel:+441212345678" className="text-[#3255b7] text-sm hover:underline">
                +44 121 234 5678
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-plum-surface-mid border border-[rgba(203,160,198,0.20)] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-plum-primary" />
            </div>
            <div>
              <p className="font-semibold text-plum-on-surface text-sm mb-1">Email</p>
              <a href="mailto:enquiries@sunnyplaste.co.uk" className="text-[#3255b7] text-sm hover:underline break-all">
                enquiries@sunnyplaste.co.uk
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-plum-surface-mid border border-[rgba(203,160,198,0.20)] flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-plum-primary" />
            </div>
            <div>
              <p className="font-semibold text-plum-on-surface text-sm mb-1">Office Hours</p>
              <p className="text-plum-on-surface-variant text-sm">
                Monday – Friday<br />
                8:00am – 5:30pm GMT
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-cta rounded-2xl p-6 text-white">
        <p className="font-display font-bold text-lg mb-2">Quick Response Guarantee</p>
        <p className="text-white/75 text-sm leading-relaxed">
          All quote requests are reviewed by our technical team and responded to within 1 business day.
        </p>
      </div>
    </div>
  );
}
