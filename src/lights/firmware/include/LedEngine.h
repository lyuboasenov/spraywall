// Version: 2
#pragma once

#include <Arduino.h>
#include <Config.h>
#include <Adafruit_NeoPixel.h>

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

   static uint32_t color(uint8_t r, uint8_t g, uint8_t b);
   static uint32_t color(byte b);

   private:
   Adafruit_NeoPixel _strip;

   int           pixelInterval = 150;       // Pixel Interval (ms)
   int           pixelQueue = 0;           // Pattern Pixel Queue
   int           pixelCycle = 0;           // Pattern Pixel Cycle
   uint16_t      pixelNumber = LED_COUNT;  // Total Number of Pixels
};
