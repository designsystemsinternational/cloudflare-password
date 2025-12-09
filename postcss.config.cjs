module.exports = {
  plugins: {
    '@lehoczky/postcss-fluid': {
      min: 360,
      max: 1400,
    },
    '@csstools/postcss-global-data': {
      files: ['./src/styles/breakpoints.css'],
    },
    'postcss-preset-env': {
      preserve: false,
      features: {
        'custom-properties': false,
        'cascade-layers': false,
        'custom-media-queries': true,
      },
    },
  },
};
