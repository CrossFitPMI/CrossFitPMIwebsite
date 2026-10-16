import { gymConfig } from '@/lib/gym-config';

interface ConsultationEmbedProps {
  className?: string;
  direct?: boolean;
}

export default function ConsultationEmbed({ className = '', direct = false }: ConsultationEmbedProps) {
  return (
    <iframe
      src={direct ? gymConfig.urls.consultationDirect : gymConfig.urls.consultation}
      title="Book your consultation"
      className={`w-full h-[760px] md:h-[860px] rounded-2xl border-0 ${className}`}
      loading="lazy"
    />
  );
}
