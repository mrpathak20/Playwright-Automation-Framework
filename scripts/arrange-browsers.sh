#!/bin/bash

osascript <<'APPLESCRIPT'
tell application "Google Chrome"
    activate
end tell

delay 2

tell application "System Events"
    tell process "Google Chrome"

        set screenSize to size of window of desktop

        set screenWidth to item 1 of screenSize
        set screenHeight to item 2 of screenSize

        set halfWidth to screenWidth / 2

        set chromeWindows to every window

        if (count of chromeWindows) ≥ 2 then

            set position of window 1 to {0, 0}
            set size of window 1 to {halfWidth, screenHeight}

            set position of window 2 to {halfWidth, 0}
            set size of window 2 to {halfWidth, screenHeight}

        end if

    end tell
end tell
APPLESCRIPT