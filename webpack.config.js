const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 獲取絕對路徑
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  mode: "development",
  // Webpack 入口文件
  entry: {
    index: "./src/pages/index/index.js",
  },
  // Webpack 輸出路徑
  output: {
    // 輸出的目錄
    path: resolve("dist"),
    // 輸出的文件名
    filename: "js/[name].js",
  },
  // source-map，測試用的，出錯的時候，將直接定位到原始碼，而不是轉換後的程式碼
  devtool: "cheap-module-eval-source-map",
  resolve: {
    // 自動補全（可以省略）的擴展名
    extensions: [".js"],
    // 路徑別名
    alias: {
      api: resolve("src/api"),
      fonts: resolve("src/assets/fonts"),
      images: resolve("src/assets/images"),
      styles: resolve("src/assets/styles"),
      components: resolve("src/components"),
      pages: resolve("src/pages"),
    },
  },
  // 不同類型模塊的處理規則
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 模板文件
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
      // 圖片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        options: {
          // 小於 10K 的圖片轉成 base64 編碼的 dataURL 字符串寫到代碼中
          limit: 10000,
          // 其他的圖片轉移到
          name: "images/[name].[ext]",
          esModule: false,
        },
      },
      // 字體文件
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    // 自動將依賴注入 html 模板，並輸出最終的 html 文件到目標文件夾
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/pages/index/index.art",
    }),
  ],
};
