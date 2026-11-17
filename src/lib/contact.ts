export interface ContactFields {
  name: string;
  email: string;
  org?: string;
  services?: string;
  message: string;
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL = /^\S+@\S+\.\S+$/;

/** Field → message for every invalid field (empty object when valid). */
export function validateContact(f: Partial<ContactFields>): ContactErrors {
  const errors: ContactErrors = {};
  if (!f.name?.trim()) errors.name = 'Please enter your name.';
  if (!EMAIL.test(f.email?.trim() ?? '')) errors.email = 'Please enter a valid email.';
  if (!f.message?.trim()) errors.message = 'Please write a short message.';
  return errors;
}

/** Pre-filled mailto: link to `to`, or null when the fields are not valid. */
export function buildMailto(to: string, f: Partial<ContactFields>): string | null {
  if (Object.keys(validateContact(f)).length) return null;
  const name = f.name!.trim();
  const details = [
    `Name: ${name}`,
    `Email: ${f.email!.trim()}`,
    f.org?.trim() && `Organization: ${f.org.trim()}`,
    f.services?.trim() && `Looking for: ${f.services.trim()}`,
  ].filter(Boolean);
  const body = `${details.join('\n')}\n\n${f.message!.trim()}`;
  return `mailto:${to}?subject=${encodeURIComponent(`New project inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
}
