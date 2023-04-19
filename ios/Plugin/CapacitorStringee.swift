import Foundation

@objc public class CapacitorStringee: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
