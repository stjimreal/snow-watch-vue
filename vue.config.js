/*
 * @Date: 2022-04-18 00:52:06
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-20 22:47:18
 */
// vue.config.js


/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.geojson$/,
                    loader: 'json-loader'
                }
            ]
        }
    },
    publicPath: '/snow-watch/',
    // chainWebpack: config => config.resolve.symlinks(false)
}
