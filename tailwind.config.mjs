export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: { themes: ['garden', 'night'], logs: false },
};
