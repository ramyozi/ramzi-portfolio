/** @type {import('tailwindcss').Config} */

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: string | undefined }) => {
    if (opacityValue !== undefined) {
      if (opacityValue.startsWith('0.')) {
        return `hsla(var(${variableName}) / ${opacityValue})`;
      }
    }

    return `hsl(var(${variableName}))`;
  };
}
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: withOpacity('--border'),
        input: withOpacity('--input'),
        ring: withOpacity('--ring'),
        background: withOpacity('--background'),
        foreground: withOpacity('--foreground'),
        link: withOpacity('--link'),
        nav: {
          DEFAULT: withOpacity('--nav'),
        },
        primary: {
          DEFAULT: withOpacity('--primary'),
          foreground: withOpacity('--primary-foreground'),
          reverse: withOpacity('--primary-reverse')
        },
        info: {
          DEFAULT: withOpacity('--info'),
          foreground: withOpacity('--info-foreground'),
        },
        dark: {
          DEFAULT: withOpacity('--dark'),
        },
        light: {
          DEFAULT: withOpacity('--light'),
        },
        secondary: {
          DEFAULT: withOpacity('--secondary'),
          foreground: withOpacity('--secondary-foreground'),
        },
        tertiary: {
          DEFAULT: withOpacity('--tertiary'),
        },
        destructive: {
          DEFAULT: withOpacity('--destructive'),
          foreground: withOpacity('--destructive-foreground'),
        },
        warning: {
          DEFAULT: withOpacity('--warning'),
          foreground: withOpacity('--warning-foreground'),
        },
        success: {
          DEFAULT: withOpacity('--success'),
          foreground: withOpacity('--success-foreground'),
        },
        tab: {
          DEFAULT: withOpacity('--tab'),
        },
        tabactive: {
          DEFAULT: withOpacity('--tabactive'),
        },
        tabtext: {
          DEFAULT: withOpacity('--tabtext'),
        },
        neutral: {
          DEFAULT: withOpacity('--neutral'),
          foreground: withOpacity('--neutral-foreground'),
        },
        noclic: {
          DEFAULT: withOpacity('--noclic'),
        },
        headbar: {
          DEFAULT: withOpacity('--headbar'),
        },
        muted: {
          DEFAULT: withOpacity('--muted'),
          foreground: withOpacity('--muted-foreground'),
        },
        accent: {
          DEFAULT: withOpacity('--accent'),
          foreground: withOpacity('--accent-foreground'),
        },
        popover: {
          DEFAULT: withOpacity('--popover'),
          foreground: withOpacity('--popover-foreground'),
        },
        card: {
          DEFAULT: withOpacity('--card'),
          foreground: withOpacity('--card-foreground'),
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
