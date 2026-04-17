import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center border border-white/10 bg-background/90 backdrop-blur-sm p-10 md:p-14">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-14 h-14 text-primary" />
        </div>

        <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
          Enquiry Sent
        </p>

        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          THANK YOU
        </h1>

        <p className="text-white/65 text-lg leading-relaxed mb-8">
          Thanks for getting in touch with Midnight Culture. We’ve received your
          enquiry and will get back to you as soon as possible.
        </p>

        <div className="flex justify-center">
          <Button
            asChild
            className="bg-primary hover:bg-primary/80 text-white font-bold rounded-none px-8 py-3 text-sm tracking-widest uppercase"
          >
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
