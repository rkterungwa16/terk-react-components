import { generatePaddingClasses, PaddingSpacing } from './padding';

describe('generatePaddingClasses', () => {
  test('returns an empty array when no padding is provided', () => {
    const result = generatePaddingClasses();
    expect(result).toEqual([]);
  });

  test('returns an empty array when an empty padding object is provided', () => {
    const result = generatePaddingClasses({});
    expect(result).toEqual([]);
  });

  test('generates a class for a single padding property', () => {
    const padding: PaddingSpacing = { p: 'md' };
    const result = generatePaddingClasses(padding);
    expect(result).toEqual(['terkui-p-md']);
  });

  test('generates classes for multiple padding properties', () => {
    const padding: PaddingSpacing = {
      p: 'md',
      pt: 'lg',
      pb: 'sm'
    };
    const result = generatePaddingClasses(padding);
    // The order might vary depending on Object.keys() iteration
    expect(result).toHaveLength(3);
    expect(result).toContain('terkui-p-md');
    expect(result).toContain('terkui-pt-lg');
    expect(result).toContain('terkui-pb-sm');
  });

  test('generates classes for horizontal and vertical padding', () => {
    const padding: PaddingSpacing = {
      px: 'xl',
      py: 'xs'
    };
    const result = generatePaddingClasses(padding);
    expect(result).toHaveLength(2);
    expect(result).toContain('terkui-px-xl');
    expect(result).toContain('terkui-py-xs');
  });

  test('handles all possible spacing values', () => {
    // Test each spacing value
    const spacingValues = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    for (const value of spacingValues) {
      const padding: PaddingSpacing = { p: value };
      const result = generatePaddingClasses(padding);
      expect(result).toEqual([`terkui-p-${value}`]);
    }
  });

  test('filters out properties with undefined values', () => {
    const padding: PaddingSpacing = {
      p: 'md',
      pt: undefined,
      pb: 'sm'
    };
    const result = generatePaddingClasses(padding);
    expect(result).toHaveLength(2);
    expect(result).toContain('terkui-p-md');
    expect(result).toContain('terkui-pb-sm');
    expect(result).not.toContain('terkui-pt-undefined');
  });

  test('supports all padding property combinations', () => {
    const padding: PaddingSpacing = {
      p: 'md',    // all sides
      pl: 'xs',   // left
      pr: 'lg',   // right
      pt: 'sm',   // top
      pb: 'xl',   // bottom
      px: '2xl',  // horizontal (left and right)
      py: 'md'    // vertical (top and bottom)
    };

    const result = generatePaddingClasses(padding);
    expect(result).toHaveLength(7);
    expect(result).toContain('terkui-p-md');
    expect(result).toContain('terkui-pl-xs');
    expect(result).toContain('terkui-pr-lg');
    expect(result).toContain('terkui-pt-sm');
    expect(result).toContain('terkui-pb-xl');
    expect(result).toContain('terkui-px-2xl');
    expect(result).toContain('terkui-py-md');
  });

  test('handles custom property names', () => {
    // The function should accept any property name as defined by the index signature
    const padding = {
      'custom-padding': 'md' as const,
      'another-custom': 'lg' as const
    };

    const result = generatePaddingClasses(padding);
    expect(result).toHaveLength(2);
    expect(result).toContain('terkui-custom-padding-md');
    expect(result).toContain('terkui-another-custom-lg');
  });
});
