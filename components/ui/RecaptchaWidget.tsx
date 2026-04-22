'use client';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaWidgetProps {
  onVerify: (token: string | null) => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
}

export default function RecaptchaWidget({ 
  onVerify, 
  theme = 'light',
  size = 'normal' 
}: RecaptchaWidgetProps) {
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      onChange={onVerify}
      theme={theme}
      size={size}
    />
  );
}
