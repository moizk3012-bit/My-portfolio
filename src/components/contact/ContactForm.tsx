import type { HTMLInputAutoCompleteAttribute } from 'react';
import { person } from '@/data';
import type { ContactFields } from '@/lib/contact';
import { useContactForm } from '@/hooks/useContactForm';
import { Button } from '@/components/ui/Button';

interface FieldDef {
  n: string;
  name: keyof ContactFields;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'textarea';
  required?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

const FIELDS: FieldDef[] = [
  { n: '01', name: 'name', label: 'What’s your name?', placeholder: 'John Doe *', type: 'text', required: true, autoComplete: 'name' },
  { n: '02', name: 'email', label: 'What’s your email?', placeholder: 'john@doe.com *', type: 'email', required: true, autoComplete: 'email' },
  { n: '03', name: 'org', label: 'What’s the name of your organization?', placeholder: 'John & Doe ®', type: 'text', autoComplete: 'organization' },
  { n: '04', name: 'services', label: 'What services are you looking for?', placeholder: 'LLM features, RAG, Computer vision …', type: 'text' },
  { n: '05', name: 'message', label: 'Your message', placeholder: 'Hello Moiz, can you help me with … *', type: 'textarea', required: true },
];

/** Numbered contact form; sending opens the visitor's email app with the message filled in. */
export function ContactForm() {
  const { onSubmit, fieldProps, errorFor } = useContactForm(person.email);

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      {FIELDS.map((f) => {
        const error = errorFor(f.name);
        const common = {
          id: `f-${f.name}`,
          name: f.name,
          placeholder: f.placeholder,
          required: f.required,
          autoComplete: f.autoComplete,
          ...fieldProps(f.name),
        };
        return (
          <div key={f.name} className={`field${error ? ' has-error' : ''}`}>
            <span className="field-n" aria-hidden="true">
              {f.n}
            </span>
            <label htmlFor={common.id}>{f.label}</label>
            {f.type === 'textarea' ? <textarea rows={4} {...common} /> : <input type={f.type} {...common} />}
            <p className="field-error" id={`e-${f.name}`} aria-live="polite">
              {error}
            </p>
          </div>
        );
      })}
      <div className="form-send">
        <Button type="submit" theme="blue" className="btn--xl">
          Send it!
        </Button>
      </div>
      <p className="form-note">Sending opens your email app with the message ready to go.</p>
    </form>
  );
}
