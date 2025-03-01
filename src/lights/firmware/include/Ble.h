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
#define LIGHT_LED_STR_CHARACTERISTIC_UUID 0x2ACF //Step Climber Data

// #define SYSTEM_ID_CHARACTERISTIC_UUID 0x2A23
// #define SOFTWARE_REVISION_STR_CHARACTERISTIC_UUID 0x2A28

#define FULL_PACKET 512
#define CHARPOS_UPDATE_FLAG 5

class Ble {
   public:
   Ble();
   void begin();

   void check_to_reconnect();

   void on_connect(BLEServer * server);
   void on_disconnect(BLEServer * server);

   void on_light_led(size_t len, uint8_t* data);

   bool connected();

   size_t get_received_data_length();
   uint8_t* get_received_data();

   private:
   BLEServer * _server = NULL;
   bool _device_connected = false;
   bool _old_device_connected = false;

   size_t _received_data_length;
   uint8_t* _received_data;

   BLECharacteristic _device_name_characteristics;
   BLEDescriptor _device_name_descriptor;

   BLECharacteristic _model_number_characteristics;
   BLEDescriptor _model_number_descriptor;

   BLECharacteristic _firmware_revision_characteristics;
   BLEDescriptor _firmware_revision_descriptor;

   BLECharacteristic _light_led_characteristics;
   BLEDescriptor _light_led_descriptor;
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

class LightLedCallback : public BLECharacteristicCallbacks {
   void onWrite(BLECharacteristic* pCharacteristic) {
      size_t length = pCharacteristic->getLength();
      if (length > 0) {
         _ble->on_light_led(length, pCharacteristic->getData());
      }
   }
   public:
   LightLedCallback(Ble* ble) : _ble(ble) { }

   private:
   Ble * _ble;
};
