//
//  GateawayPackage.m
//  ftrntemplate
//
//  Created by Ameer Hamza on 22/10/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "NativeSdkLauncher.h"
#import "ENTTravelSDK.h"

@implementation NativeSdkLauncher
RCT_EXPORT_MODULE(NativeSdkLauncher);

RCT_EXPORT_METHOD(getAways: (NSDictionary *) dataParams
                 nameWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    if([dataParams[@"deepLink"] length] == 0){
      [[ENTTravelSDK sharedManager]
           initSDKAndShowHomeView:dataParams[@"userSessionToken"]
           baseURL:dataParams[@"baseURL"]
           params:@{
             @"location_id": dataParams[@"locationID"],
             @"category_id": dataParams[@"categoryID"]
           }
           callBack:^(BOOL isSDKDismissed, BOOL isLogout, NSString * _Nonnull msg) {
            if (isLogout) {
              resolve(@"logOut");
            }

          }];
      
    }else {
      [[ENTTravelSDK sharedManager]
         initSDK:dataParams[@"userSessionToken"]
         baseURL:dataParams[@"baseURL"]
         params:@{
           @"location_id": dataParams[@"locationID"],
           @"category_id": dataParams[@"categoryID"]
         }
         callBack:^(BOOL isSDKDismissed, BOOL isLogout, NSString * _Nonnull msg) {
          if (isLogout) {
            resolve(@"logout");
          }

        }];
      
      if ([ENTTravelSDK isValidSDKDeepLink:dataParams[@"deepLink"]]){
            [[ENTTravelSDK sharedManager] openTRURL:dataParams[@"deepLink"]];
       }
    }
      
    
       
  });
}
@end

