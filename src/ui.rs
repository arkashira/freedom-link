use gtk::prelude::*;
use gtk::{Application, ApplicationWindow, Box, Orientation, Button, ButtonBoxStyle};

fn main() {
    // Initialize GTK before proceeding
    gtk::prelude::init();

    // Create a new application
    let app = Application::new(Some("com.axentx.freedom-link"), Default::default())
        .expect("failed to create application");

    // Connect to "activate" signal of app
    app.connect_activate(build_ui);

    // Run the application
    app.run(Default::default());
}

fn build_ui(app: &gtk::Application) {
    // Create a window and set the title
    let window = ApplicationWindow::new(app, Default::default());
    window.set_title("Freedom Link");

    // Create a box layout
    let vbox = Box::new(Orientation::Vertical, 0);

    // Create a button
    let button = Button::new_with_label("Connect to Stealth VPN");

    // Add button to the box layout
    vbox.add(&button);

    // Add box layout to the window
    window.add(&vbox);

    // Present window
    window.present();
}