/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			typography: {
				DEFAULT: {
					css: {
						pre: {
							background: 'rgba(205, 200, 255, 0.05)',
							code: {
								fontSize: '1rem',
							},
						},
						'h3 a:has(code)': {
							boxShadow: `0 0 0 0.3rem transparent`,
							background: colors.teal[900],
							boxShadow: `0 0 0 0.3rem ${colors.teal[900]}`,
						},
					},
					figure: {
						margin: 0,
					},
					blockquote: {
						fontSize: '90%',
						color: colors.zinc[500],
						borderLeftColor: colors.zinc[700],
						'p::before': { display: 'none' },
						'p::after': { display: 'none' },
					},
					a: {
						textDecoration: 'none',
						borderBottom: `1px solid ${colors.pink[300]}`,
						color: colors.pink[200],
						borderRadius: 1,
						transitionProperty: 'color, border-color, background, box-shadow',
						transitionDuration: '0.18s',
						boxShadow: `0 0 0 0.2rem transparent`,
						'&:hover': {
							color: `${colors.zinc[900]}`,
							borderBottomColor: `${colors.pink[200]}`,
							background: colors.pink[200],
							boxShadow: `0 0 0 0.2rem ${colors.pink[200]}`,
						},
					},
					code: {
						color: '#86e1fc',
						'&::before': { content: `unset !important` },
						'&::after': { content: `unset !important` },
						fontWeight: 'normal',
					},
					'a code': {
						fontSize: '1em',
					},
					'[data-rehype-pretty-code-fragment]:nth-of-type(2) pre': {
						'[data-line]::before': {
							content: 'counter(line)',
							counterIncrement: 'line',
							display: 'inline-block',
							width: '1rem',
							marginRight: '1rem',
							textAlign: 'right',
							color: colors.slate[600],
						},
						'[data-highlighted-line]::before': {
							color: colors.slate[400],
						},
					},
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}

