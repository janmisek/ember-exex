/*jshint node:true*/
module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "timeout": 540,
  "parallel": 1,
  "launchers":
  {
    "SL_Chrome_56": {
      "command": "ember sauce:launch -b chrome -v 56 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Chrome_50": {
      "command": "ember sauce:launch -b chrome -v 50 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Firefox_46": {
      "command": "ember sauce:launch -b firefox -v 46 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Firefox_52": {
      "command": "ember sauce:launch -b firefox -v 52 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Safari_10": {
      "command": "ember sauce:launch -b safari -v 10 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Safari_9": {
      "command": "ember sauce:launch -b safari -v 9 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_IE_11": {
      "command": "ember sauce:launch -b 'internet explorer' -v 11 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_IE_10": {
      "command": "ember sauce:launch -b 'internet explorer' -v 10 --no-ct -u <url>",
      "protocol": "tap"
    }
  }
  ,
  "launch_in_dev": [
    "chromium"
  ],
  "launch_in_ci": [
    "SL_Chrome_56",
    "SL_Chrome_50",
    "SL_Firefox_46",
    "SL_Firefox_52",
    "SL_Safari_9",
    "SL_Safari_10",
    "SL_IE_11",
    "SL_IE_10"
  ]
}
