import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'desert-habbo': "url('/assets/bg.png')",
        'image-placeholder': "url('/assets/placeholder.png')",
        'gradient-edit': 'linear-gradient(to bottom, #888888 0%, #888888 50%, #606060 50%, #606060 100%)',
        'gradient-edit-hover': 'linear-gradient(to bottom, #A8A8A8 0%, #A8A8A8 50%, #7C7C7C 50%, #7C7C7C 100%)',
        'gradient-normal': 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 50%, #CCCCCC 50%, #CCCCCC 100%)',
        'gradient-normal-hover': 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 50%, #EAEAEA 50%, #EAEAEA 100%)',
        'gradient-cancel': 'linear-gradient(to bottom, #DE0C01 0%, #DE0C01 50%, #B50800 50%, #B50800 100%)',
        'gradient-cancel-hover': 'linear-gradient(to bottom, #FF1616 0%, #FF1616 50%, #D70B00 50%, #D70B00 100%)',
        'gradient-save': 'linear-gradient(to bottom, #3BA800 0%, #3BA800 50%, #2C7E00 50%, #2C7E00 100%)',
        'gradient-save-hover': 'linear-gradient(to bottom, #45CB00 0%, #45CB00 50%, #329D01 50%, #329D01 100%)'
      },
      fontFamily: {
        arial: ["Arial, Helvetica, sans-serif"]
      },
      colors: {
        desert: '#e3e3db',
        sky: '#009dff',
        city: '#E2E2E2',
        'city-dark': '#bdbdbd',
        tangerino: '#FF9020',
        greemish: '#009933'
      }
    },
  },
  plugins: [],
}
export default config
