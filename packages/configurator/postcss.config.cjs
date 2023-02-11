/* eslint-env node */

module.exports = {
  plugins: {
    'postcss-mixins': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
    '@fullhuman/postcss-purgecss': {
      content: ['./src/**/*.vue', 'index.html'],
      extractors: [{
        /**
         * This extractor function removes all <style> tags from SFCs
         *
         * @param content content to be processed
         * @returns stripped content
         */
        extractor(content) {
          return content
            .replace(/<style[\s\S]+?<\/style>/gi, '')
            .match(/[\w\-/:]*[\w\-/]/g) || []
        },
        extensions: ['vue'],
      }],
    },
    'cssnano': {
      preset: 'default',
    },
  },
}
