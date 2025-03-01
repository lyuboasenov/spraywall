#include "LedEngine.h"
#include "Config.h"
#include "Adafruit_NeoPixel.h"
#include "debug_print.h"

LedEngine::LedEngine() :
   // Argument 1 = Number of pixels in NeoPixel strip
   // Argument 2 = Arduino pin number (most are valid)
   // Argument 3 = Pixel type flags, add together as needed:
   //   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
   //   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
   //   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
   //   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
   //   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
   _strip(Adafruit_NeoPixel(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800)) {

   }

void LedEngine::begin() {
   _strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
   _strip.show();            // Turn OFF all pixels ASAP
   _strip.setBrightness(LED_BRIGHTNESS);
}

int LedEngine::get_pixel_interval() {
   return pixelInterval;
}

// Some functions of our own for creating animated effects -----------------

// Fill strip pixels one after another with a color. Strip is NOT cleared
// first; anything there will be covered pixel by pixel. Pass in color
// (as a single 'packed' 32-bit value, which you can get by calling
// strip.Color(red, green, blue) as shown in the loop() function above),
// and a delay time (in milliseconds) between pixels.
bool LedEngine::color_wipe(uint32_t color, int wait) {
  static uint16_t current_pixel = 0;
  bool patternComplete = false;
  pixelInterval = wait;                         //  Update delay time
  _strip.setPixelColor(current_pixel++, color); //  Set pixel's color (in RAM)
  _strip.show();                                //  Update strip to match
  if(current_pixel >= pixelNumber) {            //  Loop the pattern from the first LED
    current_pixel = 0;
    patternComplete = true;
  }

  return patternComplete;
}

uint32_t LedEngine::color(uint8_t r, uint8_t g, uint8_t b) {
   return Adafruit_NeoPixel::Color(r, g, b);
}

// Theater-marquee-style chasing lights. Pass in a color (32-bit value,
// a la strip.Color(r,g,b) as mentioned above), and a delay time (in ms)
// between frames.
bool LedEngine::theater_chase(uint32_t color, int wait) {
  static uint32_t loop_count = 0;
  static uint16_t current_pixel = 0;
  bool patternComplete = false;

  pixelInterval = wait;                   //  Update delay time

  _strip.clear();

  for(int c=current_pixel; c < pixelNumber; c += 3) {
    _strip.setPixelColor(c, color);
  }
  _strip.show();

  current_pixel++;
  if (current_pixel >= 3) {
    current_pixel = 0;
    loop_count++;
  }

  if (loop_count >= 10) {
    current_pixel = 0;
    loop_count = 0;
    patternComplete = true;
  }

  return patternComplete;
}

// Rainbow cycle along whole strip. Pass delay time (in ms) between frames.
void LedEngine::rainbow(uint8_t wait) {
  if(pixelInterval != wait)
    pixelInterval = wait;
  for(uint16_t i=0; i < pixelNumber; i++) {
    _strip.setPixelColor(i, wheel((i + pixelCycle) & 255)); //  Update delay time
  }
  _strip.show();                             //  Update strip to match
  pixelCycle++;                             //  Advance current cycle
  if(pixelCycle >= 256)
    pixelCycle = 0;                         //  Loop the cycle back to the begining
}

//Theatre-style crawling lights with rainbow effect
void LedEngine::theater_chase_rainbow(uint8_t wait) {
  if(pixelInterval != wait)
    pixelInterval = wait;                   //  Update delay time
  for(int i=0; i < pixelNumber; i+=3) {
    _strip.setPixelColor(i + pixelQueue, wheel((i + pixelCycle) % 255)); //  Update delay time
  }
  _strip.show();
  for(int i=0; i < pixelNumber; i+=3) {
    _strip.setPixelColor(i + pixelQueue, _strip.Color(0, 0, 0)); //  Update delay time
  }
  pixelQueue++;                           //  Advance current queue
  pixelCycle++;                           //  Advance current cycle
  if(pixelQueue >= 3)
    pixelQueue = 0;                       //  Loop
  if(pixelCycle >= 256)
    pixelCycle = 0;                       //  Loop
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t LedEngine::wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if(WheelPos < 85) {
    return _strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if(WheelPos < 170) {
    WheelPos -= 85;
    return _strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return _strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}

void LedEngine::light_route(uint8_t* data, size_t length) {
   _strip.clear();

   for(int byte_idx = 0; byte_idx < length && byte_idx < LED_COUNT; byte_idx++) {
      if (data[byte_idx] > 0) {
         _strip.setPixelColor(byte_idx, color(data[byte_idx]));
      }
   }
   _strip.show();
}

uint32_t LedEngine::color(byte b) {
   u_int32_t color;
   switch (b) {
      case 1:
      color = LedEngine::color(0, 255, 0);
      break;
      case 2:
      color = LedEngine::color(0, 255, 255);
      break;
      case 3:
      color = LedEngine::color(255, 224, 102);
      break;
      case 4:
      color = LedEngine::color(255, 0, 0);
      break;
      default:
      color = LedEngine::color(255, 141, 161);
      break;
   }
   return color;
}