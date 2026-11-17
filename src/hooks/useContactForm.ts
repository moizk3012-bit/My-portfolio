import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { buildMailto, validateContact } from '@/lib/contact';
import type { ContactErrors, ContactFields } from '@/lib/contact';

type FieldName = keyof ContactFields;

/**
 * Contact form logic: validates on submit, shows per-field errors, focuses
 * the first invalid field, and opens a pre-filled email when valid.
 * `openUrl` is injectable for tests.
 */
export function useContactForm(to: string, openUrl: (url: string) => void = (url) => window.location.assign(url)) {
  const [errors, setErrors] = useState<ContactErrors>({});

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fields = Object.fromEntries(new FormData(form).entries()) as Partial<Record<FieldName, string>>;
      const next = validateContact(fields);
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) {
        (form.elements.namedItem(first) as HTMLElement | null)?.focus();
        return;
      }
      const url = buildMailto(to, fields);
      if (url) openUrl(url);
    },
    [to, openUrl]
  );

  /** ARIA wiring for a field and its error message */
  const fieldProps = useCallback(
    (name: FieldName) => ({
      'aria-invalid': name in errors,
      'aria-describedby': `e-${name}`,
    }),
    [errors]
  );

  const errorFor = (name: FieldName) => (errors as Partial<Record<FieldName, string>>)[name] ?? '';

  return { errors, onSubmit, fieldProps, errorFor };
}
