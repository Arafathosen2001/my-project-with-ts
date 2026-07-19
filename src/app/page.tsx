
import { TestimonialsSection } from './components/TestimonialsSection';
import { NewsletterSection } from './components/NewsletterSection';
import HomePage from './home/page';

export default function Homepage() {
  return (
    <div className="space-y-20">
      <HomePage></HomePage>
      <TestimonialsSection />
      <NewsletterSection />

    </div>
  );
}
