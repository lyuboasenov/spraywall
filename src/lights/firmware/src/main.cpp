#include <Arduino.h>

#include "Ble.h"
#include "LedEngine.h"
#include "debug_print.h"

Ble _ble;
LedEngine _ledEngine;


unsigned long pixelPrevious = 0;        // Previous Pixel Millis
unsigned long patternPrevious = 0;      // Previous Pattern Millis
int           patternCurrent = 0;       // Current Pattern Number
int           patternInterval = 5000;   // Pattern Interval (ms)
bool          patternComplete = false;

void data_received(uint8_t* data, size_t len);
void set_brightness(uint8_t brightness);
void set_setting(uint8_t* data, size_t len);

void setup() {
   #ifdef DEBUG_OUTPUT_ENABLED
   Serial.begin(115200);
   #endif

   DEBUG_OUTPUT(verbosity_t::info, "MAIN", "  _________________________________");
   DEBUG_OUTPUT(verbosity_t::info, "MAIN", "((                                  ))");
   DEBUG_OUTPUT(verbosity_t::info, "MAIN", " ))       SWL v.%d.%d.%d.%d (( ", // SWL - SprayWallLights
      SOFTWARE_VERSION_MAJOR, SOFTWARE_VERSION_MINOR, SOFTWARE_VERSION_PATCH, SOFTWARE_VERSION_BUILD);
   DEBUG_OUTPUT(verbosity_t::info, "MAIN", "((                                  ))");
   DEBUG_OUTPUT(verbosity_t::info, "MAIN", "  ----------------------------------  ");

   _ble.begin();
   _ble._data_received_callback = &data_received;
   _ble._set_brightness_callback = &set_brightness;
   _ble._set_setting_callback = &set_setting;

  _ledEngine.begin();
}

void loop() {
   // put your main code here, to run repeatedly:
   if (!_ble.connected()) {
      unsigned long currentMillis = millis();                     //  Update current time
      if( patternComplete || (currentMillis - patternPrevious) >= patternInterval) {  //  Check for expired time
         patternComplete = false;
         patternPrevious = currentMillis;
         patternCurrent++;                                         //  Advance to next pattern
         if(patternCurrent >= 7)
            patternCurrent = 0;
      }

      if(currentMillis - pixelPrevious >= _ledEngine.get_pixel_interval()) {        //  Check for expired time
         pixelPrevious = currentMillis;                            //  Run current frame
         switch (patternCurrent) {
            case 7:
            _ledEngine.theater_chase_rainbow(50); // Rainbow-enhanced theaterChase variant
            break;
            case 6:
            _ledEngine.rainbow(10); // Flowing rainbow cycle along the whole strip
            break;
            case 5:
            patternComplete = _ledEngine.theater_chase(LedEngine::color(0, 0, 127), 50); // Blue
            break;
            case 4:
            patternComplete = _ledEngine.theater_chase(LedEngine::color(127, 0, 0), 50); // Red
            break;
            case 3:
            patternComplete = _ledEngine.theater_chase(LedEngine::color(127, 127, 127), 50); // White
            break;
            case 2:
            patternComplete = _ledEngine.color_wipe(LedEngine::color(0, 0, 255), 50); // Blue
            break;
            case 1:
            patternComplete = _ledEngine.color_wipe(LedEngine::color(0, 255, 0), 50); // Green
            break;
            default:
            patternComplete = _ledEngine.color_wipe(LedEngine::color(255, 0, 0), 50); // Red
            break;
         }
      }
   }
}

void data_received(uint8_t* data, size_t len) {
   _ledEngine.light_route(data, len);
}

void set_brightness(uint8_t brightness) {
   _ledEngine.set_brightness(brightness);
}

void set_setting(uint8_t* data, size_t len) {
   if (len == 4) {
      _ledEngine.set_color(data[0], data[1], data[2], data[3]);
   }
}