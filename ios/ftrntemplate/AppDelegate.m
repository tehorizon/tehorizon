/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"


#import "AppboyReactUtils.h"
#import "AppboyKit.h"
#import "Appboy-iOS-SDK/AppboyKit.h"
//end
#import <React/RCTLinkingManager.h>
#import "ReactNativeConfig.h"
#import "JniKeys.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <RNBranch/RNBranch.h>
#import "RNSplashScreen.h"
#import <React/RCTBridge.h>
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@interface AppDelegate () <RCTBridgeDelegate>
@end

@implementation AppDelegate
@synthesize bridge;
@synthesize window = _window;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
    }
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  NSString *AppBoyKey = [JniKeys getKeySync:@"APP_BOY_API_KEY_IOS"];
  NSString *googleMapApiKey = [JniKeys getKeySync:@"GOOGLE_MAP_API_KEY"];
  [GMSServices provideAPIKey:googleMapApiKey];
  
  [Appboy startWithApiKey:AppBoyKey
            inApplication:application
        withLaunchOptions:launchOptions
        withAppboyOptions:@{ ABKInAppMessageControllerDelegateKey : self }];

    [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES]; // <-- add this

  // Register for user notifications
  if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_9_x_Max) {
    UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    UNAuthorizationOptions options = UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    if (@available(iOS 12.0, *)) {
      options = options | UNAuthorizationOptionProvisional;
    }
    [center requestAuthorizationWithOptions:(options)
                          completionHandler:^(BOOL granted, NSError *_Nullable error) {
                            NSLog(@"Permission granted.");
                            [[Appboy sharedInstance] pushAuthorizationFromUserNotificationCenter:granted];
                          }];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  } else if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_7_1) {
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeBadge | UIUserNotificationTypeAlert | UIUserNotificationTypeSound) categories:nil];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  } else {
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
     (UIRemoteNotificationTypeAlert |
      UIRemoteNotificationTypeBadge |
      UIRemoteNotificationTypeSound)];
  }

  if (@available(iOS 14, *)) {
    UIDatePicker *picker = [UIDatePicker appearance];
    picker.preferredDatePickerStyle = UIDatePickerStyleWheels;
  }

  [[AppboyReactUtils sharedInstance] populateInitialUrlFromLaunchOptions:launchOptions];
 // In-App Messaging
  [Appboy sharedInstance].inAppMessageController.delegate = self;
 
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"ftrntemplate" initialProperties:nil];
  if (@available(iOS 13.0, *)) {
        rootView.backgroundColor = [UIColor systemBackgroundColor];
    } else {
        rootView.backgroundColor = [UIColor whiteColor];
    }
  self.bridge = rootView.bridge;
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen showSplash:@"LaunchScreen" inRootView:rootView];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [[Appboy sharedInstance] registerApplication:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  [[Appboy sharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}

- (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [[Appboy sharedInstance] registerApplication:application didReceiveRemoteNotification:userInfo];
}

- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSLog(@"didRegisterForRemoteNotificationsWithDeviceToken token appboy %@",deviceToken);
  [[Appboy sharedInstance] registerDeviceToken:deviceToken];
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([RNBranch application:application openURL:url options:options])  {
    return [RNBranch application:application openURL:url options:options];
  }
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  if ([RNBranch continueUserActivity:userActivity])  {
    return [RNBranch continueUserActivity:userActivity];
  }
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
  completionHandler(UNNotificationPresentationOptionAlert);
}

- (ABKInAppMessageDisplayChoice) beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage {
  NSData *inAppMessageData = [inAppMessage serializeToData];
  NSString *inAppMessageString = [[NSString alloc] initWithData:inAppMessageData encoding:NSUTF8StringEncoding];
  NSDictionary *arguments = @{
    @"inAppMessage" : inAppMessageString
  };
  // Send to JavaScript
//  [self.bridge.eventDispatcher
//             sendDeviceEventWithName:@"inAppMessageReceived"
//             body:arguments];
  // Note: return ABKDiscardInAppMessage if you would like
  // to prevent the Braze SDK from displaying the message natively.
  return ABKDisplayInAppMessageNow;
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Your application can present a full screen modal view controller to
    // cover its contents when it moves into the background. If your
    // application requires a password unlock when it retuns to the
    // foreground, present your lock screen or authentication view controller here.
 
    UIViewController *blankViewController = [UIViewController new];
    blankViewController.view.backgroundColor = [UIColor clearColor];
  
  UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
      UIVisualEffectView *blurEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
  [blankViewController.view addSubview:blurEffectView];
  blurEffectView.frame = blankViewController.view.bounds;
  
    // Pass NO for the animated parameter. Any animation will not complete
    // before the snapshot is taken.
    [self.window.rootViewController presentViewController:blankViewController animated:NO completion:NULL];
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // This should be omitted if your application presented a lock screen
    // in -applicationDidEnterBackground:
    [self.window.rootViewController dismissViewControllerAnimated:NO completion:NO];
}

@end
