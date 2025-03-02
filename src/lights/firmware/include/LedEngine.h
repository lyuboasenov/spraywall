// Version: 2
#pragma once

#include <Arduino.h>
#include <Config.h>
#include <Adafruit_NeoPixel.h>
#include <Preferences.h>

class LedEngine {
   public:
   LedEngine();
   void begin();

   bool color_wipe(uint32_t color, int wait);
   bool theater_chase(uint32_t color, int wait);
   void rainbow(uint8_t wait);
   void theater_chase_rainbow(uint8_t wait);
   uint32_t wheel(byte WheelPos);
   int get_pixel_interval();
   void light_route(uint8_t* data, size_t length);
   void set_brightness(uint8_t brightness);
   void set_color(uint8_t type, uint8_t r, uint8_t g, uint8_t b);
   uint32_t color(uint8_t type);

   static uint32_t color(uint8_t r, uint8_t g, uint8_t b);

   private:
   Adafruit_NeoPixel _strip;
   Preferences _preferences;

   int           pixelInterval = 150;       // Pixel Interval (ms)
   int           pixelQueue = 0;           // Pattern Pixel Queue
   int           pixelCycle = 0;           // Pattern Pixel Cycle
   uint16_t      pixelNumber = LED_COUNT;  // Total Number of Pixels
   uint8_t*      _last_pattern;
   size_t        _last_pattern_length;
};
