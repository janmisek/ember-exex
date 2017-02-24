/*jshint node:true*/
module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,

  launchers: {
    SL_firefox_public: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "firefox",
        "--visibility",
        "public",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    },

    SL_internet_explorer_public_11: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "internet explorer",
        "-v",
        "11",
        "--visibility",
        "public",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    }
  }
};
