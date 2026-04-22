import { useState } from 'react';

export function useFormProtection(cooldownSeconds = 30) {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const canSubmit = () => {
    if (!recaptchaToken) {
      setErrorMessage('Please complete the security verification above');
      return { allowed: false };
    }
    
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const cooldownMs = cooldownSeconds * 1000;
    
    if (timeSinceLastSubmit < cooldownMs && lastSubmitTime > 0) {
      const remainingTime = Math.ceil((cooldownMs - timeSinceLastSubmit) / 1000);
      setErrorMessage(`Please wait ${remainingTime} seconds before submitting again`);
      return { allowed: false };
    }
    
    setErrorMessage(''); // Clear any previous errors
    return { allowed: true };
  };

  const handleSubmitStart = () => setIsSubmitting(true);
  
  const handleSubmitSuccess = () => {
    setLastSubmitTime(Date.now());
    setRecaptchaToken(null);
    setIsSubmitting(false);
    setErrorMessage(''); // Clear errors on success
  };
  
  const handleSubmitError = () => setIsSubmitting(false);

  const clearError = () => setErrorMessage('');

  return {
    recaptchaToken,
    isSubmitting,
    errorMessage,
    canSubmit,
    handleSubmitStart,
    handleSubmitSuccess,
    handleSubmitError,
    setRecaptchaToken,
    clearError,
  };
}
