
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: [
					"Open Sans",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"'
				],
				title: [
					"Lato",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"'
				],
				body: [
					"Open Sans",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"'
				]
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Cores principais
				primary: {
					50: "#f4f0ff",
					100: "#e9dfff",
					200: "#d5c0ff",
					300: "#b991ff",
					400: "#9d5aff",
					500: "#7e2afc",
					600: "#6d11f2",
					700: "#611bf8", // Cor principal mantida
					800: "#4f0edb",
					900: "#3f0cb3",
					950: "#250077",
					DEFAULT: "#611bf8"
				},
				// Cores secundárias inspiradas na bandeira do Brasil
				secondary: {
					DEFAULT: '#FFD700', // Amarelo ouro
					foreground: '#1a1a1a',
					50: "#fffae6",
					100: "#fff2cc",
					200: "#ffe699",
					300: "#ffd966",
					400: "#ffcc33",
					500: "#ffc107",
					600: "#e6a800",
					700: "#b38600",
					800: "#806000",
					900: "#4d3a00"
				},
				// Cores de destaque
				accent: {
					DEFAULT: '#2E8B57', // Verde floresta
					foreground: '#ffffff',
					50: "#f0f9f5",
					100: "#d1f0e3",
					200: "#a3e1c7",
					300: "#74d2ab",
					400: "#46c38f",
					500: "#2E8B57",
					600: "#236e45",
					700: "#1a5234",
					800: "#113622",
					900: "#081b11"
				},
				// Cores de destaque adicionais
				tertiary: {
					DEFAULT: '#FF6B6B', // Vermelho vibrante
					foreground: '#ffffff'
				},
				success: {
					DEFAULT: '#00C9A7', // Verde água
					foreground: '#ffffff'
				},
				warning: {
					DEFAULT: '#FF9E7D', // Laranja suave
					foreground: '#1a1a1a'
				},
				destructive: {
					DEFAULT: '#FF3860', // Vermelho vibrante
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neutral: {
					50: "#f7f7f7",
					100: "#eeeeee",
					200: "#e0e0e0",
					300: "#cacaca",
					400: "#b1b1b1",
					500: "#999999",
					600: "#7f7f7f",
					700: "#676767",
					800: "#545454",
					900: "#464646",
					950: "#282828"
				},
				indigo: {
					100: "#e0e7ff",
					200: "#c7d2fe",
					300: "#a5b4fc",
					400: "#818cf8",
					500: "#6366f1",
					600: "#4f46e5",
					700: "#4338ca",
					800: "#3730a3",
					900: "#312e81",
				},
				emerald: {
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e3b",
				},
				slate: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a",
					950: "#020617",
				},
				yellow: {
					400: "#facc15"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '36px',
				'2xl': '48px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
