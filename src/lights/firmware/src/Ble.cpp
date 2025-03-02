// Version: 2

#include "Ble.h"

/**
 * @def DEVICE_NAME
 * @brief The name of this device.
 */
const char * DEVICE_NAME = "SprayWall 1";

Ble::Ble() :
   _device_name_descriptor(BLEUUID((uint16_t)0x2901)),
   _device_name_characteristics(
      BLEUUID((uint16_t) DEVICE_NAME_CHARACTERISTIC_UUID),
      BLECharacteristic::PROPERTY_READ),
   _model_number_descriptor(BLEUUID((uint16_t)0x2901)),
   _model_number_characteristics(
      BLEUUID((uint16_t) MODEL_NUMBER_STR_CHARACTERISTIC_UUID),
      BLECharacteristic::PROPERTY_NOTIFY |
      BLECharacteristic::PROPERTY_READ),
   _firmware_revision_descriptor(BLEUUID((uint16_t)0x2901)),
   _firmware_revision_characteristics(
      BLEUUID((uint16_t) FIRMWARE_REVISION_STR_CHARACTERISTIC_UUID),
      BLECharacteristic::PROPERTY_NOTIFY |
      BLECharacteristic::PROPERTY_WRITE),
   _light_pattern_descriptor(BLEUUID((uint16_t)0x2901)),
   _light_pattern_characteristics(
      BLEUUID((uint16_t) LIGHT_PATTERN_CHARACTERISTIC_UUID),
      BLECharacteristic::PROPERTY_WRITE),
   _brightness_descriptor(BLEUUID((uint16_t)0x2901)),
   _brightness_characteristics(
      BLEUUID((uint16_t) BRIGHTNESS_CHARACTERISTIC_UUID),
      BLECharacteristic::PROPERTY_WRITE),
   _settings_descriptor(BLEUUID((uint16_t)0x2901)),
   _settings_characteristics(
      BLEUUID((uint16_t) SETTINGS_CHARACTERISTIC_UUID),
      BLECharacteristic::PROPERTY_WRITE)
    {
      _device_name_descriptor.setValue("Device name");
      _model_number_descriptor.setValue("Model number");
      _firmware_revision_descriptor.setValue("Firmware");
      _light_pattern_descriptor.setValue("Set light pattern");
      _brightness_descriptor.setValue("Set light brightness");
      _settings_descriptor.setValue("Set colors");
    }

void Ble::begin() {
   BLEDevice::init(DEVICE_NAME);
   _server = BLEDevice::createServer();
   _server->setCallbacks(new MyServerCallbacks(this));

  uint8_t model_number[6] = { HARDWARE_VERSION_MAJOR, HARDWARE_VERSION_MINOR, SOFTWARE_VERSION_MAJOR, SOFTWARE_VERSION_MINOR, SOFTWARE_VERSION_PATCH, SOFTWARE_VERSION_BUILD };

   BLEService *deviceInfoService = _server->createService(BLEUUID((uint16_t) DEVICE_INFO_SERVICE_UUID));

   deviceInfoService->addCharacteristic(&_device_name_characteristics);
   _device_name_descriptor.setValue(DEVICE_NAME);
   _device_name_characteristics.addDescriptor(&_device_name_descriptor);

   deviceInfoService->addCharacteristic(&_model_number_characteristics);
   _model_number_descriptor.setValue((uint8_t*)model_number, 6);
   _model_number_characteristics.addDescriptor(&_model_number_descriptor);

   deviceInfoService->addCharacteristic(&_firmware_revision_characteristics);
   _firmware_revision_characteristics.addDescriptor(&_firmware_revision_descriptor);
   _firmware_revision_characteristics.setCallbacks(new FirmwareRevisionCallback(this));

   BLEService *rcService = _server->createService(BLEUUID((uint16_t) REMOTE_CTRL_SERVICE_UUID));

   rcService->addCharacteristic(&_light_pattern_characteristics);
   _light_pattern_characteristics.addDescriptor(&_light_pattern_descriptor);
   _light_pattern_characteristics.setCallbacks(new SetLightPatternCallback(this));

   rcService->addCharacteristic(&_brightness_characteristics);
   _brightness_characteristics.addDescriptor(&_brightness_descriptor);
   _brightness_characteristics.setCallbacks(new SetBrightnessLedCallback(this));

   rcService->addCharacteristic(&_settings_characteristics);
   _settings_characteristics.addDescriptor(&_settings_descriptor);
   _settings_characteristics.setCallbacks(new SetSettingCallback(this));

   deviceInfoService->start();
   rcService->start();

   BLEDevice::startAdvertising();
}

void Ble::check_to_reconnect() {
   // disconnected so advertise
   if (!_device_connected && _old_device_connected) {
      delay(500);                   // give the bluetooth stack the chance to get things ready
      _server->startAdvertising();  // restart advertising
      BLE_DEBUG(verbosity_t::info, "DISCONNECT");
      _old_device_connected = _device_connected;
   }
   // connected so reset boolean control
   if (_device_connected && !_old_device_connected) {
      // do stuff here on connecting
      BLE_DEBUG(verbosity_t::info, "RE-CONNECT");
      _old_device_connected = _device_connected;
   }
}

bool Ble::connected() {
   return _device_connected;
}

void Ble::on_connect(BLEServer * server) {
   if (server == _server) {
      _device_connected = true;
      _server->startAdvertising();
      BLE_DEBUG(verbosity_t::info, "CONNECT");
   }
}

void Ble::on_disconnect(BLEServer * server) {
   if (server == _server) {
      _device_connected = false;
      BLE_DEBUG(verbosity_t::info, "DISCONNECT");
   }
}
