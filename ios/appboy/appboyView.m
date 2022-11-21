#import <React/RCTViewManager.h>

#import "AppboyReactBridge.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "AppboyKit.h"
#import "ABKUser.h"
#import "AppboyReactUtils.h"
#import "ABKNewsFeedViewController.h"
#import "ABKContentCardsViewController.h"
@interface RNTAppBoyView : RCTViewManager
@property (strong,nonatomic) ABKNewsFeedTableViewController *newsFeedViewController;
@end

@implementation RNTAppBoyView

RCT_EXPORT_MODULE(AppboyWrapper)

- (UIView *)view
{
  self.newsFeedViewController = [ABKNewsFeedTableViewController new];
//  self.newsFeedViewController = [[ABKNewsFeedTableViewController alloc] init];
  return self.newsFeedViewController.view;
}

- (void)dealloc {
    dispatch_sync(dispatch_get_main_queue(), ^{
        [self.view removeFromSuperview];
    });
}

@end
