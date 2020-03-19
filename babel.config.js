module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    ["import", {
      "libraryName": "view-design",
      "libraryDirectory": "src/components"
    }, "view-design"],
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es"
    }, "vant"]
  ]
}