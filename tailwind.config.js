/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: [
		"./**/*.vue"
	],
	theme: {
		extend: {
			height: {
				"small-ads": "160px",
				"large-ads": "304px"
			},
			boxShadow: {
				around: "1px 1px 4px 0px rgba(0, 0, 0, 0.25)"
			},
			colors: {
				title: "#2D2E2F",
				"buttons-blue": "#2453B3",
				"main-gray": "#414141",
				"main-light-gray": "#EBEBEB"
			}
		},
		fontFamily: {
			sans: ["Arial", "sans-serif"],
			serif: ["Arial", "serif"]
		},
		keyframes: theme => ({
			fadeOut: {
				'0%': { opacity: 0 },
				'100%': { opacity: 1 }
			},
			spin: {
				'from': { transform: 'rotate(0deg)' },
				'to ': { transform: 'rotate(360deg)' }
			}
		}),
		animation: {
			fade: 'fadeOut .5s ease-in-out',
			spin: 'spin 1s linear infinite'
		}
	}
};
