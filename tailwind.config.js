module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          dark: '#1a1d23',
          darker: '#0f1115',
          darkest: '#090b0d',
          orange: '#ff6b35',
          'orange-glow': '#ff8c42',
          steel: '#4a5568',
          'steel-light': '#718096',
          metal: '#2d3748',
        }
      },
      boxShadow: {
        'forge-glow': '0 0 20px rgba(255, 107, 53, 0.3)',
        'forge-glow-lg': '0 0 40px rgba(255, 107, 53, 0.5)',
        'inner-forge': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'metal-texture': "linear-gradient(145deg, #1a1d23 0%, #2d3748 100%)",
        'anvil-glow': "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
      }
    },
  },
  plugins: [],
}