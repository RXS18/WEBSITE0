export const WHATSAPP_NUMBER = '243833161520';
export const PHONE_DISPLAY = '+243 833 161 520';
export const EMAIL = 'rxsdigitalart@gmail.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/rxsdigitallab/';
export const INSTAGRAM_HANDLE = '@rxsdigitallab';

/** wa.me deep link with a pre-filled message. */
export const waLink = (text: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const mailLink = (subject: string, body: string): string =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Flip to true to show "À partir de $X" on the website packages instead of "Sur devis". */
export const SHOW_PRICES = false;
