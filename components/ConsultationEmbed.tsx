import { gymConfig } from '@/lib/gym-config';

interface ConsultationEmbedProps {
  className?: string;
}

export default function ConsultationEmbed({ className = '' }: ConsultationEmbedProps) {
  return (
    <iframe
      src={gymConfig.urls.consultation}
      title="Book your consultation"
      className={`w-full h-[760px] md:h-[860px] rounded-2xl border-0 ${className}`}
      loading="lazy"
    />
  );
}
