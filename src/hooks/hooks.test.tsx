import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { FormEvent } from 'react';
import { projectFilters, projects } from '@/data';
import { useProjectFilter } from './useProjectFilter';
import { useContactForm } from './useContactForm';

describe('useProjectFilter', () => {
  it('filters by category and counts each filter', () => {
    const { result } = renderHook(() => useProjectFilter(projects, projectFilters));
    expect(result.current.visible).toHaveLength(projects.length);
    expect(result.current.counts.All).toBe(projects.length);
    expect(result.current.counts['Live product']).toBe(1);

    act(() => result.current.setFilter('Deep Learning'));
    expect(result.current.visible.every((p) => p.category === 'Deep Learning')).toBe(true);

    act(() => result.current.setView('grid'));
    expect(result.current.view).toBe('grid');
  });
});

function formWith(values: Record<string, string>) {
  const form = document.createElement('form');
  for (const [name, value] of Object.entries(values)) {
    const input = document.createElement('input');
    input.name = name;
    input.value = value;
    form.append(input);
  }
  document.body.append(form);
  return { preventDefault: () => {}, currentTarget: form } as unknown as FormEvent<HTMLFormElement>;
}

describe('useContactForm', () => {
  it('shows errors, wires ARIA and focuses the first invalid field', () => {
    const open = vi.fn();
    const { result } = renderHook(() => useContactForm('me@x.co', open));
    const event = formWith({ name: '', email: 'bad', message: '' });

    act(() => result.current.onSubmit(event));

    expect(open).not.toHaveBeenCalled();
    expect(result.current.errorFor('email')).toBe('Please enter a valid email.');
    expect(result.current.fieldProps('name')).toEqual({ 'aria-invalid': true, 'aria-describedby': 'e-name' });
    expect(result.current.fieldProps('org')['aria-invalid']).toBe(false);
    expect((document.activeElement as HTMLInputElement).name).toBe('name');
  });

  it('opens a pre-filled email when valid', () => {
    const open = vi.fn();
    const { result } = renderHook(() => useContactForm('me@x.co', open));
    act(() => result.current.onSubmit(formWith({ name: 'Jane', email: 'jane@acme.co', message: 'Hello' })));
    expect(open).toHaveBeenCalledWith(expect.stringMatching(/^mailto:me@x\.co\?subject=/));
  });
});
