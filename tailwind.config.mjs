import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100%',
                        color: 'inherit',
                        a: {
                            color: 'inherit',
                            textDecoration: 'underline',
                            fontWeight: '500',
                        },
                        strong: {
                            color: 'inherit',
                            fontWeight: '700',
                        },
                        code: {
                            color: 'inherit',
                            fontWeight: '600',
                        },
                        'h1, h2, h3, h4': {
                            color: 'inherit',
                            fontWeight: '800',
                            letterSpacing: '-0.025em',
                        },
                    },
                },
            },
		},
	},
	plugins: [typography],
}
