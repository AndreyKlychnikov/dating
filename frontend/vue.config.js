const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  // Fix Vuex-typescript in prod: https://github.com/istrib/vuex-typescript/issues/13#issuecomment-409869231
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions = Object.assign(
        {},
        config.optimization.minimizer[0].options.terserOptions,
        {
          ecma: 5,
          compress: {
            keep_fnames: true,
          },
          warnings: false,
          mangle: {
            keep_fnames: true,
          },
        }
      );
      const existingForkTsChecker = config.plugins.filter(
        (p) => p instanceof ForkTsCheckerWebpackPlugin
      )[0];

      // remove the existing ForkTsCheckerWebpackPlugin
      // so that we can replace it with our modified version
      config.plugins = config.plugins.filter(
        (p) => !(p instanceof ForkTsCheckerWebpackPlugin)
      );

      // copy the options from the original ForkTsCheckerWebpackPlugin
      // instance and add the memoryLimit property
      const forkTsCheckerOptions = existingForkTsChecker.options;
      forkTsCheckerOptions.memoryLimit = 512;

      config.plugins.push(new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions));
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) =>
        Object.assign(options, {
          transformAssetUrls: {
            "v-img": ["src", "lazy-src"],
            "v-card": "src",
            "v-card-media": "src",
            "v-responsive": "src",
          },
        })
      );
  },
};
