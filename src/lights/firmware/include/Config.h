#pragma once

/**
 * @def SOFTWARE_VERSION_MAJOR
 * @brief Software version major number - year
 */
#ifndef SOFTWARE_VERSION_MAJOR
#define SOFTWARE_VERSION_MAJOR 25
#endif

/**
 * @def SOFTWARE_VERSION_MINOR
 * @brief Software version minor number - month
 */
#ifndef SOFTWARE_VERSION_MINOR
#define SOFTWARE_VERSION_MINOR 3
#endif

/**
 * @def SOFTWARE_VERSION_PATCH
 * @brief Software version patch number - day
 */
#ifndef SOFTWARE_VERSION_PATCH
#define SOFTWARE_VERSION_PATCH 1
#endif

/**
 * @def SOFTWARE_VERSION_BUILD
 * @brief Software version build number
 */
#ifndef SOFTWARE_VERSION_BUILD
#define SOFTWARE_VERSION_BUILD 1
#endif

/**
 * @def HARDWARE_VERSION_MAJOR
 * @brief Hardware version major number - electronics revision
 */
#ifndef HARDWARE_VERSION_MAJOR
#define HARDWARE_VERSION_MAJOR 1
#endif

/**
 * @def HARDWARE_VERSION_MINOR
 * @brief Hardware version major number - load cell index
 */
#ifndef HARDWARE_VERSION_MINOR
#define HARDWARE_VERSION_MINOR 1
#endif

/**
 * @def LED_PIN
 * @brief Which pin on the Arduino is connected to the NeoPixels?
 * Cannot use 6 as output for ESP. Pins 6-11 are connected to SPI flash. Use 16 instead.
 */
#ifndef LED_PIN
#define LED_PIN 13 // GPIO27
#endif

/**
 * @def LED_COUNT
 * @brief How many NeoPixels are attached to the Arduino?
 */
#ifndef LED_COUNT
#define LED_COUNT 150
#endif

/**
 * @def LED_BRIGHTNESS
 * @brief Led brightness  (min = 0, max = 255)
 */
#ifndef LED_BRIGHTNESS
#define LED_BRIGHTNESS 20
#endif
