{
  "targets": [
    {
      "target_name": "stay_awake",
      "sources": [ "lib/stay_awake_win.cc" ],
      "conditions": [
        [
          "OS != 'win'",
          {
            "sources!":
            [
              "lib/stay_awake_win.cc",
            ]
          }
        ]
      ]
    }
  ]
}
