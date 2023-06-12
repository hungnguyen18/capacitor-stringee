import Foundation
import Capacitor
import UIKit
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorStringeePlugin)
public class CapacitorStringeePlugin: CAPPlugin {

    private let implementation = CapacitorStringee()
    let stringeeClient = StringeeClient()
    var callingVC: CallingViewController1
    var token: String = ""
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
    
    @objc func StringeeConnect(_ call: CAPPluginCall) {
        self.token = call.getString("token") ?? ""
        if self.token == "" {
            call.reject("No token provided")
        }
        stringeeClient.connectionDelegate = self;
        stringeeClient.incomingCallDelegate = self
        stringeeClient.connect(withAccessToken: self.token)
        call.resolve(["token": self.token])
    }
    
    @objc func StringeeCall(_ call: CAPPluginCall) {
        let to = call.getString("to") ?? ""
        if to == "" {
            call.reject("No call target provided")
        }
        makeCall(to)
    }
    
    @objc func StringeeReject(_ call: CAPPluginCall) {
        call.resolve()
    }
    
    @IBAction func makeCall(_ to: String) {
        if !stringeeClient.hasConnected {
            
            return
        }
        
        var callControl = CallControl()
        callControl.from = stringeeClient.userId
        callControl.to = to
        callControl.isVideo = false
        
        DispatchQueue.main.async {
            let topMost = UIApplication.getTopViewController()
            let callingVC = CallingViewController1.init(control: callControl, call: nil)
            callingVC.modalPresentationStyle = .fullScreen
            self.callingVC = callingVC
            topMost?.present(callingVC, animated: true)
        }
    }
}

extension CapacitorStringeePlugin: StringeeConnectionDelegate {

    public func didConnect(_ stringeeClient: StringeeClient!, isReconnecting: Bool) {
        let jsObject: [String: Any] = [
            "uid": stringeeClient.userId!,
            "isReconnecting": isReconnecting
        ]
        notifyListeners("onConnectionConnected", data: jsObject)
        DispatchQueue.main.async {
            InstanceManager.shared.viewController?.title = "Connected as \(stringeeClient.userId ?? "")"
        }
    }

    public func didDisConnect(_ stringeeClient: StringeeClient!, isReconnecting: Bool) {
        let jsObject: [String: Any] = [
            "uid": stringeeClient.userId!,
            "isReconnecting": isReconnecting
        ]
        notifyListeners("onConnectionDisconnected", data: jsObject)
        DispatchQueue.main.async {
            InstanceManager.shared.viewController?.title = "Disconnected"
        }
    }

    public func didFailWithError(_ stringeeClient: StringeeClient!, code: Int32, message: String!) {
        let jsObject: [String: Any] = [
            "code": code,
            "error": code,
            "message": message as Any
        ]
        notifyListeners("onConnectionError", data: jsObject)
    }

    public func requestAccessToken(_ stringeeClient: StringeeClient!) {
        notifyListeners("onRequestNewToken", data: nil)
    }

    public func didReceiveCustomMessage(_ stringeeClient: StringeeClient!, message: [AnyHashable : Any]!, fromUserId userId: String!) {
        let jsObject: [String: Any] = [
            "message": message as Any,
            "from": userId as Any,
            "msg": message as Any
        ]
        notifyListeners("onCustomMessage", data: jsObject);
    }
}

extension CapacitorStringeePlugin: StringeeIncomingCallDelegate {
    // Call 1
    public func incomingCall(with stringeeClient: StringeeClient!, stringeeCall: StringeeCall!) {
        DispatchQueue.main.async {
            if (InstanceManager.shared.callingVC1 != nil || InstanceManager.shared.callingVC2 != nil) {
                // Đang trong cuộc gọi khác => từ chối cuộc mới
                stringeeCall.reject { (status, code, message) in
                    print(message ?? "")
                }
                return
            }

            let callControl = CallControl()
            let callingVC = CallingViewController1.init(control: callControl, call: stringeeCall)
            callingVC.modalPresentationStyle = .fullScreen
            UIApplication.shared.keyWindow?.rootViewController?.present(callingVC, animated: true, completion: nil)
        }
    }

    // Call 2
    public func incomingCall(with stringeeClient: StringeeClient!, stringeeCall2: StringeeCall2!) {
        DispatchQueue.main.async {
            if (InstanceManager.shared.callingVC1 != nil || InstanceManager.shared.callingVC2 != nil) {
                // Đang trong cuộc gọi khác => từ chối cuộc mới
                stringeeCall2.reject { (status, code, message) in
                    print(message ?? "")
                }
                return
            }

            let callControl = CallControl()
            let callingVC = CallingViewController2.init(control: callControl, call: stringeeCall2)
            callingVC.modalPresentationStyle = .fullScreen
            UIApplication.shared.keyWindow?.rootViewController?.present(callingVC, animated: true, completion: nil)
        }
    }
}


extension UIApplication {
    
    class func getTopViewController(base: UIViewController? = UIApplication.shared.keyWindow?.rootViewController) -> UIViewController? {
        
        if let nav = base as? UINavigationController {
            return getTopViewController(base: nav.visibleViewController)
            
        } else if let tab = base as? UITabBarController, let selected = tab.selectedViewController {
            return getTopViewController(base: selected)
            
        } else if let presented = base?.presentedViewController {
            return getTopViewController(base: presented)
        }
        return base
    }
}
