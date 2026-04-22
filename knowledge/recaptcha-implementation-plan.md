# Google reCAPTCHA + Rate Limiting Implementation Guide

> **Simple, reusable bot protection for any website form**

## Overview
- **Time:** 45 minutes total
- **Cost:** Free (up to 1M requests/month)
- **Protection:** 90%+ bot blocking + duplicate prevention
- **User Impact:** Minimal (reCAPTCHA v2 checkbox - familiar & effective)

---

## CLIENT SETUP (5 minutes)

### Get reCAPTCHA Keys
1. Go to [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
2. Click "+" to create new site
3. Fill form:
   - **Label:** Your site name
   - **reCAPTCHA type:** v2 "I'm not a robot" Checkbox (recommended)
   - **Domains:** Add your domain (e.g., `yourdomain.com`)
4. Copy both keys:
   - **Site Key** (public)
   - **Secret Key** (private)

### Provide to Developer
```
Site Key: 6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Secret Key: 6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Domain: yourdomain.com
```

---

## DEVELOPER IMPLEMENTATION (40 minutes)

### 1. Install Package (2 minutes)
```bash
npm install react-google-recaptcha @types/react-google-recaptcha
```

### 2. Environment Setup (1 minute)
Add to `.env.local`:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### 3. Create reCAPTCHA Component (5 minutes)
Create `components/ui/RecaptchaWidget.tsx`:
```typescript
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
```

### 4. Create Protection Hook (10 minutes)
Create `hooks/useFormProtection.ts`:
```typescript
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
```

### 5. Update Form Component (15 minutes)
```typescript
import RecaptchaWidget from '@/components/ui/RecaptchaWidget';
import { useFormProtection } from '@/hooks/useFormProtection';

export default function YourForm() {
  const [formData, setFormData] = useState({/* your fields */});
  const protection = useFormProtection(30); // 30 second cooldown

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitCheck = protection.canSubmit();
    if (!submitCheck.allowed) {
      return; // Error message will be shown in UI
    }

    protection.handleSubmitStart();

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: protection.recaptchaToken
        })
      });

      if (response.ok) {
        protection.handleSubmitSuccess();
        setFormData({}); // Reset form
        alert('Success!'); // Replace with better UI feedback
      } else {
        protection.handleSubmitError();
        alert('Failed. Please try again.'); // Replace with better UI feedback
      }
    } catch (error) {
      protection.handleSubmitError();
      alert('Network error. Please try again.'); // Replace with better UI feedback
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      
      {/* reCAPTCHA Widget with Error Display */}
      <div className="space-y-2">
        <div className="flex justify-center">
          <RecaptchaWidget
            onVerify={(token) => {
              protection.setRecaptchaToken(token);
              if (token) protection.clearError(); // Clear error when verified
            }}
            theme="light"
            size="normal"
          />
        </div>
        
        {/* Professional Error Message */}
        {protection.errorMessage && (
          <div className="text-center">
            <p className="text-red-500 text-sm font-medium">
              {protection.errorMessage}
            </p>
          </div>
        )}
      </div>
      
      <button type="submit" disabled={protection.isSubmitting}>
        {protection.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### 6. Create API Route (5 minutes)
Create `app/api/submit-form/route.ts` (Next.js 13+ App Router):
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recaptchaToken, ...formData } = body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      );
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    });

    const recaptchaResult = await recaptchaResponse.json();
    
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Forward to your webhook/API
    const webhookResponse = await fetch('YOUR_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (webhookResponse.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
```

### 7. Test (2 minutes)
- [ ] Form loads and shows reCAPTCHA checkbox
- [ ] Form submits successfully after checking reCAPTCHA
- [ ] Professional error messages appear under reCAPTCHA (no browser alerts)
- [ ] Rate limiting prevents rapid submissions with countdown
- [ ] API route verifies reCAPTCHA tokens
- [ ] Mobile-friendly error display works

---

## Configuration Options

### reCAPTCHA Types:
```typescript
// v2 checkbox (recommended - best protection)
size="normal"

// v2 compact (for smaller forms)
size="compact"

// Note: Use v2 "I'm not a robot" checkbox for best results
```

### Cooldown Periods:
```typescript
useFormProtection(10)  // 10 seconds
useFormProtection(30)  // 30 seconds (recommended)
useFormProtection(60)  // 60 seconds
```

### Themes:
```typescript
theme="light"  // Light theme
theme="dark"   // Dark theme
```

---

## Deployment Checklist

- [ ] Add environment variables to production
- [ ] Add production domain to reCAPTCHA console
- [ ] Test on production environment
- [ ] Monitor reCAPTCHA admin console for stats

---

## Key Implementation Notes

### ✅ **What Works Best:**
- **reCAPTCHA v2 checkbox** - More reliable than v3, familiar to users
- **Professional error messages** - Red text under widget, no browser alerts
- **Auto-clear errors** - When user completes reCAPTCHA verification
- **30-second cooldown** - Good balance of security vs user experience

### ⚠️ **Common Issues & Solutions:**
- **"Invalid key type" error** → Make sure using standard reCAPTCHA (not Enterprise)
- **TypeScript errors** → Install both `react-google-recaptcha` and `@types/react-google-recaptcha`
- **Mobile error display** → Use responsive design, avoid browser alerts
- **Vercel environment warning** → Safe to ignore for `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

### 🎯 **Best Practices:**
- Always use reCAPTCHA v2 "I'm not a robot" checkbox
- Show errors under the widget, not in browser alerts
- Clear errors automatically when verification completes
- Test on mobile devices for error message visibility
- Use Next.js App Router API routes for better TypeScript support

---

**Total Time: 45 minutes | Cost: Free | Reusable: Yes**
