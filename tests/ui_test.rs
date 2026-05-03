#[cfg(test)]
mod tests {
    use std::thread;
    use std::time::Duration;
    use freedom_link::ui::UI;

    #[test]
    fn test_ui_usability() {
        let mut ui = UI::new();
        ui.connect_to_vpn();
        thread::sleep(Duration::from_millis(1000));
        ui.disconnect_from_vpn();
        assert!(ui.is_disconnected());
    }

    #[test]
    fn test_ui_compatibility() {
        let android_versions = vec!["10", "11", "12"];
        for version in android_versions {
            let mut ui = UI::new();
            ui.set_android_version(version);
            ui.connect_to_vpn();
            thread::sleep(Duration::from_millis(1000));
            ui.disconnect_from_vpn();
            assert!(ui.is_disconnected());
        }
    }

    #[test]
    fn test_ui_instructions() {
        let mut ui = UI::new();
        // Verify that the UI provides clear instructions and feedback to the user
        assert!(ui.has_clear_instructions());
    }
}