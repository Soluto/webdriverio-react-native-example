#import "DeviceIdProvider.h"

@implementation DeviceIdProvider

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(get,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
  NSString *deviceId = [prefs stringForKey:@"deviceId"];
  resolve(deviceId);
}

@end
