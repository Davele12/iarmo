import { training } from '@/content/es/business';
import { TrainingPhoto } from './training-photo';
import { Cta } from './ui';

export function TrainingSection({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <section className="training-section" id={training.id} aria-labelledby="training-title">
      <div className="training-copy">
        <Heading id="training-title">{training.title}</Heading>
        <p>{training.description}</p>
        <Cta />
      </div>
      <TrainingPhoto src={training.image} />
    </section>
  );
}
