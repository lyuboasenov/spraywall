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
   _light_led_descriptor(BLEUUID((uint16_t)0x2901)),
   _light_led_characteristics(
      BLEUUID((uint16_t) LIGHT_LED_STR_CHARACTERISTIC_UUID),
      BLECharacteristic::PROPERTY_NOTIFY |
      BLECharacteristic::PROPERTY_WRITE)
    { }

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

   deviceInfoService->addCharacteristic(&_light_led_characteristics);
   _light_led_characteristics.addDescriptor(&_light_led_descriptor);
   _light_led_characteristics.setCallbacks(new LightLedCallback(this));

   deviceInfoService->start();

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
   }
}

void Ble::on_disconnect(BLEServer * server) {
   if (server == _server) {
      _device_connected = false;
   }
}

void Ble::on_light_led(size_t len, uint8_t* data) {
   _received_data_length = len;
   _received_data = data;
}

size_t Ble::get_received_data_length() {
   return _received_data_length;
}

uint8_t* Ble::get_received_data() {
   return _received_data;
}