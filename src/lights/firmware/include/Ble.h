// Version: 2
#pragma once

#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include "debug_print.h"
#include "esp_ota_ops.h"

#include "Config.h"

#ifdef BLE_DEBUG_ENABLED
#define BLE_DEBUG(x, y,...)                DEBUG_OUTPUT(x, "BLE", y, ##__VA_ARGS__) //!< DEBUG
#else
#define BLE_DEBUG(x, y,...)                                                         //!< DEBUG null
#endif

#define DEVICE_INFO_SERVICE_UUID 0x180A

#define DEVICE_NAME_CHARACTERISTIC_UUID 0x2A00
#define MODEL_NUMBER_STR_CHARACTERISTIC_UUID 0x2A24
#define SERIAL_NUMBER_STR_CHARACTERISTIC_UUID 0x2A25
#define FIRMWARE_REVISION_STR_CHARACTERISTIC_UUID 0x2A26
#define HARDWARE_REVISION_STR_CHARACTERISTIC_UUID 0x2A27
#define MANUFACTURER_NAME_CHARACTERISTIC_UUID 0x2A29

#define REMOTE_CTRL_SERVICE_UUID 0x110F // A/V Remote Control Controller
#define LIGHT_PATTERN_CHARACTERISTIC_UUID 0x2ACF // Step Climber Data
#define BRIGHTNESS_CHARACTERISTIC_UUID 0x2B01 // Luminous Intensity
#define SETTINGS_CHARACTERISTIC_UUID 0x2B1E // RC Settings

#define FULL_PACKET 512
#define CHARPOS_UPDATE_FLAG 5

class Ble {
   public:
   Ble();
   void begin();

   void check_to_reconnect();

   void on_connect(BLEServer * server);
   void on_disconnect(BLEServer * server);

   bool connected();

   void (*_data_received_callback)(uint8_t* data, size_t len);
   void (*_set_brightness_callback)(uint8_t brightness);
   void (*_set_setting_callback)(uint8_t* data, size_t len);

   private:
   BLEServer * _server = NULL;
   bool _device_connected = false;
   bool _old_device_connected = false;

   BLECharacteristic _device_name_characteristics;
   BLEDescriptor _device_name_descriptor;

   BLECharacteristic _model_number_characteristics;
   BLEDescriptor _model_number_descriptor;

   BLECharacteristic _firmware_revision_characteristics;
   BLEDescriptor _firmware_revision_descriptor;

   BLECharacteristic _light_pattern_characteristics;
   BLEDescriptor _light_pattern_descriptor;

   BLECharacteristic _brightness_characteristics;
   BLEDescriptor _brightness_descriptor;

   BLECharacteristic _settings_characteristics;
   BLEDescriptor _settings_descriptor;
};

// Setup callbacks onConnect and onDisconnect
class MyServerCallbacks : public BLEServerCallbacks {
   void onConnect(BLEServer *pServer) {
      _ble->on_connect(pServer);
   };

   void onDisconnect(BLEServer *pServer) {
      _ble->on_disconnect(pServer);
   }

   public:
   MyServerCallbacks(Ble* ble) : _ble(ble) { }

   private:
   Ble * _ble;
};

class FirmwareRevisionCallback : public BLECharacteristicCallbacks {
   void onWrite(BLECharacteristic* pCharacteristic) {
      std::string rx_data = pCharacteristic->getValue();
      if (!_update_flag) { //If it's the first packet of OTA since bootup, begin OTA
         esp_ota_begin(esp_ota_get_next_update_partition(NULL), OTA_SIZE_UNKNOWN, &_ota_handler);
         _update_flag = true;
      }
      if (_ble != NULL) {
         if (rx_data.length() > 0) {
            esp_ota_write(_ota_handler, rx_data.c_str(), rx_data.length());
            if (rx_data.length() != FULL_PACKET) {
               esp_ota_end(_ota_handler);
               if (ESP_OK == esp_ota_set_boot_partition(esp_ota_get_next_update_partition(NULL))) {
                  delay(2000);
                  esp_restart();
               }
               else {
                  _update_flag = false;
               }
            }
         }
      }

      uint8_t txData[5] = {1, 2, 3, 4, 5};
      //delay(1000);
      pCharacteristic->setValue((uint8_t*)txData, 5);
      pCharacteristic->notify();
   }
   public:
   FirmwareRevisionCallback(Ble* ble) : _ble(ble) { }

   private:
   Ble * _ble;
   bool _update_flag = false;
   esp_ota_handle_t _ota_handler = 0;
};

class SetLightPatternCallback : public BLECharacteristicCallbacks {
   void onWrite(BLECharacteristic* pCharacteristic) {
      size_t length = pCharacteristic->getLength();
      if (length > 0) {
         _ble->_data_received_callback(pCharacteristic->getData(), length);
      }
   }
   public:
   SetLightPatternCallback(Ble* ble) : _ble(ble) { }

   private:
   Ble * _ble;
};

class SetBrightnessLedCallback : public BLECharacteristicCallbacks {
   void onWrite(BLECharacteristic* pCharacteristic) {
      size_t length = pCharacteristic->getLength();
      if (length == 1) {
         _ble->_set_brightness_callback(pCharacteristic->getData()[0]);
      }
   }
   public:
   SetBrightnessLedCallback(Ble* ble) : _ble(ble) { }

   private:
   Ble * _ble;
};

class SetSettingCallback : public BLECharacteristicCallbacks {
   void onWrite(BLECharacteristic* pCharacteristic) {
      size_t length = pCharacteristic->getLength();
      if (length > 0) {
         _ble->_set_setting_callback(pCharacteristic->getData(), length);
      }
   }
   public:
   SetSettingCallback(Ble* ble) : _ble(ble) { }

   private:
   Ble * _ble;
};