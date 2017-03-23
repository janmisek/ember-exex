/*jshint node:true*/
module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "timeout": 540,
  "parallel": 1,
  "launchers":
  {
    "SL_Chrome_Current": {
      "command": "ember sauce:launch -b chrome -v 39 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Chrome_Last": {
      "command": "ember sauce:launch -b chrome -v 38 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Firefox_Current": {
      "command": "ember sauce:launch -b firefox -v 34 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Firefox_Last": {
      "command": "ember sauce:launch -b firefox -v 33 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Safari_Current": {
      "command": "ember sauce:launch -b safari -v 8 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_Safari_Last": {
      "command": "ember sauce:launch -b safari -v 7 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_IE_11": {
      "command": "ember sauce:launch -b 'internet explorer' -v 11 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_IE_10": {
      "command": "ember sauce:launch -b 'internet explorer' -v 10 --no-ct -u <url>",
      "protocol": "tap"
    },
    "SL_IE_9": {
      "command": "ember sauce:launch -b 'internet explorer' -v 9 --no-ct -u <url>",
      "protocol": "tap"
    }
  }
  ,
  "launch_in_dev": [
    "chromium"
  ],
  "launch_in_ci": [
    "SL_Chrome_Current",
    "SL_Chrome_Last",
    "SL_Firefox_Current",
    "SL_Firefox_Last",
    "SL_Safari_Current",
    "SL_Safari_Last",
    "SL_IE_11",
    "SL_IE_10",
    "SL_IE_9"
  ]
}
